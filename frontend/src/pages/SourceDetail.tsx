import { DetailPage, DetailPageContainer } from "../components/detail";
import { ResourceFrom } from "../components/resources/shared";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";
import { getFormattedDescription } from "../utils";
import { ResourceProvider } from "../providers";
import { Source } from "../resources/models";

export const SourceDetail = () => {
  return (
    <ResourceProvider type={ResourceType.SOURCE}>
      <DetailPageContainer>
        {(source: Source) => {
          const { name, description } = source;
          return (
            <DetailPage
              resource={source}
              title={name}
              rightOfTitle={
                <ResourceFrom
                  source={source.parent}
                  sourceSubresourceRouteSegment={ROUTE_SEGMENTS.SOURCES}
                  prefixPadding="1"
                />
              }
              subtitle={"source"}
              mainContent={description && getFormattedDescription(description)}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
