import { useQuery } from "./useQuery";
import { Arrangement } from "../models";
import { useComposition, useCompositions } from "./useCompositions";

interface ApiArrangement extends Arrangement {
  artistId: number;
  compositionId?: number;
}

type UseArrangementsParams = {
  compositionId?: number | string;
};
export const useArrangements = (params?: UseArrangementsParams) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiArrangement[]>(
    ["arrangements", params],
    `/arrangements?_expand=artist${
      params?.compositionId ? `&compositionId=${params.compositionId}` : ""
    }`
  );
  const arrangements = data || [];

  const {
    resources: compositions,
    loading: compositionsLoading,
    error: compositionsError,
  } = useCompositions();

  return {
    resources: arrangements.map(
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

export const useArrangement = (id: number | string) => {
  const {
    data: arrangement,
    isLoading: loading,
    error,
  } = useQuery<ApiArrangement>(
    ["arrangement", id],
    `/arrangements/${id}?_expand=artist`
  );

  const {
    resource: composition,
    loading: compositionLoading,
    error: compositionError,
  } = useComposition(arrangement?.compositionId);

  return {
    resource: { ...arrangement, composition } as Arrangement,
    loading: loading || compositionLoading,
    error: error || compositionError,
  };
};
