import { Checkbox, Flex, Icon, Table } from "@chakra-ui/react";
import { FavoriteColumnHeader, ListViewContainer } from "../components/list";
import { NavLink } from "../components/nav/NavLink";
import { getSupplementaryDetailPath } from "../routes";
import { formatDate } from "../utils";
import { LuDownload, LuExpand } from "react-icons/lu";
import { SupplementaryListGridItemContents } from "../components/supplementaries";
import { Favorite } from "../components/Favorite";
import { useSupplementaries } from "../hooks/useSupplementaries";

export const SupplementaryList = () => {
  const listState = useSupplementaries();
  return (
    <ListViewContainer
      title="Supplementaries"
      useResourcesState={listState}
      renderHeaderRowContents={() => (
        <>
          <Table.ColumnHeader width={"1"}>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.ColumnHeader>
          <FavoriteColumnHeader />
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
          <Table.ColumnHeader width={"1"} />
        </>
      )}
      renderRowContents={({ id, lastModified, name, isFavorite }) => (
        <>
          <Table.Cell>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell color="fg">
            <Favorite isFavorite={isFavorite} />
          </Table.Cell>
          <Table.Cell>
            <Flex align={"center"} gap={"0.5em"}>
              <NavLink to={getSupplementaryDetailPath(id)}>{name}</NavLink>
              <Icon size={"sm"} color="fg">
                <LuExpand />
              </Icon>
            </Flex>
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
          <Table.Cell>
            <Flex align={"center"}>
              <Icon size={"sm"} color="fg">
                <LuDownload />
              </Icon>
            </Flex>
          </Table.Cell>
        </>
      )}
      renderGridItemContents={(supplementary) => (
        <SupplementaryListGridItemContents supplementary={supplementary} />
      )}
    />
  );
};
