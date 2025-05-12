import { Box, Flex, Heading, IconButton, SegmentGroup } from "@chakra-ui/react";
import { ListTable } from "./table/ListTable";
import { ListGrid } from "./grid/ListGrid";
import { LuLayoutGrid, LuMenu } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Resource } from "../../models";
import { useSettings } from "../../hooks";
import { EmptyMessage } from "../EmptyMessage";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";
import {
  ColumnMap,
  ColumnOverrides,
  favoriteColumnConfig,
} from "./table/columns";

enum ListViewType {
  TABLE = "table",
  GRID = "grid",
}

export interface ListViewContainerProps<T> {
  title: string | ReactNode;
  useResourcesState: {
    resources: T[];
    loading: boolean;
    error: Error | null;
  };
  columnMap: ColumnMap<T>;
  columnOverrides?: ColumnOverrides<T>;
  renderGridItemContents: (resource: T) => ReactNode;
  emptyText?: string;
  selectable?: boolean;
  favoritable?: boolean;
}

export interface ListViewProps<T> {
  resources: T[];
}

export const ListViewContainer = <T extends Resource>({
  title,
  useResourcesState,
  emptyText,
  columnMap,
  columnOverrides,
  favoritable = true,
  renderGridItemContents,
}: ListViewContainerProps<T>) => {
  const { resources, loading, error } = useResourcesState;
  console.log(resources);

  const GLOBAL_VIEW_KEY = "etudio_currentView";
  const PAGE_VIEW_KEY = `${GLOBAL_VIEW_KEY}_${title}`;

  const {
    settings: { syncListViewType },
  } = useSettings();

  const [globalViewType, setGlobalViewType] = useLocalStorage(
    GLOBAL_VIEW_KEY,
    ListViewType.TABLE
  );

  const [pageViewType, setPageViewType] = useLocalStorage(
    PAGE_VIEW_KEY,
    globalViewType
  );

  const handleViewTypeChange = (viewType: ListViewType) => {
    setGlobalViewType(viewType);
    setPageViewType(viewType);
  };

  const currentViewType = syncListViewType ? globalViewType : pageViewType;

  const ListView =
    currentViewType === ListViewType.TABLE ? ListTable : ListGrid;

  let content = (
    <ListView
      resources={resources}
      columnMap={{
        ...(favoritable ? { isFavorite: favoriteColumnConfig } : {}),
        ...columnMap,
      }}
      columnOverrides={columnOverrides}
      renderGridItemContents={renderGridItemContents}
    />
  );
  if (loading) {
    content = <LoadingMessage />;
  } else if (error) {
    content = <ErrorMessage error={error} />;
  } else if (!resources.length) {
    content = <EmptyMessage message={emptyText} />;
  }

  return (
    <Box>
      <Box
        bg={"bg"}
        position={"sticky"}
        top={"4.5em"}
        zIndex={"sticky"}
        pb={"1em"}
        mr={"-1em"}
        pr={"1em"}
        ml={"-1em"}
        pl={"1em"}
      >
        <Flex align={"flex-start"} justify={"space-between"}>
          <Heading color={"fg"}>{title}</Heading>
          <SegmentGroup.Root
            value={currentViewType}
            onValueChange={({ value }) =>
              handleViewTypeChange(value as ListViewType)
            }
            size={"sm"}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items
              padding={"0"}
              cursor={"pointer"}
              items={[
                {
                  value: ListViewType.TABLE,
                  label: (
                    <IconButton
                      variant={"plain"}
                      pointerEvents={"none"}
                      size={"sm"}
                    >
                      <LuMenu />
                    </IconButton>
                  ),
                },
                {
                  value: ListViewType.GRID,
                  label: (
                    <IconButton
                      variant={"plain"}
                      pointerEvents={"none"}
                      size={"sm"}
                    >
                      <LuLayoutGrid />
                    </IconButton>
                  ),
                },
              ]}
            />
          </SegmentGroup.Root>
        </Flex>
      </Box>
      {content}
    </Box>
  );
};
