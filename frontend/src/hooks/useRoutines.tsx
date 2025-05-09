import { useQuery } from "./useQuery";
import { Routine } from "../models";

export const useRoutines = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Routine[]>("routines", "/routines");
  return { resources: data || [], loading, error };
};

export const useRoutine = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Routine>(["routine", id], `/routines/${id}`);
  return { resource, loading, error };
};
