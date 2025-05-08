import { useQuery } from "./useQuery";
import { Supplementary } from "../models";

export const useSupplementaries = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Supplementary[]>("supplementaries", "/supplementaries");
  return { supplementaries: data || [], loading, error };
};

export const useSupplementary = (id: number) => {
  const {
    data: arrangement,
    isLoading: loading,
    error,
  } = useQuery<Supplementary>("supplementary", `/supplementaries/${id}`);
  return { arrangement, loading, error };
};
