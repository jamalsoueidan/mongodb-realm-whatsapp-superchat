/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@realm/react";
import useSWR from "swr";

type UserFunctionParams = Record<string, any>;

export function useUserFunction<Data = any>(
  functionName: string,
  params: UserFunctionParams,
  load: boolean = true
) {
  const user = useUser();

  const fetcher = (): Promise<any> => {
    return user.functions[functionName](params);
  };

  const { data, error } = useSWR<Data>(
    load ? [functionName, params] : null, // SWR won't fetch if the key is null
    fetcher
  );

  return { data, error, loading: load && !data && !error };
}
