import { Resource } from "../../models";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";
import { EmptyMessage } from "../EmptyMessage";
import { ReactNode } from "react";

interface Props<T> {
  useResourceState: {
    resource: T | undefined;
    loading: boolean;
    error: Error | null;
  };
  children: (resource: T) => ReactNode;
  emptyText?: string;
}

export const DetailPageContainer = <T extends Resource>({
  useResourceState,
  children,
  emptyText,
}: Props<T>) => {
  const { resource, loading, error } = useResourceState;
  // console.log(resource);

  if (loading) {
    return <LoadingMessage />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  } else if (!resource) {
    return (
      <EmptyMessage message={emptyText ?? `This resource does not exist.`} />
    );
  }

  return <>{children(resource)}</>;
};
