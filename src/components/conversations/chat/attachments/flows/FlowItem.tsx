import { ActionIcon, Badge, Card, Flex, Group, Text } from "@mantine/core";
import { IconArrowRight, IconEye } from "@tabler/icons-react";
import { useLocation } from "wouter";

export type Flow = {
  id: string;
  name: string;
  status: "DEPRECATED" | "PUBLISHED" | "DRAFT";
  categories: string[];
  validation_errors: string[];
};

export type GetFlow = {
  preview: {
    preview_url: string;
    expires_at: string;
  };
} & Flow;

export const FlowItem = ({ flow }: { flow: Flow }) => {
  const [, setLocation] = useLocation();

  return (
    <Card
      withBorder
      onClick={() => setLocation(`/${flow.id}/send`)}
      style={{ cursor: "pointer" }}
    >
      <Group justify="space-between">
        <Flex direction="column">
          <Text>{flow.name.substring(0, 25)}</Text>
          <Badge color={flow.status === "DRAFT" ? "yellow" : "green"}>
            {flow.status}
          </Badge>
        </Flex>
        <Flex gap="xs">
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              setLocation(`/${flow.id}/preview`);
            }}
            variant="transparent"
            color="black"
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon variant="transparent" color="black">
            <IconArrowRight />
          </ActionIcon>
        </Flex>
      </Group>
    </Card>
  );
};
