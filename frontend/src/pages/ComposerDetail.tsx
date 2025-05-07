import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ComposerDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Composer {id}</Heading>
    </>
  );
};
