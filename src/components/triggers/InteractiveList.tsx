import { Button, Divider, NavLink, rem, Stack, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";
import { NodeProps, Position } from "reactflow";
import { CustomHandle } from "./CustomHandle";
import { withTrigger } from "./withTrigger";

export type InteractiveList = {
  type: string;
  interactive: {
    type: string;
    header: {
      type: string;
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      button: string;
      sections: Array<{
        title: string;
        rows: Array<{
          id: string;
          title: string;
        }>;
      }>;
    };
  };
};

export const InteractiveList = withTrigger(
  ({ data: { interactive }, sourcePosition }: NodeProps<InteractiveList>) => {
    return (
      <>
        <Stack gap={rem(2)} mb="xl">
          <Text fw="bold">{interactive.header.text}</Text>
          <Text>{interactive.body.text}</Text>
          <Text c="dimmed" fz="sm">
            {interactive.footer.text}
          </Text>
          <Button
            variant="outline"
            leftSection={<IconMenu2 />}
            color="green"
            mt="xs"
          >
            {interactive.action.button}
          </Button>
        </Stack>

        {interactive.action.sections.map((section) => {
          return (
            <Stack key={section.title} gap={rem(2)}>
              <Text c="dimmed" fz="sm" fw="bold">
                {section.title}
              </Text>
              <Divider />
              {section.rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <NavLink
                      variant="transparent"
                      active
                      label={row.title}
                      px="0"
                      rightSection={
                        <CustomHandle
                          type="source"
                          position={sourcePosition || Position.Right}
                          id={row.id}
                        />
                      }
                    />
                  </React.Fragment>
                );
              })}
            </Stack>
          );
        })}
      </>
    );
  }
);
