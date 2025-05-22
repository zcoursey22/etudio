import { useQuery } from "./useQuery";
import { Supplementary } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

const SUPPLEMENTARIES = "supplementaries";

export const useSupplementaries = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Supplementary[]>(SUPPLEMENTARIES, `/${SUPPLEMENTARIES}`);
  return { resources: data || [], loading, error };
};

export const useSupplementary = (id: number | string) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Supplementary>(
    [SUPPLEMENTARIES, id],
    `/${SUPPLEMENTARIES}/${id}`
  );
  return { resource, loading, error };
};

export const useDeleteSupplementary = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${SUPPLEMENTARIES}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUPPLEMENTARIES] });
    },
  });
  return { deleteResource };
};
