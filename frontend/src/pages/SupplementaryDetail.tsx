import { Heading } from "@chakra-ui/react";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { useSupplementary } from "../hooks";

export const SupplementaryDetail = () => {
  return (
    <DetailViewContainer useResource={useSupplementary}>
      {({ name }) => (
        <>
          <Heading>{name}</Heading>
        </>
      )}
    </DetailViewContainer>
  );
};
