import { LatLngLiteral } from "leaflet";
import { getJsonFromFetch } from "./getJsonFromFetch";
import { Route } from "./routeTypes";

export const getRoute = async (points: LatLngLiteral[]) => {
  const waypoints = points
    .map((p) => {
      return `${p.lat},${p.lng}`;
    })
    .join("|");

  const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&details=elevation`;

  try {
    const response = await getJsonFromFetch(url);
    const result = response as any as Route;
    return result;
  } catch (e) {
    throw e;
  }
};
