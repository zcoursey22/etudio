import { DetailPage, DetailPageContainer } from "../components/detail";
import { GoalStatusBadge } from "../components/resources/goals";
import { ResourceProvider } from "../providers";
import { Goal } from "../resources/models";

export const GoalDetail = () => {
  return (
    <ResourceProvider type={"goal"}>
      <DetailPageContainer>
        {(goal: Goal) => {
          const { name, description, status } = goal;
          return (
            <DetailPage
              resource={goal}
              title={name}
              subtitle={<GoalStatusBadge status={status} />}
              mainContent={description}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
