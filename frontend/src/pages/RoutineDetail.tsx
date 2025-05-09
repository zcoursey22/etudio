import { Heading } from "@chakra-ui/react";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { useRoutine } from "../hooks";

export const RoutineDetail = () => {
  return (
    <DetailViewContainer useResource={useRoutine}>
      {({ name }) => (
        <>
          <Heading>{name}</Heading>
        </>
      )}
    </DetailViewContainer>
  );
};
