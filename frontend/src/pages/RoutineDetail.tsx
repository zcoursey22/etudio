import { Heading } from "@chakra-ui/react";
import { DetailViewContainer } from "../components/detail";
import { useRoutine } from "../hooks";
import { useParams } from "react-router-dom";

export const RoutineDetail = () => {
  const { id } = useParams();
  const detailState = useRoutine(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => (
        <>
          <Heading>{name}</Heading>
        </>
      )}
    </DetailViewContainer>
  );
};
