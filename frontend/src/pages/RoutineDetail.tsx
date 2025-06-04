import { DetailPage, DetailPageContainer } from "../components/detail";
import { useRoutineActions } from "../components/resources/routines";
import { useRoutine } from "../hooks";
import { useParams } from "react-router-dom";
import { getFormattedDescription } from "../utils";

export const RoutineDetail = () => {
  const { id } = useParams();
  const detailState = useRoutine(id!);
  const actions = useRoutineActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(routine) => {
        const { name, description } = routine;
        return (
          <DetailPage
            resource={routine}
            title={name}
            subtitle={"routine"}
            actions={actions}
            mainContent={description && getFormattedDescription(description)}
          />
        );
      }}
    </DetailPageContainer>
  );
};
