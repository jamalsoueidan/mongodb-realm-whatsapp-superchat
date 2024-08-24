import {
  Avatar,
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Realm from "realm";
import { Link } from "wouter";
import { User } from "../../models/data";

dayjs.extend(relativeTime);

export const TeamUserCard = ({
  user,
  selected,
}: {
  user: User & Realm.Object<User>;
  selected: boolean;
}) => {
  const updatedAt = dayjs((user?.updated_at || 0) * 1000);

  return (
    <>
      <Card
        p="xs"
        component={Link}
        to={`/team/${user._id}`}
        bg={selected ? "gray.1" : undefined}
        radius="0"
      >
        <Group>
          <Avatar size="lg" />
          <Flex flex={1}>
            <Stack gap="0" flex={1}>
              <Text>{user.name}</Text>

              <Text lineClamp={1}>last login {updatedAt.fromNow()}</Text>
            </Stack>
            <Stack align="flex-end" justify="center" gap="2px">
              {user.is_admin ? (
                <Badge color="green" size="md" radius="200px" p="7px">
                  Admin
                </Badge>
              ) : null}
              {user.is_team_admin ? (
                <Badge color="green" size="md" radius="200px" p="7px">
                  TeamAdmin
                </Badge>
              ) : null}
            </Stack>
          </Flex>
        </Group>
      </Card>
      <Divider p="0" m="0" mr="xs" />
    </>
  );
};
