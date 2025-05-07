import { Checkbox, Table } from "@chakra-ui/react";
import { FavoriteColumnHeader, ListViewContainer } from "../components/list";
import { Routine } from "../models";
import { NavLink } from "../components/nav/NavLink";
import { getRoutineDetailPath } from "../routes";
import { formatDate } from "../utils";
import { RoutineListGridItemContents } from "../components/routines";
import { Favorite } from "../components/Favorite";

const routines: Routine[] = [
  { id: "1", created: new Date(), lastModified: new Date(), name: "Warmup" },
  {
    id: "2",
    created: new Date(),
    lastModified: new Date(),
    name: "October Recital",
  },
  {
    id: "3",
    created: new Date(),
    lastModified: new Date(),
    name: "Tremolo Practice",
  },
];
const loading = false;
const error = undefined;

export const RoutineList = () => {
  return (
    <ListViewContainer
      title="Routines"
      items={routines}
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
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
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
          <Table.Cell>
            <Favorite isFavorite={isFavorite} />
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getRoutineDetailPath(id)}>{name}</NavLink>
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
        </>
      )}
      renderGridItemContents={(routine) => (
        <RoutineListGridItemContents routine={routine} />
      )}
    />
  );
};
