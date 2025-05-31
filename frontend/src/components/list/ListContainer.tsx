import { useResourceContext } from "../../hooks";
import type { Resource } from "../../resources/models";
import type { ColumnOverrides } from "./table/columns";
import type { ActionOverrides } from "../resources/shared";

export interface ListContainerProps<T extends Resource> {
  queryParams?: Record<string, unknown>;
  columnOverrides?: ColumnOverrides<T>;
  actionOverrides?: ActionOverrides<T>;
  children: (props: {
    listState: ReturnType<ReturnType<typeof useResourceContext<T>>["useList"]>;
    columnOverrides?: ColumnOverrides<T>;
    actionOverrides?: ActionOverrides<T>;
  }) => React.ReactNode;
}

export function ListContainer<T extends Resource>({
  // queryParams,
  columnOverrides,
  actionOverrides,
  children,
}: ListContainerProps<T>) {
  const { useList } = useResourceContext<T>();
  const listState = useList();

  return (
    <>
      {children({
        listState,
        columnOverrides,
        actionOverrides,
      })}
    </>
  );
}
