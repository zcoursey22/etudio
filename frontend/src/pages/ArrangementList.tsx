import { ListPage, List } from "../components/list";
import {
  ArrangementListGridItemContents,
  getArrangementColumns,
  useArrangementActions,
} from "../components/resources/arrangements";
import { ListId } from "../constants";
import { useArrangements } from "../hooks";

export const ArrangementList = () => {
  return (
    <ListPage
      title={"Scores"}
      subtitle={"Arrangements or the original composition of works of music"}
      id={ListId.ARRANGEMENTS}
    >
      <List
        {...useArrangements()}
        columnMap={getArrangementColumns(useArrangementActions())}
        renderGridItemContents={(arrangement) => (
          <ArrangementListGridItemContents arrangement={arrangement} />
        )}
      />
    </ListPage>
  );
};
