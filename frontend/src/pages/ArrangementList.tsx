import { ListViewContainer } from "../components/list";
import {
  getArrangementColumns,
  ArrangementListGridItemContents,
  useArrangementActions,
} from "../components/resources/arrangements";
import { useArrangements } from "../hooks";
import { getTitle } from "../utils";

export const ArrangementList = () => {
  const listState = useArrangements();
  const actions = useArrangementActions();

  return (
    <>
      <title>{getTitle("Scores")}</title>
      <ListViewContainer
        title="Scores"
        useResourcesState={listState}
        columnMap={getArrangementColumns(actions)}
        renderGridItemContents={(arrangement) => (
          <ArrangementListGridItemContents arrangement={arrangement} />
        )}
      />
    </>
  );
};
