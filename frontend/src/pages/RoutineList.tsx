import { List, ListPage } from "../components/list";
import {
  getRoutineColumns,
  RoutineListGridItemContents,
  useRoutineActions,
} from "../components/resources/routines";
import { ResourceType } from "../constants";
import { useRoutines } from "../hooks";

export const RoutineList = () => {
  return (
    <ListPage
      title={"Routines"}
      subtitle={"Streamlined practice sessions"}
      id={ResourceType.ROUTINE}
    >
      <List
        {...useRoutines()}
        columnMap={getRoutineColumns(useRoutineActions())}
        renderGridItemContents={(routine) => (
          <RoutineListGridItemContents routine={routine} />
        )}
      />
    </ListPage>
  );
};
