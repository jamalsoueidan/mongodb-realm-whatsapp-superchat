import { useQuery } from "@realm/react";
import { User, UserSchema } from "../models/data";

export const useUsers = (deps: Array<unknown> = []) => {
  const users = useQuery<User>(
    UserSchema.name,
    (collection) => collection,
    deps
  );

  return { users };
};
