import { useQuery, useDelete, useCreate, useUpdate } from "./useCRUD";
import { Artist, ResourcePayload } from "../resources/models";
import { ResourceCreateState, ResourceUpdateState } from "./types";

const ARTISTS = "artists";

export const useArtists = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Artist[]>(ARTISTS, `/${ARTISTS}?_sort=name`);
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

export const useCreateArtist = (): ResourceCreateState<
  ResourcePayload<Artist>
> => {
  const {
    mutateAsync: createResource,
    isPending: loading,
    error,
  } = useCreate<ResourcePayload<Artist>>(ARTISTS, `/${ARTISTS}`);
  return { createResource, loading, error };
};

export const useUpdateArtist = (): ResourceUpdateState<
  ResourcePayload<Artist>
> => {
  const {
    mutateAsync: updateResource,
    isPending: loading,
    error,
  } = useUpdate(ARTISTS, `/${ARTISTS}`);
  return { updateResource, loading, error };
};

export const useDeleteArtist = () => {
  const {
    mutateAsync: deleteResource,
    isPending: loading,
    error,
  } = useDelete(ARTISTS, `/${ARTISTS}`);
  return { deleteResource, loading, error };
};
