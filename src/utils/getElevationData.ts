import { Point } from "../contexts/point.context";
import { Leg, Route } from "./routeTypes";

export const relateDistanceAcrossLegs = (legs: Leg[]): number[][] => {
  const elevation_range: number[][] = [];

  legs.forEach((leg, index) => {
    //  each elevation_range is array of [distance, elevation]
    // distance of current leg must be incremented by last distance of prev leg
    // if index === 0 -> increment = 0
    //  if index > 0 -> increment = prevLeg.elevation_range.at(-1)[0]
    const lastElevationRange =
      index > 0 ? legs[index - 1].elevation_range.at(-1) : undefined;
    const increment = lastElevationRange ? lastElevationRange[0] : 0;
    const fixedElevationRange = leg.elevation_range.map((elevation) => {
      const distance = elevation[0] + increment;
      return [distance, elevation[1]];
    });

    elevation_range.push(...fixedElevationRange);
  });
  return elevation_range;
};

export const getPointFromDistance = (
  distance: number,
  pathData: Route
): Point => {
  const elevation_range = relateDistanceAcrossLegs(
    pathData.features[0].properties.legs
  );
  const hoveredIndex = elevation_range.findIndex(
    (data) => data[0] === distance
  );

  const hoveredPoint =
    pathData.features[0].geometry.coordinates.flat()[hoveredIndex];

  return {
    type: "temporary",
    coords: { lat: hoveredPoint[1], lng: hoveredPoint[0] },
  };
};

export function calculateElevation(routeData: Route) {
  const legElevations: number[][] = relateDistanceAcrossLegs(
    routeData.features[0].properties.legs
  );

  const labels: number[] = [];
  const data: number[] = [];

  legElevations.forEach((legElevation) => {
    labels.push(legElevation[0]);
    data.push(legElevation[1]);
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
