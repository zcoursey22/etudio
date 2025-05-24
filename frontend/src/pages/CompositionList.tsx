import { List, ListPage } from "../components/list";
import {
  CompositionListGridItemContents,
  getCompositionColumns,
  useCompositionActions,
} from "../components/resources/compositions";
import { ListId } from "../constants";
import { useCompositions } from "../hooks";

export const CompositionList = () => {
  return (
    <ListPage
      title={"Compositions"}
      subtitle={"Works of music"}
      id={ListId.COMPOSITIONS}
    >
      <List
        {...useCompositions()}
        columnMap={getCompositionColumns(useCompositionActions())}
        renderGridItemContents={(composition) => (
          <CompositionListGridItemContents composition={composition} />
        )}
      />
    </ListPage>
  );
};
