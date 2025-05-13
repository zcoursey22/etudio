import { useQuery } from "./useQuery";
import { Source } from "../models";

interface ApiSource extends Source {
  parentId: number;
}

type UseSourcesParams = {
  parentId?: number | string;
};
export const useSources = (params?: UseSourcesParams) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiSource[]>(
    ["sources", params],
    `/sources${params?.parentId ? `?parentId=${params?.parentId}` : ""}`
  );
  return { resources: data || [], loading, error };
};

export const useSource = (id?: string | number) => {
  const {
    data: source,
    isLoading: loading,
    error,
  } = useQuery<ApiSource>(["source", id], `/sources/${id}`, {
    queryKey: ["source", id],
    enabled: !!id,
  });

  const {
    data: parent,
    isLoading: parentLoading,
    error: parentError,
  } = useQuery<ApiSource>(
    ["source", source?.parentId],
    `/sources/${source?.parentId}`,
    {
      queryKey: ["source", source?.parentId],
      enabled: !!source?.parentId,
    }
  );

  const {
    resources: children,
    loading: childrenLoading,
    error: childrenError,
  } = useSources({ parentId: source?.id });

  return {
    resource: { ...source, parent, children } as Source,
    loading: loading || parentLoading || childrenLoading,
    error: error || parentError || childrenError,
  };
};
