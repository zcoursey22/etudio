import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const SupplementaryDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Supplementary {id}</Heading>
    </>
  );
};
