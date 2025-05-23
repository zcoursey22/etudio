import { DetailPage, DetailPageContainer } from "../components/detail";
import { useSupplementaryActions } from "../components/resources/supplementaries";
import { useSupplementary } from "../hooks";
import { useParams } from "react-router-dom";

export const SupplementaryDetail = () => {
  const { id } = useParams();
  const detailState = useSupplementary(id!);
  const actions = useSupplementaryActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(supplementary) => {
        const { name } = supplementary;
        return (
          <DetailPage
            resource={supplementary}
            title={name}
            subtitle={"supplementary"}
            actions={actions}
          />
        );
      }}
    </DetailPageContainer>
  );
};
