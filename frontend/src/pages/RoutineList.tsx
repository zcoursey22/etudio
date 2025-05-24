import { List, ListPage } from "../components/list";
import {
  getRoutineColumns,
  RoutineListGridItemContents,
  useRoutineActions,
} from "../components/resources/routines";
import { useRoutines } from "../hooks";

export const RoutineList = () => {
  return (
    <ListPage title={"Routines"}>
      <List
        title="Routines"
        {...useRoutines()}
        columnMap={getRoutineColumns(useRoutineActions())}
        renderGridItemContents={(routine) => (
          <RoutineListGridItemContents routine={routine} />
        )}
      />
    </ListPage>
  );
};
