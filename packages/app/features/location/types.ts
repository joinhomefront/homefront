
export interface Hex {
  resolution: number;
  hex: string;
}

export interface HexWithPopulation extends Hex {
  population: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}
