import { LatLngLiteral } from "leaflet";
import { Route } from "../contexts/routeTypes";

export const getRoute = async (points: LatLngLiteral[]) => {
  const waypoints = points
    .map((p) => {
      return `${p.lat},${p.lng}`;
    })
    .join("|");

  console.log(waypoints);

  const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&apiKey=${process.env.REACT_APP_API_KEY}
  `;
  try {
    const response = await fetch(url);

    const result: Route = await response.json();
    console.log(result);

    return result;
  } catch (e) {
    throw e;
  }
};
