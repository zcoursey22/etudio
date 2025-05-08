import { useQuery } from "./useQuery";
import { Routine } from "../models";

export const useRoutines = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Routine[]>("routines", "/routines");
  return { routines: data || [], loading, error };
};

export const useRoutine = (id: number) => {
  const {
    data: routine,
    isLoading: loading,
    error,
  } = useQuery<Routine>("routine", `/routines/${id}`);
  return { routine, loading, error };
};
