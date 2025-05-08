import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ArtistDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Heading>Artist {id}</Heading>
    </>
  );
};
