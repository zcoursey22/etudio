import { useCreate, useDelete, useQuery, useUpdate } from "./useCRUD";
import { Goal, ResourcePayload } from "../resources/models";
import {
  ResourceCreateState,
  ResourceDetailState,
  ResourceListState,
  ResourceUpdateState,
} from "./types";

const GOALS = "goals";

export const useGoals = (): ResourceListState<Goal> => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Goal[]>(GOALS, `/${GOALS}`);
  return { resources: data || [], loading, error };
};

export const useGoal = (id: string | number): ResourceDetailState<Goal> => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Goal>([GOALS, id], `/${GOALS}/${id}`);
  return { resource, loading, error };
};

export const useCreateGoal = (): ResourceCreateState<ResourcePayload<Goal>> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Goal>>(GOALS, `/${GOALS}`);
  return { createResource, loading, error };
};

export const useUpdateGoal = (): ResourceUpdateState<ResourcePayload<Goal>> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(GOALS, `/${GOALS}`);
  return { updateResource, loading, error };
};

export const useDeleteGoal = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(GOALS, `/${GOALS}`);
  return { deleteResource, loading, error };
};
