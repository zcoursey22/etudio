import { ListViewContent } from "../components/list";
import {
  getRoutineColumns,
  RoutineListGridItemContents,
  useRoutineActions,
} from "../components/resources/routines";
import { useRoutines } from "../hooks";
import { getTitle } from "../utils";

export const RoutineList = () => {
  const listState = useRoutines();
  const actions = useRoutineActions();

  return (
    <>
      <title>{getTitle("Routines")}</title>
      <ListViewContent
        title="Routines"
        useResourcesState={listState}
        columnMap={getRoutineColumns(actions)}
        renderGridItemContents={(routine) => (
          <RoutineListGridItemContents routine={routine} />
        )}
      />
    </>
  );
};
