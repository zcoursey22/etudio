import { Flex, Heading } from "@chakra-ui/react";
import { ListTable } from "./table/ListTable";
import { ListGrid } from "./grid/ListGrid";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Resource } from "../../models";
import {
  ColumnMap,
  ColumnOverrides,
  favoriteColumnConfig,
} from "./table/columns";
import { ListType } from "./ListType";
import { LIST_TYPE_KEY } from "../../constants";
import { useSettings } from "../../hooks";

export interface ListProps<T> {
  id?: string;
  title?: string | ReactNode;
  resources: T[];
  emptyText?: string;
  loading: boolean;
  loadingText?: string;
  error: Error | null;
  errorText?: string;
  columnMap: ColumnMap<T>;
  columnOverrides?: ColumnOverrides<T>;
  renderGridItemContents: (resource: T) => ReactNode;
  selectable?: boolean;
  favoritable?: boolean;
  createButtonLabel?: string;
}

export const List = <T extends Resource>(props: ListProps<T>) => {
  const { title, columnMap, favoritable = true, id } = props;

  const { settings } = useSettings();

  const [globalListType] = useLocalStorage(LIST_TYPE_KEY, ListType.TABLE);
  const [listType] = useLocalStorage(
    settings.syncListViewType ? LIST_TYPE_KEY : `${LIST_TYPE_KEY}_${id}`,
    globalListType
  );
  const ListItemContainer = listType === ListType.TABLE ? ListTable : ListGrid;

  if (id === undefined) {
    throw Error("list id must be defined");
  }

  return (
    <Flex direction={"column"} gap={"0.5em"}>
      <Heading color={"fg"}>{title}</Heading>
      <ListItemContainer
        {...props}
        emptyText={props.emptyText ?? "No items"}
        columnMap={{
          ...(favoritable ? { isFavorite: favoriteColumnConfig } : {}),
          ...columnMap,
        }}
      />
    </Flex>
  );
};
