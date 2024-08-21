import { useRealm } from "@realm/react";
import Realm from "realm";
import { User } from "../models/data";
import { useRealmUser } from "./useRealmUser";

//This would return the User object that is in sync with realm
export const useLoggedInUser = () => {
  const realm = useRealm();
  const user = useRealmUser();
  return realm.objectForPrimaryKey<User>(
    "User",
    new Realm.BSON.ObjectId(user.customData._id)
  );
};
