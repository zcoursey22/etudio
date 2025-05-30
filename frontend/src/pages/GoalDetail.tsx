import { useParams } from "react-router-dom";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { GoalStatusBadge } from "../components/resources/goals";
import { ResourceProvider } from "../providers";
import { Goal } from "../resources/models";

export const GoalDetail = () => {
  const { id } = useParams();

  return (
    <ResourceProvider type={"goal"}>
      <DetailPageContainer id={Number(id!)}>
        {(goal: Goal) => {
          const { name, description, status } = goal;
          return (
            <DetailPage
              resource={goal}
              title={name}
              subtitle={<GoalStatusBadge id={Number(id!)} status={status} />}
              mainContent={description}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
