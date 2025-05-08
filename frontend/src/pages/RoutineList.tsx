import { Checkbox, Table } from "@chakra-ui/react";
import { FavoriteColumnHeader, ListViewContainer } from "../components/list";
import { NavLink } from "../components/nav/NavLink";
import { getRoutineDetailPath } from "../routes";
import { formatDate } from "../utils";
import { RoutineListGridItemContents } from "../components/routines";
import { Favorite } from "../components/Favorite";
import { useRoutines } from "../hooks/useRoutines";

export const RoutineList = () => {
  const { data, isLoading, error } = useRoutines();
  const routines = data || [];
  console.log(routines);

  return (
    <ListViewContainer
      title="Routines"
      items={routines}
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
          <Table.Cell textAlign="end">
            {formatDate(new Date(lastModified))}
          </Table.Cell>
        </>
      )}
      renderGridItemContents={(routine) => (
        <RoutineListGridItemContents routine={routine} />
      )}
    />
  );
};
