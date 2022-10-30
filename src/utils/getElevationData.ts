import { Route } from "./routeTypes";

export function calculateElevationProfileData(routeData: Route) {
  const legElevations: number[][][] = [];

  // elevation_range contains pairs [distance, elevation] for every leg geometry point
  routeData.features[0].properties.legs.forEach((leg) => {
    if (leg.elevation_range) {
      legElevations.push(leg.elevation_range);
    } else {
      legElevations.push([]);
    }
  });
  const labels: number[] = [];
  const data: number[] = [];

  legElevations.forEach((legElevation, index) => {
    let previousLegsDistance = 0;
    for (let i = 0; i <= index - 1; i++) {
      previousLegsDistance += legElevations[i][legElevations[i].length - 1][0];
    }

    labels.push(
      ...legElevation.map(
        (elevationData) => elevationData[0] + previousLegsDistance
      )
    );
    data.push(...legElevation.map((elevationData) => elevationData[1]));
  });

  // optimize array size to avoid performance problems
  const labelsOptimized: number[] = [];
  const dataOptimized: number[] = [];
  const minDist = 5; // ~5m
  const minHeight = 10; // ~10m

  labels.forEach((dist, index) => {
    if (
      index === 0 ||
      index === labels.length - 1 ||
      dist - labelsOptimized[labelsOptimized.length - 1] > minDist ||
      Math.abs(data[index] - dataOptimized[dataOptimized.length - 1]) >
        minHeight
    ) {
      labelsOptimized.push(dist);
      dataOptimized.push(data[index]);
    }
  });
  const result = [];
  for (let i = 0; i < dataOptimized.length; i++) {
    result.push({
      data: dataOptimized[i],
      label: labelsOptimized[i],
    });
  }
  // TODO: this should be memoized or used in a hook
  return result;
}
