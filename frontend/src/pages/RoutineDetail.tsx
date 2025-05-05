import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const RoutineDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Routine {id}</Heading>
    </>
  );
};
