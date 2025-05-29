import { useQuery, useDelete } from "./useCRUD";
import { Arrangement } from "../resources/models";
import { useComposition, useCompositions } from "./useCompositions";

const ARRANGEMENTS = "arrangements";

interface ApiArrangement extends Arrangement {
  artistId: number;
  compositionId?: number;
}

type UseArrangementsParams = {
  compositionId?: number | string;
  artistId?: number | string;
};
export const useArrangements = (params?: UseArrangementsParams) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<ApiArrangement[]>(
    [ARRANGEMENTS, params],
    `/${ARRANGEMENTS}?_expand=artist${
      params?.compositionId ? `&compositionId=${params.compositionId}` : ""
    }${params?.artistId ? `&artistId=${params.artistId}` : ""}`
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
    [ARRANGEMENTS, id],
    `/${ARRANGEMENTS}/${id}?_expand=artist`
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

export const useDeleteArrangement = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(ARRANGEMENTS, `/${ARRANGEMENTS}`);
  return { deleteResource, loading, error };
};
