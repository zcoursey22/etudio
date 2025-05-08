import { useQuery } from "./useQuery";
import { Arrangement } from "../models";

export const useArrangements = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Arrangement[]>(
    "arrangements",
    "/arrangements?_expand=artist&_expand=composition"
  );
  return { arrangements: data || [], loading, error };
};

export const useArrangement = (id: number) => {
  const {
    data: arrangement,
    isLoading: loading,
    error,
  } = useQuery<Arrangement>(
    "arrangement",
    `/arrangements/${id}?_expand=artist&_expand=composition`
  );
  return { arrangement, loading, error };
};
