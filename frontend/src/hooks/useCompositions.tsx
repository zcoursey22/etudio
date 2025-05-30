import { useQuery, useDelete, useCreate, useUpdate } from "./useCRUD";
import {
  Collection,
  Composition,
  ResourcePayload,
  Source,
} from "../resources/models";
import { ResourceCreateState, ResourceUpdateState } from "./types";

const COMPOSITIONS = "compositions";
const SOURCES = "SOURCES";
const COLLECTIONS = "collections";

export interface ApiComposition extends Composition {
  artistId: number;
  partOfCompositionId?: number;
  sourceId?: number;
  collectionId?: number;
}

type UseCompositionsParams = {
  artistId?: number | string;
  partOfCompositionId?: number | string;
  sourceId?: number | string;
  collectionId?: number | string;
};
export const useCompositions = (params?: UseCompositionsParams) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiComposition[]>(
    [COMPOSITIONS, params],
    `/${COMPOSITIONS}?_expand=artist&_embed=arrangements${
      params?.artistId ? `&artistId=${params.artistId}` : ""
    }${
      params?.partOfCompositionId
        ? `&partOfCompositionId=${params.partOfCompositionId}`
        : ""
    }${params?.sourceId ? `&sourceId=${params.sourceId}` : ""}${
      params?.collectionId ? `&collectionId=${params.collectionId}` : ""
    }`
  );
  const compositions = data || [];

  const {
    data: sourcesData,
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useQuery<Source[]>(SOURCES, `/${SOURCES}`);
  const sources = sourcesData || [];

  const {
    data: collectionsData,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useQuery<Collection[]>(COLLECTIONS, `/${COLLECTIONS}`);
  const collections = collectionsData || [];

  return {
    resources: compositions.map(
      (composition) =>
        ({
          ...composition,
          partOf: compositions.find(
            (c) => c.id === composition.partOfCompositionId
          ),
          source: sources.find((source) => source.id === composition.sourceId),
          collection: collections.find(
            (collection) => collection.id === composition.collectionId
          ),
        } as Composition)
    ),
    loading: loading || sourcesLoading || collectionsLoading,
    error: error || sourcesError || collectionsError,
  };
};

export const useComposition = (id?: number | string) => {
  const {
    data: composition,
    isLoading: loading,
    error,
  } = useQuery<ApiComposition>(
    [COMPOSITIONS, id],
    `/${COMPOSITIONS}/${id}?_expand=artist&_embed=arrangements`,
    { queryKey: [COMPOSITIONS, id || "fail"], enabled: !!id }
  );

  const partOfId = composition?.partOfCompositionId;
  const {
    data: partOf,
    isLoading: partOfLoading,
    error: partOfError,
  } = useQuery<ApiComposition>(
    [COMPOSITIONS, partOfId],
    `/${COMPOSITIONS}/${partOfId}?_expand=artist&_embed=arrangements`, // Arrangements not needed here but uses the cache more efficiently, maybe make a CompositionSummary model + hook
    {
      queryKey: [COMPOSITIONS, partOfId || "fail"],
      enabled: !!partOfId,
    }
  );

  const sourceId = composition?.sourceId;
  const {
    data: source,
    isLoading: sourceLoading,
    error: sourceError,
  } = useQuery<Source>([SOURCES, sourceId], `/${SOURCES}/${sourceId}`, {
    queryKey: [SOURCES, sourceId || "fail"],
    enabled: !!sourceId,
  });

  const collectionId = composition?.collectionId;
  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useQuery<Collection>(
    [COLLECTIONS, collectionId],
    `/${COLLECTIONS}/${collectionId}`,
    {
      queryKey: [COLLECTIONS, collectionId || "fail"],
      enabled: !!collectionId,
    }
  );

  return {
    resource: { ...composition, partOf, source, collection } as Composition,
    loading: loading || partOfLoading || sourceLoading || collectionLoading,
    error: error || partOfError || sourceError || collectionError,
  };
};

export const useCreateComposition = (): ResourceCreateState<
  ResourcePayload<Composition>
> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Composition>>(COMPOSITIONS, `/${COMPOSITIONS}`);
  return { createResource, loading, error };
};

export const useUpdateComposition = (): ResourceUpdateState<
  ResourcePayload<Composition>
> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(COMPOSITIONS, `/${COMPOSITIONS}`);
  return { updateResource, loading, error };
};

export const useDeleteComposition = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(COMPOSITIONS, `/${COMPOSITIONS}`);
  return { deleteResource, loading, error };
};
