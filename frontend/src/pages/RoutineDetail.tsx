import { DetailPage, DetailPageContainer } from "../components/detail";
import { getFormattedDescription } from "../utils";
import { ResourceProvider } from "../providers";
import { ResourceType } from "../constants";
import { Routine } from "../resources/models";

export const RoutineDetail = () => {
  return (
    <ResourceProvider type={ResourceType.ROUTINE}>
      <DetailPageContainer>
        {(routine: Routine) => {
          const { name, description } = routine;
          return (
            <DetailPage
              resource={routine}
              title={name}
              subtitle={"routine"}
              mainContent={description && getFormattedDescription(description)}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
