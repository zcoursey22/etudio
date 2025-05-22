import { useQuery, useDelete } from "./useCRUD";
import { Collection } from "../models";

const COLLECTIONS = "collections";

export const useCollections = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Collection[]>(COLLECTIONS, `/${COLLECTIONS}?_expand=artist`);
  return { resources: data || [], loading, error };
};

export const useCollection = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Collection>(
    [COLLECTIONS, id],
    `/${COLLECTIONS}/${id}?_expand=artist`
  );
  return { resource, loading, error };
};

export const useDeleteCollection = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(COLLECTIONS, `/${COLLECTIONS}`);
  return { deleteResource, loading, error };
};
