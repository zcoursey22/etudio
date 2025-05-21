import { ListViewContainer } from "../components/list";
import {
  routineColumns,
  RoutineListGridItemContents,
} from "../components/resources/routines";
import { useRoutines } from "../hooks";

export const RoutineList = () => {
  const listState = useRoutines();
  return (
    <ListViewContainer
      title="Routines"
      useResourcesState={listState}
      columnMap={routineColumns}
      renderGridItemContents={(routine) => (
        <RoutineListGridItemContents routine={routine} />
      )}
    />
  );
};
