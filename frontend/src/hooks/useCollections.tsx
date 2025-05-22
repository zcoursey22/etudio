import { useQuery } from "./useQuery";
import { Collection } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

const COLLECTIONS = "collections";

export const useCollections = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Collection[]>(COLLECTIONS, `/${COLLECTIONS}?_expand=artist`);
  return { resources: data || [], loading, error };
};

export const useCollection = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Collection>(
    [COLLECTIONS, id],
    `/${COLLECTIONS}/${id}?_expand=artist`
  );
  return { resource, loading, error };
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${COLLECTIONS}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS] });
    },
  });
  return { deleteResource };
};
