import { Resource } from "../../models";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";
import { EmptyMessage } from "../EmptyMessage";
import { useParams } from "react-router-dom";
import { ReactNode } from "react";

interface DetailViewContainerProps<T> {
  useResource: (id: string) => {
    resource: T | undefined;
    loading: boolean;
    error: Error | null;
  };
  children: (resource: T) => ReactNode;
  emptyText?: string;
}

export const DetailViewContainer = <T extends Resource>({
  useResource,
  children,
  emptyText,
}: DetailViewContainerProps<T>) => {
  const { id } = useParams();

  const { resource, loading, error } = useResource(id!);
  console.log(resource);

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
