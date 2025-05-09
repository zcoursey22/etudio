import { Box, Flex, Heading, IconButton, SegmentGroup } from "@chakra-ui/react";
import { ListTable } from "./ListTable";
import { ListGrid } from "./ListGrid";
import { LuLayoutGrid, LuMenu } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Resource } from "../../models";
import { useSettings } from "../../hooks";
import { EmptyMessage } from "../EmptyMessage";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";

enum ListViewType {
  TABLE = "table",
  GRID = "grid",
}

export interface ListViewContainerProps<T> {
  title: string;
  items: T[];
  loading: boolean;
  error: Error | null;
  renderHeaderRowContents: () => ReactNode;
  renderRowContents: (item: T) => ReactNode;
  renderGridItemContents: (item: T) => ReactNode;
}

export interface ListViewProps<T> {
  items: T[];
}

export const ListViewContainer = <T extends Resource>({
  title,
  items,
  loading,
  error,
  renderHeaderRowContents,
  renderRowContents,
  renderGridItemContents,
}: ListViewContainerProps<T>) => {
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
      items={items}
      renderHeaderRowContents={renderHeaderRowContents}
      renderRowContents={renderRowContents}
      renderGridItemContents={renderGridItemContents}
    />
  );
  if (loading) {
    content = <LoadingMessage />;
  } else if (error) {
    content = <ErrorMessage error={error} />;
  } else if (!items.length) {
    content = <EmptyMessage />;
  }

  return (
    <>
      <Box
        bg={"bg"}
        position={"sticky"}
        top={"4.5em"}
        zIndex={"sticky"}
        pb={"1em"}
        mr={"-1em"}
        pr={"1em"}
      >
        <Flex align={"flex-start"} justify={"space-between"}>
          <Heading>{title}</Heading>
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
    </>
  );
};
