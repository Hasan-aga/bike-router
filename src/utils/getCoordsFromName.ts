import { getJsonFromFetch } from "./getJsonFromFetch";

export const getCoordsFromName = async function (countryName: string) {
  try {
    const countryData = await getJsonFromFetch(countryName);

    const latlng = [countryData.results[0].lat, countryData.results[0].lon];
    return latlng;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(
        `failed to get location for ${countryName}, ${e.message}`
      );
    }
  }
};
