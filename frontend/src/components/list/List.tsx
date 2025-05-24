import { Flex, Heading, Icon, Stack, Tabs } from "@chakra-ui/react";
import { ListTable } from "./table/ListTable";
import { ListGrid } from "./grid/ListGrid";
import { LuLayoutGrid, LuMenu } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Resource } from "../../models";
import { useSettings } from "../../hooks";
import {
  ColumnMap,
  ColumnOverrides,
  favoriteColumnConfig,
} from "./table/columns";

enum ListType {
  TABLE = "table",
  GRID = "grid",
}

export interface ListProps<T> {
  title: string | ReactNode;
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
}

export const List = <T extends Resource>(props: ListProps<T>) => {
  const { title, columnMap, favoritable = true } = props;

  const GLOBAL_VIEW_KEY = "etudio_currentView";
  const PAGE_VIEW_KEY = `${GLOBAL_VIEW_KEY}_${title}`;

  const {
    settings: { syncListViewType },
  } = useSettings();

  const [globalViewType, setGlobalViewType] = useLocalStorage(
    GLOBAL_VIEW_KEY,
    ListType.TABLE
  );

  const [pageViewType, setPageViewType] = useLocalStorage(
    PAGE_VIEW_KEY,
    globalViewType
  );

  const handleViewTypeChange = (viewType: ListType) => {
    setGlobalViewType(viewType);
    setPageViewType(viewType);
  };

  const currentViewType = syncListViewType ? globalViewType : pageViewType;

  const ListItemContainer =
    currentViewType === ListType.TABLE ? ListTable : ListGrid;

  return (
    <Stack>
      <Flex align={"flex-start"} justify={"space-between"}>
        <Heading color={"fg"}>{title}</Heading>
        <Tabs.Root
          value={currentViewType}
          onValueChange={({ value }) => handleViewTypeChange(value as ListType)}
          variant={"outline"}
          size={"md"}
        >
          <Tabs.List>
            <Tabs.Trigger value={"table"}>
              <Icon size={"sm"}>
                <LuMenu />
              </Icon>
            </Tabs.Trigger>
            <Tabs.Trigger value={"grid"}>
              <Icon size={"sm"}>
                <LuLayoutGrid />
              </Icon>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Flex>
      <ListItemContainer
        {...props}
        emptyText={props.emptyText ?? "No items"}
        columnMap={{
          ...(favoritable ? { isFavorite: favoriteColumnConfig } : {}),
          ...columnMap,
        }}
      />
    </Stack>
  );
};
