import {
  useQuery as useReactQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { API_BASE } from "../constants";

export function useQuery<TData = unknown>(
  key: string | [string, ...unknown[]],
  endpoint: string,
  options?: UseQueryOptions<TData>
) {
  return useReactQuery<TData>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
      return res.json();
    },
    ...options,
  });
}
