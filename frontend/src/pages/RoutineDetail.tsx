import { DetailPage, DetailViewContainer } from "../components/detail";
import { routineActions } from "../components/resources/routines";
import { useRoutine } from "../hooks";
import { useParams } from "react-router-dom";

export const RoutineDetail = () => {
  const { id } = useParams();
  const detailState = useRoutine(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(routine) => {
        const { name } = routine;
        return (
          <DetailPage
            resource={routine}
            title={name}
            subtitle={"routine"}
            actionMap={routineActions}
          />
        );
      }}
    </DetailViewContainer>
  );
};
