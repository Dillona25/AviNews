import { API_KEY_AVI_EDGE } from "./constants";
import axios from "axios";

export type Route = {
  departureTime: string | null;
  arrivalTime: string | null;
  airlineIcao: string | null;
  flightNumber: string | null;
  departureIata: string | null;
  arrivalIata: string | null;
};

function hasNoNullValues(route: Route): boolean {
  return (
    route.departureTime !== null &&
    route.arrivalTime !== null &&
    route.airlineIcao !== null &&
    route.flightNumber !== null &&
    route.departureIata !== null &&
    route.arrivalIata !== null
  );
}

export async function fetchDepartureData(airportCode: string) {
  try {
    const response = await axios.get(
      `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&departureIata=${airportCode}&limit=100`
    );
    const routes = response.data.filter((route: Route) =>
      hasNoNullValues(route)
    );
    return routes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchArrivalData(airportCode: string) {
  try {
    const response = await axios.get(
      `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&arrivalIata=${airportCode}&limit=100`
    );
    const routes = response.data.filter((route: Route) =>
      hasNoNullValues(route)
    );
    return routes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function displayRoute(route: Route) {
  console.log(route);
}
