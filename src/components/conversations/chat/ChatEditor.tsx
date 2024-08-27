import { ActionIcon, Flex } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import "@mantine/tiptap/styles.css";

import { IconSend } from "@tabler/icons-react";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { useCallback, useEffect, useState } from "react";
import { useMobile } from "../../../hooks/useMobile";
import { useSendMessage } from "../../../hooks/useSendMessage";
import { useSuggestion } from "../../../hooks/useSuggestion";
import { KeyboardExtension } from "../../../lib/KeyboardExtension";
import { ChatAttachments } from "./ChatAttachments";

export const ChatEditor = () => {
  const isMobile = useMobile();
  const { sendText, sendInternalMessage } = useSendMessage();
  const [editorContent, setEditorContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `Type a message...`,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: useSuggestion(),
      }),
      Emoji.configure({
        enableEmoticons: true,
        emojis: gitHubEmojis,
      }),
      KeyboardExtension,
    ],
    onUpdate({ editor }) {
      setEditorContent(editor.getText());
    },
  });

  const handler = useCallback(() => {
    if (editor) {
      const content = editor.getHTML();
      const mentionRegex =
        /<span[^>]*class\s*=\s*["'][^"']*mention[^"']*["'][^>]*>/i;
      const hasMentions = mentionRegex.test(content);
      if (hasMentions) {
        sendInternalMessage(editor.getHTML());
      } else {
        sendText(editor.getText());
      }

      editor.commands.clearContent();
    }
  }, [editor, sendText, sendInternalMessage]);

  useEffect(() => {
    if (editor && isMobile !== undefined) {
      const keyboardHandlerExtension = editor.extensionManager.extensions.find(
        (extension) => extension.name === KeyboardExtension.name
      );
      if (keyboardHandlerExtension) {
        keyboardHandlerExtension.storage.isMobile = isMobile;
        keyboardHandlerExtension.storage.send = handler;
      }
    }
  }, [isMobile, editor, handler]);

  return (
    <Flex
      p={{ md: "xs" }}
      px={{ base: "2px", md: "xs" }}
      pb={{ base: "2px", md: "xs" }}
      gap={{ base: "4px", md: "0" }}
      justify="center"
      align="center"
      bg={isMobile ? "#efeae2" : "gray.1"}
    >
      <ChatAttachments />
      <RichTextEditor
        editor={editor}
        w="100%"
        styles={{
          root: { backgroundColor: "transparent", border: "none" },
          content: { backgroundColor: "transparent" },
        }}
      >
        <RichTextEditor.Content />
      </RichTextEditor>
      <ActionIcon
        variant={isMobile ? "filled" : "transparent"}
        color="green"
        radius="xl"
        size="xl"
        onClick={handler}
        aria-label="Send"
      >
        <IconSend
          stroke={1.5}
          color={
            isMobile ? "white" : editorContent.length > 0 ? "green" : "gray"
          }
          style={{ transform: "rotate(44deg)", width: "70%", height: "70%" }}
        />
      </ActionIcon>
    </Flex>
  );
};
