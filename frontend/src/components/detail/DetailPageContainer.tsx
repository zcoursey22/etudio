import { Resource } from "../../resources/models";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";
import { EmptyMessage } from "../EmptyMessage";
import { ReactNode } from "react";
import { useResourceContext } from "../../hooks";
import { useParams } from "react-router-dom";

interface Props<T> {
  children: (resource: T) => ReactNode;
  emptyText?: string;
}

export const DetailPageContainer = <T extends Resource>({
  children,
  emptyText,
}: Props<T>) => {
  const { id } = useParams();
  const { useDetail } = useResourceContext<T>();
  const { resource, loading, error } = useDetail(id!);
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
