export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  name_alt: string;
  abbreviation_STD: string;
  abbreviation_DST: string;
}

export interface Rank {
  importance: number;
  popularity: number;
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

export interface Bbox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

export interface Result {
  datasource: Datasource;
  name: string;
  city: string;
  district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  result_type: string;
  rank: Rank;
  place_id: string;
  bbox: Bbox;
  suburb: string;
  county: string;
  village: string;
}

export interface Parsed {
  city: string;
  expected_type: string;
}

export interface Query {
  text: string;
  parsed: Parsed;
}

export interface RootObject {
  results: Result[];
  query: Query;
}

export const getJsonFromFetch = async function (
  name: string
): Promise<RootObject> {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${name}&format=json&apiKey=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (e) {
    throw e;
  }
};
