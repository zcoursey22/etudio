import { ListPage, ListViewContainer } from "../components/list";
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
    <ListPage
      title={"Scores"}
      subtitle={
        "Original compositions or arrangements of compositions (works) of music"
      }
      listContent={
        <ListViewContainer
          title="Scores"
          useResourcesState={listState}
          columnMap={getArrangementColumns(actions)}
          renderGridItemContents={(arrangement) => (
            <ArrangementListGridItemContents arrangement={arrangement} />
          )}
        />
      }
      resources={listState.resources}
    />
  );
};
