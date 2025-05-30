import { Resource } from "../../resources/models";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";
import { EmptyMessage } from "../EmptyMessage";
import { ReactNode } from "react";
import { useResourceContext } from "../../hooks";

interface Props<T> {
  id: number;
  children: (resource: T) => ReactNode;
  emptyText?: string;
}

export const DetailPageContainer = <T extends Resource>({
  id,
  children,
  emptyText,
}: Props<T>) => {
  const { useDetail } = useResourceContext<T>();
  const { resource, loading, error } = useDetail(id);
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
