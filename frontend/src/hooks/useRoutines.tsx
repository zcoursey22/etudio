import { useDelete, useQuery } from "./useCRUD";
import { Routine } from "../resources/models";

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

export const useDeleteRoutine = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(ROUTINES, `/${ROUTINES}`);
  return { deleteResource, loading, error };
};
