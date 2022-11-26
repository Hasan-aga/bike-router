import { LatLngLiteral } from "leaflet";
import { Route } from "./routeTypes";

export const getRoute = async (points: LatLngLiteral[]) => {
  const waypoints = points
    .map((p) => {
      return `${p.lat},${p.lng}`;
    })
    .join("|");

  const serverlessUrl = `https://us-central1-neat-episode-365710.cloudfunctions.net/attachAPIkey`;
  try {
    const response = await fetch(serverlessUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&details=elevation`,
      }),
    });

    const result: Route = await response.json();
    console.log(result);

    return result;
  } catch (e) {
    throw e;
  }
};
