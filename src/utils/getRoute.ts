import { LatLngLiteral } from "leaflet";
import { Route } from "./routeTypes";
var axios = require("axios");

export const getRoute = async (points: LatLngLiteral[]) => {
  const waypoints = points
    .map((p) => {
      return `${p.lat},${p.lng}`;
    })
    .join("|");

  const data = JSON.stringify({
    url: `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&details=elevation`,
  });

  const serverlessUrl = `https://us-central1-neat-episode-365710.cloudfunctions.net/attachAPIkey`;

  const config = {
    method: "post",
    url: serverlessUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);

    const result: Route = await response.json();
    console.log(result);

    return result;
  } catch (e) {
    throw e;
  }
};
