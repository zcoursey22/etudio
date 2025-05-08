import { useQuery } from "./useQuery";
import { Arrangement } from "../models";
import { useCompositions } from "./useCompositions";

interface ApiArrangement extends Arrangement {
  artistId: number;
  compositionId?: number;
}

export const useArrangements = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiArrangement[]>(
    "arrangements",
    "/arrangements?_expand=artist&_expand=composition"
  );
  const arrangements = data || [];
  const {
    compositions,
    loading: compositionsLoading,
    error: compositionsError,
  } = useCompositions();
  return {
    arrangements: arrangements.map(
      (arrangement) =>
        ({
          ...arrangement,
          composition: compositions.find(
            (composition) => composition.id === arrangement.compositionId
          ),
        } as Arrangement)
    ),
    loading: loading || compositionsLoading,
    error: error || compositionsError,
  };
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
