import { DetailPage, DetailPageContainer } from "../components/detail";
import { getFormattedDescription } from "../utils";
import { ResourceProvider } from "../providers";
import { ResourceType } from "../constants";
import { Supplementary } from "../resources/models";

export const SupplementaryDetail = () => {
  return (
    <ResourceProvider type={ResourceType.SUPPLEMENTARY}>
      <DetailPageContainer>
        {(supplementary: Supplementary) => {
          const { name, description } = supplementary;
          return (
            <DetailPage
              resource={supplementary}
              title={name}
              subtitle={"supplementary"}
              mainContent={description && getFormattedDescription(description)}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
