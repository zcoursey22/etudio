import { Flex, Heading } from "@chakra-ui/react";
import { ListTable } from "./table/ListTable";
import { ListGrid } from "./grid/ListGrid";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { ListType } from "./ListType";
import { LIST_TYPE_KEY } from "../../constants";
import { useResourceContext, useSettings } from "../../hooks";
import { ColumnOverrides } from "./table/columns";
import { Resource } from "../../resources/models";
import { ResourceListState } from "../../hooks/types";
import { ActionOverrides } from "../resources/shared";

export interface ListProps<T> {
  title?: string | ReactNode;
  emptyText?: string;
  loadingText?: string;
  errorText?: string;
  selectable?: boolean;
  favoritable?: boolean;
  createButtonLabel?: string;
  columnOverrides?: ColumnOverrides<T>;
  actionOverrides?: ActionOverrides<T>;
  listState: ResourceListState<T>;
}

export const List = <T extends Resource>(props: ListProps<T>) => {
  const {
    title,
    emptyText = "No items",
    columnOverrides,
    loadingText,
    errorText,
    listState,
    actionOverrides,
  } = props;

  const { resourceType } = useResourceContext();

  const { settings } = useSettings();

  const [globalListType] = useLocalStorage(LIST_TYPE_KEY, ListType.TABLE);
  const [listType] = useLocalStorage(
    settings.syncListViewType
      ? LIST_TYPE_KEY
      : `${LIST_TYPE_KEY}_${resourceType}`,
    globalListType
  );

  return (
    <Flex direction={"column"} gap={"0.5em"}>
      <Heading color={"fg"}>{title}</Heading>
      {listType === ListType.TABLE ? (
        <ListTable
          listState={listState}
          loadingText={loadingText}
          errorText={errorText}
          emptyText={emptyText}
          columnOverrides={columnOverrides}
          actionOverrides={actionOverrides}
        />
      ) : (
        <ListGrid
          listState={listState}
          loadingText={loadingText}
          errorText={errorText}
          emptyText={emptyText}
          actionOverrides={actionOverrides}
        />
      )}
    </Flex>
  );
};
