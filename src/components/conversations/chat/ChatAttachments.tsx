import { ActionIcon, Menu, rem } from "@mantine/core";
import {
  IconFaceId,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
} from "@tabler/icons-react";
import { Link, useParams } from "wouter";
import { AttachmentFlows } from "../attachments/ChatFlows";

export function ChatAttachments() {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <>
      <AttachmentFlows />
      <Menu shadow="md" width={200} position="top" offset={16} withArrow>
        <Menu.Target>
          <ActionIcon variant="transparent" size="xl">
            <IconPlus stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconFaceId style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to={`/${conversationId}/flows`}
          >
            Flows
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Quick replies
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconPhoto style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Gallery
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
