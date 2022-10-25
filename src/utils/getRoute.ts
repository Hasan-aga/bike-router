import { latLng, LatLngLiteral } from "leaflet";
import { Feature, Properties } from "../contexts/routeTypes";

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
    const result: {
      features: Feature[];
      properties: Properties;
      type: string;
    } = await response.json();
    console.log(result);

    return result;
  } catch (e) {
    throw e;
  }
};
