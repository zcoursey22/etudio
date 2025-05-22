import { useQuery } from "./useQuery";
import { Artist } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

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
  const queryClient = useQueryClient();
  const { mutate: deleteResource } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE}/${ARTISTS}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ARTISTS] });
    },
  });
  return { deleteResource };
};
