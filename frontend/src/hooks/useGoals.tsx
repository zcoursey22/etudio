import { useCreate, useDelete, useQuery } from "./useCRUD";
import { Goal } from "../models";

const GOALS = "goals";

type CreateGoalPayload = {
  name: string;
  status: string;
  description?: string;
};

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

export const useCreateGoal = () => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<CreateGoalPayload>(GOALS, `/${GOALS}`);
  return { createResource, loading, error };
};

export const useDeleteGoal = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(GOALS, `/${GOALS}`);
  return { deleteResource, loading, error };
};
