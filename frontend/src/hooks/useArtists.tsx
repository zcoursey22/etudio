import { useQuery, useDelete } from "./useCRUD";
import { Artist } from "../resources/models";

const ARTISTS = "artists";

export const useArtists = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Artist[]>(ARTISTS, `/${ARTISTS}`);
  return { resources: data || [], loading, error };
};

export const useArtist = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Artist>([ARTISTS, id], `/${ARTISTS}/${id}`);
  return { resource, loading, error };
};

export const useDeleteArtist = () => {
  const {
    mutate: deleteResource,
    isPending: loading,
    error,
  } = useDelete(ARTISTS, `/${ARTISTS}`);
  return { deleteResource, loading, error };
};
