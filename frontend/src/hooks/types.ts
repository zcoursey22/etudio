export interface ResourceListState<T> {
  resources: T[];
  loading: boolean;
  error: Error | null;
}

export interface ResourceDetailState<T> {
  resource: T | undefined;
  loading: boolean;
  error: Error | null;
}

export interface ResourceCreateState<T> {
  createResource: (payload: T) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export interface ResourceUpdateState<T> {
  updateResource: (params: {
    id: string | number;
    payload: T | Partial<T>;
    method: "PUT" | "PATCH";
  }) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export interface ResourceDeleteState {
  deleteResource: (id: string | number) => Promise<void>;
  loading: boolean;
  error: Error | null;
}
