import useSWR from "swr";

export default function useBasicSWR(key = null, apiFetcher, options = {}) {
  const { data, error, mutate } = useSWR(key, apiFetcher, options);

  let finalError = error;
  let finalData = data?.data;

  if (!error && data && !data.success && data.message && data.status) {
    finalError = data;
    finalData = null;
  }

  return {
    data: finalData,
    error: finalError,
    loading: !finalError && !finalData,
    mutate,
  };
}
