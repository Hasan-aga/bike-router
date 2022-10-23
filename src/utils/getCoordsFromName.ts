import { getJsonFromFetch } from "./getJsonFromFetch";

export const getCoordsFromName = async function (countryName: string) {
  try {
    console.log(`fetching info for ${countryName}`);
    const countryData = await getJsonFromFetch(countryName);
    console.log("country data: ", countryData);

    const latlng = [countryData.results[0].lat, countryData.results[0].lon];
    return latlng;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(
        `failed to get location for ${countryName}, ${e.message}`
      );
    }
  }
};
