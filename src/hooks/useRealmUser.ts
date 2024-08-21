import { useUser } from "@realm/react";
import Realm from "realm";
import { User } from "../models/data";

// This would return the User object that are not in sync with relam
export const useRealmUser = <
  FunctionsFactoryType extends Realm.DefaultFunctionsFactory,
  UserProfileDataType extends Realm.DefaultUserProfileData
>(): Realm.User<FunctionsFactoryType, User, UserProfileDataType> => {
  return useUser<FunctionsFactoryType, User, UserProfileDataType>();
};
