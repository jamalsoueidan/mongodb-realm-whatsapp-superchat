import { Button, rem, Stack, Text } from "@mantine/core";
import React from "react";
import { NodeProps, Position } from "reactflow";
import { CustomHandle } from "./CustomHandle";
import { withTrigger } from "./withTrigger";

export type InteractiveButtons = {
  type: string;
  interactive: {
    type: "button";
    header: {
      type: "text"; //can be image, and other type
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      buttons: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
};

export const InteractiveButtons = withTrigger(
  ({ data: { interactive } }: NodeProps<InteractiveButtons>) => {
    return (
      <>
        <Text fw="bold">{interactive.header.text}</Text>
        <Text>{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
        <Stack gap={rem(4)} mt="sm">
          {interactive.action.buttons.map((button) => {
            return (
              <React.Fragment key={button.reply.id}>
                <Button
                  variant="outline"
                  key={button.reply.id}
                  w="100%"
                  rightSection={
                    <CustomHandle
                      type="source"
                      position={Position.Right}
                      id={button.reply.id}
                    />
                  }
                >
                  {button.reply.id}
                </Button>
              </React.Fragment>
            );
          })}
        </Stack>
      </>
    );
  }
);
