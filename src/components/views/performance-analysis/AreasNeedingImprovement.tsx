import { Itemtext } from "../../../models/performance-analysis";
import { ContentCardText } from "./ContentCardText";

export const AreasNeedingImprovement = ({ areasneedingimprovement }: { areasneedingimprovement?: Itemtext[] }) => {
    if (!areasneedingimprovement || areasneedingimprovement.length === 0) {
        return null;
      }
    return (
        <ContentCardText
            title={"Areas Needing Improvement"}
            items={areasneedingimprovement}
        />
    )
}