import { Itemtext } from "../../../models/performance-analysis";
import { ContentCardText } from "./ContentCardText";

export const Strengths = ({ strengths }: { strengths?: Itemtext[] }) => {
  if (!strengths || strengths.length === 0) {
    return null;
  }
  return <ContentCardText title={"Strengths"} items={strengths} />;
};
