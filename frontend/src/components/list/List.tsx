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

export interface ListProps<T> {
  id?: string;
  title?: string | ReactNode;
  emptyText?: string;
  loadingText?: string;
  errorText?: string;
  selectable?: boolean;
  favoritable?: boolean;
  createButtonLabel?: string;
  columnOverrides?: ColumnOverrides<T>;
}

export const List = <T extends Resource>(props: ListProps<T>) => {
  const { useList } = useResourceContext<T>();
  const listState = useList();

  const {
    title,
    id,
    emptyText = "No items",
    columnOverrides,
    loadingText,
    errorText,
  } = props;

  const { settings } = useSettings();

  const [globalListType] = useLocalStorage(LIST_TYPE_KEY, ListType.TABLE);
  const [listType] = useLocalStorage(
    settings.syncListViewType ? LIST_TYPE_KEY : `${LIST_TYPE_KEY}_${id}`,
    globalListType
  );

  if (id === undefined) {
    throw Error("list id must be defined");
  }

  return (
    <Flex direction={"column"} gap={"0.5em"}>
      <Heading color={"fg"}>{title}</Heading>
      {listType === ListType.TABLE ? (
        <ListTable
          {...listState}
          loadingText={loadingText}
          errorText={errorText}
          emptyText={emptyText}
          columnOverrides={columnOverrides}
        />
      ) : (
        <ListGrid
          {...listState}
          loadingText={loadingText}
          errorText={errorText}
          emptyText={emptyText}
        />
      )}
    </Flex>
  );
};
