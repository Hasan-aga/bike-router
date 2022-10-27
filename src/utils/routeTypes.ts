export interface Root {
  features: Feature[];
  properties: Properties2;
  type: string;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  mode: string;
  waypoints: Waypoint[];
  units: string;
  details: string[];
  distance: number;
  distance_units: string;
  time: number;
  legs: Leg[];
}

export interface Waypoint {
  location: number[];
  original_index: number;
}

export interface Leg {
  distance: number;
  time: number;
  steps: Step[];
  elevation_range: number[][];
  elevation: number[];
}

export interface Step {
  from_index: number;
  to_index: number;
  distance: number;
  time: number;
  instruction: Instruction;
  max_elevation: number;
  min_elevation: number;
  elevation_gain: number;
  elevation: number;
}

export interface Instruction {
  text: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties2 {
  mode: string;
  waypoints: Waypoint2[];
  units: string;
  details: string[];
}

export interface Waypoint2 {
  lat: number;
  lon: number;
}

// i added this
export interface Route {
  features: Feature[];
  properties: Properties;
  type: string;
}
