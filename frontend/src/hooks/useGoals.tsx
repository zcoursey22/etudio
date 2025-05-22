import { useDelete, useQuery } from "./useCRUD";
import { Goal } from "../models";

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
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(GOALS, `/${GOALS}`);
  return { deleteResource, loading, error };
};
