import { useQuery } from "@realm/react";
import { User, UserSchema } from "../models/data";
import { useRealmUser } from "./useRealmUser";

export const useUsers = (deps: Array<unknown> = []) => {
  const user = useRealmUser();
  const users = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection
        .filtered("user_id != $0", user.customData.user_id)
        .sorted("name"),
    deps
  );

  return { users };
};
