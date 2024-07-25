import { API_KEY_AVI_EDGE } from "./constants";
import axios from "axios";

// // Displaying the data in a more appealing way

// // Gets all flight data for arrivals for a given airport code
// export const fetchArrivalData = (airportCode: string) => {
//   return fetch(
//     `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&arrivalIata=${airportCode}&limit=100`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: API_KEY_AVI_EDGE,
//       },
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Departure Data:", data);
//       return data;
//     })
//     .then(processServerResponse);
// };

export async function fetchDepartureData(airportCode: string) {
  try {
    const response = await axios.get(
      `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&departureIata=${airportCode}&limit=100`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchArrivalData(airportCode: string) {
  try {
    const response = await axios.get(
      `https://aviation-edge.com/v2/public/routes?key=${API_KEY_AVI_EDGE}&arrivalIata=${airportCode}&limit=100`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function displayRoute(route: any) {
  console.log(`Flight No: ${route.flightNumber}`);
  console.log(
    `From ${route.departureIata} (${route.departureTime}) to ${route.arrivalIata} (${route.arrivalTime})`
  );
  console.log(`Airlines: ${route.airlineIata}`);
}
