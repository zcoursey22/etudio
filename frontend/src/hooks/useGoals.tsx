import { useQuery } from "./useQuery";
import { Goal } from "../models";

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
