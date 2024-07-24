import { processServerResponse } from "./processServerResponse";
import { API_KEY_AVI_EDGE } from "./constants";

// Gets all flight data for departures for a given airport code
export const fetchDepartureData = (airportCode: string) => {
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
    .then(processServerResponse);
};

// Displaying the data in a more appealing way

// Gets all flight data for arrivals for a given airport code
export const fetchArrivalData = (airportCode: string) => {
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
    .then(processServerResponse);
};
