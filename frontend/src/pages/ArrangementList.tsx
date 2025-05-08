import { Checkbox, Flex, Icon, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { NavLink } from "../components/nav/NavLink";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../routes";
import { formatDate } from "../utils";
import { LuDownload, LuExpand } from "react-icons/lu";
import { ArrangementListGridItemContents } from "../components/arrangements";
import { FavoriteColumnHeader } from "../components/list";
import { Favorite } from "../components/Favorite";
import { useArrangements } from "../hooks/useArrangements";

export const ArrangementList = () => {
  const { arrangements, loading, error } = useArrangements();
  console.log(arrangements);

  return (
    <ListViewContainer
      title="Scores"
      items={arrangements}
      loading={loading}
      error={error}
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
          <Table.ColumnHeader>Composition</Table.ColumnHeader>
          <Table.ColumnHeader>Arranger</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
          <Table.ColumnHeader width={"1"} />
        </>
      )}
      renderRowContents={({
        id,
        name,
        artist,
        composition,
        lastModified,
        isFavorite,
      }) => (
        <>
          <Table.Cell>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell>
            <Favorite isFavorite={isFavorite} />
          </Table.Cell>
          <Table.Cell>
            <Flex align={"center"} gap={"0.5em"}>
              <NavLink to={getArrangementDetailPath(id)}>{name}</NavLink>
              <Icon size="sm">
                <LuExpand />
              </Icon>
            </Flex>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
          <Table.Cell>
            <Flex align={"center"}>
              <Icon size={"sm"}>
                <LuDownload />
              </Icon>
            </Flex>
          </Table.Cell>
        </>
      )}
      renderGridItemContents={(arrangement) => (
        <ArrangementListGridItemContents arrangement={arrangement} />
      )}
    />
  );
};
