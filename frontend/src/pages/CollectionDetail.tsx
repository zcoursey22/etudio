import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const CollectionDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Collection {id}</Heading>
    </>
  );
};
