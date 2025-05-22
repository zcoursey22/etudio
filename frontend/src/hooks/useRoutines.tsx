import { useQuery } from "./useQuery";
import { Routine } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

const ROUTINES = "routines";

export const useRoutines = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Routine[]>(ROUTINES, `/${ROUTINES}`);
  return { resources: data || [], loading, error };
};

export const useRoutine = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Routine>([ROUTINES, id], `/${ROUTINES}/${id}`);
  return { resource, loading, error };
};

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${ROUTINES}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINES] });
    },
  });
  return { deleteResource };
};
