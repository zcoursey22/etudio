import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const CompositionDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Composition {id}</Heading>
    </>
  );
};
