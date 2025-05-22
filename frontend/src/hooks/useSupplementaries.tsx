import { useQuery, useDelete } from "./useCRUD";
import { Supplementary } from "../models";

const SUPPLEMENTARIES = "supplementaries";

export const useSupplementaries = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Supplementary[]>(SUPPLEMENTARIES, `/${SUPPLEMENTARIES}`);
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

export const useDeleteSupplementary = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(SUPPLEMENTARIES, `/${SUPPLEMENTARIES}`);
  return { deleteResource, loading, error };
};
