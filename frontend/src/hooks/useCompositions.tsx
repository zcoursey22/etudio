import { useQuery } from "./useQuery";
import { Composition, Source } from "../models";

interface ApiComposition extends Composition {
  artistId: number;
  partOfCompositionId?: number;
  sourceId?: number;
  collectionId?: number;
}

export const useCompositions = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiComposition[]>(
    "compositions",
    "/compositions?_expand=artist"
  );
  const compositions = data || [];

  const {
    data: sourcesData,
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useQuery<Source[]>("sources", `/sources`);
  const sources = sourcesData || [];

  const {
    data: collectionsData,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useQuery<Source[]>("collections", `/collections`);
  const collections = collectionsData || [];

  return {
    compositions: compositions.map((composition) => ({
      ...composition,
      partOf: compositions.find(
        (c) => c.id === composition.partOfCompositionId
      ),
      source: sources.find((source) => source.id === composition.sourceId),
      collection: collections.find(
        (collection) => collection.id === composition.collectionId
      ),
    })),
    loading: loading || sourcesLoading || collectionsLoading,
    error: error || sourcesError || collectionsError,
  };
};

export const useComposition = (id: number) => {
  const {
    data: composition,
    isLoading: loading,
    error,
  } = useQuery<Composition>(
    "composition",
    `/compositions/${id}?_expand=artist`
  );
  return { composition, loading, error };
};
