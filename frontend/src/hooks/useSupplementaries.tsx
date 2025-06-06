import { useQuery, useDelete, useUpdate, useCreate } from "./useCRUD";
import { ResourcePayload, Supplementary } from "../resources/models";
import { ResourceCreateState, ResourceUpdateState } from "./types";

const SUPPLEMENTARIES = "supplementaries";

export const useSupplementaries = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Supplementary[]>(
    SUPPLEMENTARIES,
    `/${SUPPLEMENTARIES}?_sort=name`
  );
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

export const useCreateSupplementary = (): ResourceCreateState<
  ResourcePayload<Supplementary>
> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Supplementary>>(
    SUPPLEMENTARIES,
    `/${SUPPLEMENTARIES}`
  );
  return { createResource, loading, error };
};

export const useUpdateSupplementary = (): ResourceUpdateState<
  ResourcePayload<Supplementary>
> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(SUPPLEMENTARIES, `/${SUPPLEMENTARIES}`);
  return { updateResource, loading, error };
};

export const useDeleteSupplementary = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(SUPPLEMENTARIES, `/${SUPPLEMENTARIES}`);
  return { deleteResource, loading, error };
};
