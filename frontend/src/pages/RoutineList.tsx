import { ListViewContainer } from "../components/list";
import {
  routineColumns,
  RoutineListGridItemContents,
} from "../components/routines";
import { useRoutines } from "../hooks/useRoutines";

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
