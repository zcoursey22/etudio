import { Checkbox, Table } from "@chakra-ui/react";
import { FavoriteColumnHeader, ListViewContainer } from "../components/list";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { formatDate } from "../utils";
import {
  CompositionFrom,
  CompositionListGridItemContents,
} from "../components/compositions";
import { Favorite } from "../components/Favorite";
import { useCompositions } from "../hooks";

export const CompositionList = () => {
  const { data, isLoading, error } = useCompositions();
  const compositions = data || [];
  console.log(compositions);

  return (
    <ListViewContainer
      title="Compositions"
      items={compositions}
      loading={isLoading}
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
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Composer</Table.ColumnHeader>
          <Table.ColumnHeader>From</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
        </>
      )}
      renderRowContents={({
        id,
        lastModified,
        isFavorite,
        name,
        artist,
        source,
        partOf,
        collection,
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
            <NavLink to={getCompositionDetailPath(id)}>{name}</NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Table.Cell>
          <Table.Cell>
            <CompositionFrom
              partOf={partOf}
              source={source}
              collection={collection}
            />
          </Table.Cell>
          <Table.Cell textAlign="end">
            {formatDate(new Date(lastModified))}
          </Table.Cell>
        </>
      )}
      renderGridItemContents={(composition) => (
        <CompositionListGridItemContents composition={composition} />
      )}
    />
  );
};
