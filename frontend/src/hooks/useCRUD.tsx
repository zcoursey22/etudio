import {
  useQuery as useReactQuery,
  UseQueryOptions,
  useQueryClient,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { API_BASE } from "../constants";

export const useQuery = <T,>(
  key: string | [string, ...unknown[]],
  endpoint: string,
  options?: UseQueryOptions<T>
) => {
  return useReactQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
      return res.json();
    },
    ...options,
  });
};

export const useCreate = <T extends Record<string, unknown>>(
  key: string | [string, ...unknown[]],
  endpoint: string,
  options?: UseMutationOptions<void, Error, T>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, T>({
    mutationFn: async (payload: T) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          created: new Date(),
          lastModified: new Date(),
        }),
      });
      if (!res.ok) throw new Error(`Failed to create: ${endpoint}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Array.isArray(key) ? key : [key],
      });
    },
    ...options,
  });
};

export type UpdateParams<T> = {
  id: string | number;
  payload: T;
};

export const useUpdate = <T extends Record<string, unknown>>(
  key: string | [string, ...unknown[]],
  endpoint: string,
  options?: UseMutationOptions<void, Error, UpdateParams<T>>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateParams<T>>({
    mutationFn: async ({ id, payload }: UpdateParams<T>) => {
      const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          lastModified: new Date(),
        }),
      });
      if (!res.ok) throw new Error(`Failed to update: ${endpoint}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Array.isArray(key) ? key : [key],
      });
    },
    ...options,
  });
};

export const useDelete = (
  key: string | [string, ...unknown[]],
  endpoint: string,
  options?: UseMutationOptions<void, Error, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete: ${endpoint}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Array.isArray(key) ? key : [key],
      });
    },
    ...options,
  });
};
