import request2 from "@/lib/request";
import useSWR from "swr";
import qs from "qs";


export function useFirstCommunityProject(key: string) {

  const { data, error, isValidating, isLoading, mutate } = useSWR<any, any>(
    key,
    (url) => request2.get(url)
  );

  return { data, error, isValidating, isLoading, mutate };
}
