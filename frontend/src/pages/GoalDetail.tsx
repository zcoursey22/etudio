import { DetailPage, DetailPageContainer } from "../components/detail";
import { GoalStatusBadge } from "../components/resources/goals";
import { ResourceProvider } from "../providers";
import { Goal } from "../resources/models";
import { ResourceType } from "../constants";
import { getFormattedDescription } from "../utils";

export const GoalDetail = () => {
  return (
    <ResourceProvider type={ResourceType.GOAL}>
      <DetailPageContainer>
        {(goal: Goal) => {
          const { id, name, description, status } = goal;
          return (
            <DetailPage
              resource={goal}
              title={name}
              subtitle={<GoalStatusBadge id={Number(id)} status={status} />}
              mainContent={description && getFormattedDescription(description)}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
