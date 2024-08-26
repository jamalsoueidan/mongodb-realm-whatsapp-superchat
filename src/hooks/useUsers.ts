import { useQuery } from "@realm/react";
import { User, UserSchema } from "../models/data";

export const useUsers = () => {
  return useQuery<User>(UserSchema.name, (collection) =>
    collection.sorted("name")
  );
};
