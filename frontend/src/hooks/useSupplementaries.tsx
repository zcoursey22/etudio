import { useQuery } from "./useQuery";
import { Supplementary } from "../models";

export const useSupplementaries = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Supplementary[]>("supplementaries", "/supplementaries");
  return { resources: data || [], loading, error };
};

export const useSupplementary = (id: number | string) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Supplementary>(["supplementary", id], `/supplementaries/${id}`);
  return { resource, loading, error };
};
