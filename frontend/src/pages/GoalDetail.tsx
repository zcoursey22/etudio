import { DetailPage, DetailPageContainer } from "../components/detail";
import { useGoalActions } from "../components/resources/goals";
import { useGoal } from "../hooks";
import { useParams } from "react-router-dom";

export const GoalDetail = () => {
  const { id } = useParams();
  const detailState = useGoal(id!);
  const actions = useGoalActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(goal) => {
        const { name, description, status } = goal;
        return (
          <DetailPage
            resource={goal}
            title={name}
            subtitle={status}
            actions={actions}
            mainContent={description}
          />
        );
      }}
    </DetailPageContainer>
  );
};
