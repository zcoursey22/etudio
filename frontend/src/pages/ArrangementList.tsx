import { ListViewContainer } from "../components/list";
import {
  getArrangementColumns,
  ArrangementListGridItemContents,
  useArrangementActions,
} from "../components/resources/arrangements";
import { useArrangements } from "../hooks";

export const ArrangementList = () => {
  const listState = useArrangements();
  const actions = useArrangementActions();

  return (
    <ListViewContainer
      title="Scores"
      useResourcesState={listState}
      columnMap={getArrangementColumns(actions)}
      renderGridItemContents={(arrangement) => (
        <ArrangementListGridItemContents arrangement={arrangement} />
      )}
    />
  );
};
