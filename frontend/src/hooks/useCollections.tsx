import { useQuery } from "./useQuery";
import { Collection } from "../models";

export const useCollections = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Collection[]>("collections", "/collections?_expand=artist");
  return { resources: data || [], loading, error };
};

export const useCollection = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Collection>(
    ["collection", id],
    `/collections/${id}?_expand=artist`
  );
  return { resource, loading, error };
};
