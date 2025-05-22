import { ListViewContainer } from "../components/list";
import {
  getRoutineColumns,
  RoutineListGridItemContents,
  useRoutineActions,
} from "../components/resources/routines";
import { useRoutines } from "../hooks";

export const RoutineList = () => {
  const listState = useRoutines();
  const actions = useRoutineActions();

  return (
    <ListViewContainer
      title="Routines"
      useResourcesState={listState}
      columnMap={getRoutineColumns(actions)}
      renderGridItemContents={(routine) => (
        <RoutineListGridItemContents routine={routine} />
      )}
    />
  );
};
