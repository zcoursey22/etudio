import { Heading } from "@chakra-ui/react";
import { DetailViewContainer } from "../components/detail";
import { useSupplementary } from "../hooks";
import { useParams } from "react-router-dom";

export const SupplementaryDetail = () => {
  const { id } = useParams();
  const detailState = useSupplementary(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => (
        <>
          <Heading>{name}</Heading>
        </>
      )}
    </DetailViewContainer>
  );
};
