import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useComposition } from "../hooks";

export const CompositionDetail = () => {
  const { id } = useParams();
  const { composition, loading, error } = useComposition(Number(id));
  console.log(composition);

  if (loading) return "Loading...";
  else if (error || !composition) return error?.message || "An error occurred";

  return (
    <>
      <Heading>{composition.name}</Heading>
    </>
  );
};
