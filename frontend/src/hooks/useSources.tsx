import { useQuery } from "./useQuery";
import { Source } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

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
    queryKey: [SOURCES, id],
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
      queryKey: [SOURCES, source?.parentId],
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
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${SOURCES}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SOURCES] });
    },
  });
  return { deleteResource };
};
