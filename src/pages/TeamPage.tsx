import { Flex, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { Route } from "wouter";
import { CustomDrawer } from "../components/CustomDrawer";
import { TeamList } from "../components/team/TeamList";
import { TeamUserForm } from "../components/team/TeamUserForm";
import { useMobile } from "../hooks/useMobile";

export const TeamPage = () => {
  const isMobile = useMobile();

  return (
    <Route path="/team/*?">
      {(params) => {
        const openUser = !!params["0"];
        return (
          <>
            {!isMobile || !openUser ? (
              <Flex
                bg="white"
                flex={isMobile ? 1 : ".5"}
                direction="column"
                style={{ overflow: "hidden" }}
              >
                <TeamList />
              </Flex>
            ) : null}

            {!isMobile && !openUser ? (
              <Flex
                bg="#f0f2f5"
                flex="1"
                direction="column"
                style={{ overflow: "hidden" }}
                align="center"
                justify="center"
                gap="md"
              >
                <IconUser size={128} stroke={1} />
                <Title order={3} fw={600}>
                  Select a team member
                </Title>
              </Flex>
            ) : null}

            <Route path="/team/:userId/*?">
              {() =>
                openUser ? (
                  isMobile ? (
                    <CustomDrawer onClose={() => {}} opened>
                      <TeamUserForm />
                    </CustomDrawer>
                  ) : (
                    <TeamUserForm />
                  )
                ) : null
              }
            </Route>
          </>
        );
      }}
    </Route>
  );
};
