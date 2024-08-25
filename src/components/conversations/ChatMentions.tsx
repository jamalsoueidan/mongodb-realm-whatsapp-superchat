import { Button, Card } from "@mantine/core";
import { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import "./ChatMentions.css";

export type MentionSuggestion = {
  id: string;
  mentionLabel: string;
};

/**
 * Workaround for the current typing incompatibility between Tippy.js and Tiptap
 * Suggestion utility.
 *
 * @see https://github.com/ueberdosis/tiptap/issues/2795#issuecomment-1160623792
 *
 * Adopted from
 * https://github.com/Doist/typist/blob/a1726a6be089e3e1452def641dfcfc622ac3e942/stories/typist-editor/constants/suggestions.ts#L169-L186
 */
const DOM_RECT_FALLBACK: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {
    return {};
  },
};

export const suggestion: MentionOptions["suggestion"] = {
  items: async ({ query }): Promise<MentionSuggestion[]> =>
    [
      "Lea Thompson",
      "Cyndi Lauper",
      "Tom Cruise",
      "Madonna",
      "Jerry Hall",
      "Joan Collins",
      "Winona Ryder",
      "Christina Applegate",
      "Alyssa Milano",
      "Molly Ringwald",
      "Ally Sheedy",
      "Debbie Harry",
      "Olivia Newton-John",
      "Elton John",
      "Michael J. Fox",
      "Axl Rose",
      "Emilio Estevez",
      "Ralph Macchio",
      "Rob Lowe",
      "Jennifer Grey",
      "Mickey Rourke",
      "John Cusack",
      "Matthew Broderick",
      "Justine Bateman",
      "Lisa Bonet",
    ]
      .map((name, index) => ({ mentionLabel: name, id: index.toString() }))
      .filter((item) =>
        item.mentionLabel.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5),

  render: () => {
    let component: ReactRenderer<MentionRef> | undefined;
    let popup: TippyInstance | undefined;

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: () =>
            props.clientRect?.() ?? DOM_RECT_FALLBACK,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        })[0];
      },

      onUpdate(props) {
        component?.updateProps(props);

        popup?.setProps({
          getReferenceClientRect: () =>
            props.clientRect?.() ?? DOM_RECT_FALLBACK,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup?.hide();
          return true;
        }

        if (!component?.ref) {
          return false;
        }

        return component?.ref.onKeyDown(props);
      },

      onExit() {
        popup?.destroy();
        component?.destroy();

        // Remove references to the old popup and component upon destruction/exit.
        // (This should prevent redundant calls to `popup.destroy()`, which Tippy
        // warns in the console is a sign of a memory leak, as the `suggestion`
        // plugin seems to call `onExit` both when a suggestion menu is closed after
        // a user chooses an option, *and* when the editor itself is destroyed.)
        popup = undefined;
        component = undefined;
      },
    };
  },
};

type MentionRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};

interface MentionProps extends SuggestionProps {
  items: MentionSuggestion[];
}

const MentionList = forwardRef<MentionRef, MentionProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    if (index >= props.items.length) {
      // Make sure we actually have enough items to select the given index. For
      // instance, if a user presses "Enter" when there are no options, the index will
      // be 0 but there won't be any items, so just ignore the callback here
      return;
    }

    const suggestion = props.items[index];

    // Set all of the attributes of our Mention based on the suggestion data. The fields
    // of `suggestion` will depend on whatever data you return from your `items`
    // function in your "suggestion" options handler. We are returning the
    // `MentionSuggestion` type we defined above, which we've indicated via the `items`
    // in `MentionProps`.
    const mentionItem = {
      id: suggestion.id,
      label: suggestion.mentionLabel,
    };
    props.command(mentionItem);
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <Card
      display="flex"
      style={{ overlow: "auto", position: "relative" }}
      withBorder
      shadow="sm"
    >
      {props.items.length ? (
        props.items.map((item, index) => (
          <Button
            variant={index === selectedIndex ? "filled" : "transparent"}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.mentionLabel}
          </Button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </Card>
  );
});

MentionList.displayName = "MentionList";

export { MentionList };
