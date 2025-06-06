import { useCreate, useDelete, useQuery, useUpdate } from "./useCRUD";
import { ResourcePayload, Routine } from "../resources/models";
import { ResourceCreateState, ResourceUpdateState } from "./types";

const ROUTINES = "routines";

export const useRoutines = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Routine[]>(ROUTINES, `/${ROUTINES}?_sort=name`);
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

export const useCreateRoutine = (): ResourceCreateState<
  ResourcePayload<Routine>
> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Routine>>(ROUTINES, `/${ROUTINES}`);
  return { createResource, loading, error };
};

export const useUpdateRoutine = (): ResourceUpdateState<
  ResourcePayload<Routine>
> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(ROUTINES, `/${ROUTINES}`);
  return { updateResource, loading, error };
};

export const useDeleteRoutine = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(ROUTINES, `/${ROUTINES}`);
  return { deleteResource, loading, error };
};
