import { Button, Divider, NavLink, rem, Stack, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";
import { NodeProps, Position } from "reactflow";
import { BoxWrapper } from "./BoxWrapper";
import { CustomHandle } from "./CustomHandle";

interface InteractiveList {
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
      sections: [
        {
          title: string;
          rows: [
            {
              id: string;
              title: string;
            }
          ];
        }
      ];
    };
  };
}

export const InteractiveList = ({
  data: { interactive },
  id,
}: NodeProps<InteractiveList>) => {
  return (
    <BoxWrapper id={id}>
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
                      <CustomHandle type="source" position={Position.Right} />
                    }
                  />
                </React.Fragment>
              );
            })}
          </Stack>
        );
      })}
    </BoxWrapper>
  );
};
