import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ArrangementDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Arrangement {id}</Heading>
    </>
  );
};
