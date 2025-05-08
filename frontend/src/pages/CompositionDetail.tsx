import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useComposition } from "../hooks";

export const CompositionDetail = () => {
  const { id } = useParams();
  const { data: composition, isLoading, error } = useComposition(Number(id));
  console.log(composition);

  if (isLoading) return "Loading...";
  else if (error || !composition) return error?.message || "An error occurred";

  return (
    <>
      <Heading>{composition.name}</Heading>
    </>
  );
};
