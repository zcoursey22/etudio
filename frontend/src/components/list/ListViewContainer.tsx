import {
  Flex,
  Heading,
  Icon,
  IconButton,
  ProgressCircle,
  SegmentGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ListTable } from "./ListTable";
import { ListGrid } from "./ListGrid";
import { LuCircleAlert, LuLayoutGrid, LuMenu } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Resource } from "../../models";

const getCurrentViewKey = (title: string) => `etudio_currentView_${title}`;

enum ListViewType {
  TABLE = "table",
  GRID = "grid",
}

export interface ListViewContainerProps<T> {
  title: string;
  items: T[];
  loading: boolean;
  error?: Error;
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
  const [currentView, setCurrentView] = useLocalStorage(
    getCurrentViewKey(title),
    ListViewType.TABLE
  );

  const ListView = currentView === ListViewType.TABLE ? ListTable : ListGrid;

  let content = (
    <ListView
      items={items}
      renderHeaderRowContents={renderHeaderRowContents}
      renderRowContents={renderRowContents}
      renderGridItemContents={renderGridItemContents}
    />
  );

  if (loading) {
    content = (
      <Flex direction={"column"} align={"center"} gap={"0.5em"}>
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
        <Text>Loading...</Text>
      </Flex>
    );
  } else if (error) {
    content = (
      <Flex justify={"center"} align={"center"} color={"red.fg"} gap={"0.5em"}>
        <Icon size="md">
          <LuCircleAlert />
        </Icon>
        <Text>{error.message || "Error"}</Text>
      </Flex>
    );
  } else if (!items.length) {
    content = <Text>There's nothing here. Want to add some items?</Text>;
  }

  return (
    <Stack>
      <Flex align={"flex-end"} justify={"space-between"}>
        <Heading>{title}</Heading>
        <SegmentGroup.Root
          value={currentView}
          onValueChange={({ value }) => setCurrentView(value as ListViewType)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            padding={"0"}
            cursor={"pointer"}
            items={[
              {
                value: ListViewType.TABLE,
                label: (
                  <IconButton variant={"plain"} pointerEvents={"none"}>
                    <LuMenu />
                  </IconButton>
                ),
              },
              {
                value: ListViewType.GRID,
                label: (
                  <IconButton variant={"plain"} pointerEvents={"none"}>
                    <LuLayoutGrid />
                  </IconButton>
                ),
              },
            ]}
          />
        </SegmentGroup.Root>
      </Flex>
      {content}
    </Stack>
  );
};
