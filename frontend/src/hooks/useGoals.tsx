import { useQuery } from "./useQuery";
import { Goal } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

const GOALS = "goals";

export const useGoals = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Goal[]>(GOALS, `/${GOALS}`);
  return { resources: data || [], loading, error };
};

export const useGoal = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Goal>([GOALS, id], `/${GOALS}/${id}`);
  return { resource, loading, error };
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${GOALS}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOALS] });
    },
  });
  return { deleteResource };
};
