import { useQuery } from "@realm/react";
import { BSON } from "realm";
import { User, UserSchema } from "../models/data";

export function useGetUser(userId?: string) {
  const users = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection.filtered(`_id = $0 LIMIT(1)`, new BSON.ObjectId(userId)),
    [userId]
  );

  return users[0];
}
