import {
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  Flex,
  Group,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useRealm } from "@realm/react";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocation, useParams } from "wouter";
import { useGetUser } from "../../hooks/UseGetUser";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { User } from "../../models/data";

dayjs.extend(relativeTime);

export const TeamUserForm = () => {
  const [, setLocation] = useLocation();
  const loggedUser = useLoggedInUser();
  const realm = useRealm();
  const { userId } = useParams<{ userId: string }>();
  const user = useGetUser(userId);

  const updatedAt = dayjs((user?.updated_at || 0) * 1000);

  const createdAt = dayjs((user?.created_at || 0) * 1000);

  const setChecked = <K extends keyof User>(name: K, value: User[K]) => {
    realm.write(() => {
      (user as User)[name] = value;
    });
  };

  return (
    <>
      <Flex flex="1" direction="column">
        <Group gap="xs" mih="60px" p="xs" bg="#f0f2f5">
          <ActionIcon
            variant="transparent"
            aria-label="Back"
            color="black"
            onClick={() => setLocation("/team")}
            hiddenFrom="md"
          >
            <IconArrowLeft stroke={2} />
          </ActionIcon>
          <Avatar size="md" />
          <Flex flex={1} align="center" gap="xs">
            <Text>{user.name}</Text>

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

        <Divider />
        <Flex bg="#efeae2" flex={1} p="lg" direction="column" gap="md">
          <Group>
            <Title order={4}>Name:</Title>
            <Text>{user.name}</Text>
          </Group>
          <Group>
            <Title order={4}>Email:</Title>
            <Text>{obfuscateEmail(user.email)}</Text>
          </Group>
          <Group>
            <Title order={4}>Created at:</Title>
            <Text>{createdAt.format("DD/MM/YYYY")}</Text>
          </Group>
          <Group>
            <Title order={4}>Last login:</Title>
            <Text>{updatedAt.fromNow()}</Text>
          </Group>

          <Switch
            label="Should be admin?"
            color="green"
            checked={user.is_admin}
            onChange={(event) =>
              setChecked("is_admin", event.currentTarget.checked)
            }
            disabled={!loggedUser?.is_admin}
            onLabel="Yes"
            offLabel="No"
            size="lg"
          />

          <Switch
            label="Should be team admin?"
            color="green"
            checked={user.is_team_admin}
            onChange={(event) =>
              setChecked("is_team_admin", event.currentTarget.checked)
            }
            disabled={!loggedUser?.is_admin}
            onLabel="Yes"
            offLabel="No"
            size="lg"
          />
        </Flex>
      </Flex>
    </>
  );
};

function obfuscateEmail(email: string) {
  return email.replace(/(@).+(?=\.)/g, "@...");
}
