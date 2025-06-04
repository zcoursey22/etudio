import { DetailPage, DetailPageContainer } from "../components/detail";
import { useSupplementaryActions } from "../components/resources/supplementaries";
import { useSupplementary } from "../hooks";
import { useParams } from "react-router-dom";
import { getFormattedDescription } from "../utils";

export const SupplementaryDetail = () => {
  const { id } = useParams();
  const detailState = useSupplementary(id!);
  const actions = useSupplementaryActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(supplementary) => {
        const { name, description } = supplementary;
        return (
          <DetailPage
            resource={supplementary}
            title={name}
            subtitle={"supplementary"}
            actions={actions}
            mainContent={description && getFormattedDescription(description)}
          />
        );
      }}
    </DetailPageContainer>
  );
};
