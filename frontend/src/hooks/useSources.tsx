import { useQuery } from "./useQuery";
import { Source } from "../models";

interface ApiSource extends Source {
  sourceId: number;
}
export const useSources = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiSource[]>("source", "/sources");
  return { resources: data || [], loading, error };
};

export const useSource = (id?: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<ApiSource>(["source", id], `/sources/${id}`, {
    queryKey: ["source", id],
    enabled: !!id,
  });
  return { resource, loading, error };
};
