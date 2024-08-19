import { useQuery, useUser } from "@realm/react";
import { useMemo } from "react";
import Realm from "realm";
import { User, UserSchema } from "../models/data";

export const useUsersAssignedConversation = (
  { conversationId }: { conversationId: string },
  deps: Array<unknown> = []
) => {
  const user = useUser();
  const users = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection.filtered(
        "business_phone_number_ids CONTAINS $0 AND user_id != $1",
        "364826260050460",
        user.id
      ),
    [deps]
  );

  const { assignedUsers, unassignedUsers } = useMemo(() => {
    const assigned: User[] = [];
    const unassigned: User[] = [];

    users.forEach((user) => {
      if (
        user.conversation_ids.some((id) =>
          id.equals(new Realm.BSON.ObjectId(conversationId))
        )
      ) {
        assigned.push(user);
      } else {
        unassigned.push(user);
      }
    });

    return { assignedUsers: assigned, unassignedUsers: unassigned };
  }, [users, conversationId]);

  return { users, assignedUsers, unassignedUsers };
};
