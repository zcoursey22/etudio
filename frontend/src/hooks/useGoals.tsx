import { useQuery } from "./useQuery";
import { Goal } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGoals = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Goal[]>("goals", "/goals");
  return { resources: data || [], loading, error };
};

export const useGoal = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Goal>(["goal", id], `/goals/${id}`);
  return { resource, loading, error };
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`http://localhost:3000/goals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete goal");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
  return { deleteResource };
};
