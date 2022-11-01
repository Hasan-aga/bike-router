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

  const distance: number[] = [];
  const elevation: number[] = [];

  legElevations.forEach((legElevation) => {
    distance.push(legElevation[0]);
    elevation.push(legElevation[1]);
  });

  // optimize array size to avoid performance problems
  const distanceOptimized: number[] = [];
  const elevationOptimized: number[] = [];
  const minDist = 5; // ~5m
  const minHeight = 10; // ~10m

  distance.forEach((dist, index) => {
    if (
      index === 0 ||
      index === distance.length - 1 ||
      dist - distanceOptimized[distanceOptimized.length - 1] > minDist ||
      Math.abs(
        elevation[index] - elevationOptimized[elevationOptimized.length - 1]
      ) > minHeight
    ) {
      distanceOptimized.push(dist);
      elevationOptimized.push(elevation[index]);
    }
  });
  const result = [];
  for (let i = 0; i < elevationOptimized.length; i++) {
    result.push({
      elevation: elevationOptimized[i],
      distance: distanceOptimized[i],
    });
  }
  // TODO: this should be memoized or used in a hook

  return result;
}
