import { ListPage, List } from "../components/list";
import {
  ArrangementListGridItemContents,
  getArrangementColumns,
  useArrangementActions,
} from "../components/resources/arrangements";
import { useArrangements } from "../hooks";

export const ArrangementList = () => {
  return (
    <ListPage
      title={"Scores"}
      subtitle={"Arrangements or original compositions of works of music"}
    >
      <List
        title={"Scores"}
        {...useArrangements()}
        columnMap={getArrangementColumns(useArrangementActions())}
        renderGridItemContents={(arrangement) => (
          <ArrangementListGridItemContents arrangement={arrangement} />
        )}
      />
    </ListPage>
  );
};
