import { List, ListPage } from "../components/list";
import {
  getSupplementaryColumns,
  SupplementaryListGridItemContents,
  useSupplementaryActions,
} from "../components/resources/supplementaries";
import { useSupplementaries } from "../hooks";

export const SupplementaryList = () => {
  return (
    <ListPage title={"Supplementaries"}>
      <List
        title="Supplementaries"
        {...useSupplementaries()}
        columnMap={getSupplementaryColumns(useSupplementaryActions())}
        renderGridItemContents={(supplementary) => (
          <SupplementaryListGridItemContents supplementary={supplementary} />
        )}
      />
    </ListPage>
  );
};
