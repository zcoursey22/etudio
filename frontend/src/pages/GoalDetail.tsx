import { DetailPage, DetailViewContainer } from "../components/detail";
import { goalActions } from "../components/resources/goals";
import { useGoal } from "../hooks";
import { useParams } from "react-router-dom";

export const GoalDetail = () => {
  const { id } = useParams();
  const detailState = useGoal(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(goal) => {
        const { name, description } = goal;
        return (
          <DetailPage
            resource={goal}
            title={name}
            subtitle={"goal"}
            actionMap={goalActions}
            mainContent={description}
          />
        );
      }}
    </DetailViewContainer>
  );
};
