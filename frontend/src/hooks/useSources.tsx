import { useQuery, useDelete } from "./useCRUD";
import { Source } from "../resources/models";

const SOURCES = "SOURCES";

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
    [SOURCES, params],
    `/${SOURCES}${params?.parentId ? `?parentId=${params?.parentId}` : ""}`
  );
  return { resources: data || [], loading, error };
};

export const useSource = (id?: string | number) => {
  const {
    data: source,
    isLoading: loading,
    error,
  } = useQuery<ApiSource>([SOURCES, id], `/${SOURCES}/${id}`, {
    queryKey: [SOURCES, id || "fail"],
    enabled: !!id,
  });

  const {
    data: parent,
    isLoading: parentLoading,
    error: parentError,
  } = useQuery<ApiSource>(
    [SOURCES, source?.parentId],
    `/${SOURCES}/${source?.parentId}`,
    {
      queryKey: [SOURCES, source?.parentId || "fail"],
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

export const useDeleteSource = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(SOURCES, `/${SOURCES}`);
  return { deleteResource, loading, error };
};
