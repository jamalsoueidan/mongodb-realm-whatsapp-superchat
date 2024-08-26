import { ActionIcon, Flex } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import "@mantine/tiptap/styles.css";

import { IconSend } from "@tabler/icons-react";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { useEffect, useState } from "react";
import { useMobile } from "../../../hooks/useMobile";
import { useSendMessage } from "../../../hooks/useSendMessage";
import { useSuggestion } from "../../../hooks/useSuggestion";
import { ChatAttachments } from "./ChatAttachments";

export const ChatEditor = () => {
  const isMobile = useMobile();
  const { sendText } = useSendMessage();
  const [editorContent, setEditorContent] = useState("");

  const KeyboardHandler = Extension.create({
    name: "keyboardHandler",
    addStorage() {
      return {
        isMobile: false,
      };
    },
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (this.storage.isMobile) {
            return editor.commands.first(({ commands }) => [
              () => commands.newlineInCode(),
              () => commands.liftEmptyBlock(),
            ]);
          }
          sendText(this.editor.getText());
          return this.editor.commands.clearContent();
        },
        "Mod-Enter": ({ editor }) => {
          return editor.commands.first(({ commands }) => [
            () => commands.newlineInCode(),
            () => commands.liftEmptyBlock(),
          ]);
        },
        "Shift-Enter": ({ editor }) => {
          return editor.commands.first(({ commands }) => [
            () => commands.newlineInCode(),
            () => commands.liftEmptyBlock(),
          ]);
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Type a message..." }),
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
      KeyboardHandler,
    ],
    onUpdate({ editor }) {
      setEditorContent(editor.getText());
    },
  });

  const handler = () => {
    if (editor) {
      sendText(editor.getText());
      editor.commands.clearContent();
    }
  };

  useEffect(() => {
    if (editor && isMobile !== undefined) {
      const keyboardHandlerExtension = editor.extensionManager.extensions.find(
        (extension) => extension.name === "keyboardHandler"
      );
      if (keyboardHandlerExtension) {
        keyboardHandlerExtension.storage.isMobile = isMobile;
      }
    }
  }, [isMobile, editor]);

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
