import { Button, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useQuery } from "@realm/react";
import { Link, useParams } from "wouter";
import { useGetConversation } from "../../../../hooks/useGetConversation";
import { Message, MessageSchema } from "../../../../models/data";

export const FlowsReply = () => {
  //TODO:
  // show only last 24 hours, or last 7 days?
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversation = useGetConversation(conversationId);

  const flows = useQuery<Message>(MessageSchema.name, (collection) =>
    collection.filtered(
      "type = 'interactive_reply' AND reply != $0 AND conversation == $1",
      null,
      conversation
    )
  );

  return flows.length > 0 ? (
    <ScrollArea type="always" pr="md" flex="1" h="300px">
      <Stack>
        {flows.map((flow) => {
          const receivedDate = new Date(flow.timestamp * 1000);

          return (
            <Flex key={flow._id.toJSON()} direction="column">
              <Flex justify="space-between" align="center">
                <div>
                  <Text fw="500">{flow?.interactive_reply?.flow_name}</Text>
                  <Text>{receivedDate.toLocaleString()}</Text>
                </div>
                <Button
                  size="compact-md"
                  component={Link}
                  to={`/${flow._id.toJSON()}`}
                >
                  View
                </Button>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </ScrollArea>
  ) : (
    <Text fw="bold">No flows send to the user yet!</Text>
  );
};
