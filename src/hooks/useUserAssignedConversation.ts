import { useQuery } from "@realm/react";
import Realm from "realm";
import { User, UserSchema } from "../models/data";

export const useUsersAssignedConversation = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const assignedUsers = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection.filtered(
        "business_phone_number_ids CONTAINS $0 AND $1 IN conversation_ids",
        "364826260050460",
        new Realm.BSON.ObjectId(conversationId)
      ),
    [conversationId]
  );

  return { assignedUsers };
};
