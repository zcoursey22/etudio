import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const SourceDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Source {id}</Heading>
    </>
  );
};
