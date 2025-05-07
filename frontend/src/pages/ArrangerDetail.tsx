import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ArrangerDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Arranger {id}</Heading>
    </>
  );
};
