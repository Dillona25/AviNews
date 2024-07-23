import { processServerRes } from "./newsApi";
import { API_KEY_AVI_EDGE } from "./constants";

interface Airport {
  airportId: string;
  nameAirport: string;
  codeIataAirport: string;
}

// Gets all flight data for departures for a given airport code
export const getDepartureData = (airportCode: string): Promise<Airport[]> => {
  return fetch(
    `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&departureIata=${airportCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY_AVI_EDGE,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Departure Data:", data);
      return data;
    })
    .then(processServerRes);
};

// Gets all flight data for arrivals for a given airport code
export const getArrivalData = (airportCode: string): Promise<Airport[]> => {
  return fetch(
    `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&arrivalIata=${airportCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY_AVI_EDGE,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Departure Data:", data);
      return data;
    })
    .then(processServerRes);
};
