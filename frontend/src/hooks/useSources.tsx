import { useQuery, useDelete, useCreate, useUpdate } from "./useCRUD";
import { ResourcePayload, Source } from "../resources/models";
import { ResourceCreateState, ResourceUpdateState } from "./types";
import { useArtists } from "./useArtists";

const SOURCES = "SOURCES";

interface ApiSource extends Source {
  parentId: number;
  artistId: number;
}

type UseSourcesParams = {
  parentId?: number | string;
  artistId?: number | string;
};
export const useSources = (params?: UseSourcesParams) => {
  const {
    data: sources,
    isLoading: loading,
    error,
  } = useQuery<ApiSource[]>(
    [SOURCES, params],
    `/${SOURCES}?_sort=name${
      params?.parentId ? `&parentId=${params?.parentId}` : ""
    }${params?.artistId ? `&artistId=${params?.artistId}` : ""}`
  );

  const {
    resources: artists,
    loading: artistsLoading,
    error: artistsError,
  } = useArtists();

  return {
    resources:
      sources?.map((s) => ({
        ...s,
        parent: sources.find(({ id }) => s.parentId === id),
        artist: artists.find(({ id }) => s.artistId === id),
      })) || [],
    loading: loading || artistsLoading,
    error: error || artistsError,
  };
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

export const useCreateSource = (): ResourceCreateState<
  ResourcePayload<Source>
> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Source>>(SOURCES, `/${SOURCES}`);
  return { createResource, loading, error };
};

export const useUpdateSource = (): ResourceUpdateState<
  ResourcePayload<Source>
> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(SOURCES, `/${SOURCES}`);
  return { updateResource, loading, error };
};

export const useDeleteSource = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(SOURCES, `/${SOURCES}`);
  return { deleteResource, loading, error };
};
