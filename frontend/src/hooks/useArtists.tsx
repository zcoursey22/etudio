import { useQuery } from "./useQuery";
import { Artist } from "../models";

export const useArtists = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Artist[]>("artists", "/artists");
  return { resources: data || [], loading, error };
};

export const useArtist = (id: string | number) => {
  const {
    data: resource,
    isLoading: loading,
    error,
  } = useQuery<Artist>(["artist", id], `/artists/${id}`);
  return { resource, loading, error };
};
