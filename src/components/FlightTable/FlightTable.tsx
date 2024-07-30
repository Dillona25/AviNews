import { useState, useEffect } from "react";
import {
  fetchDepartureData,
  fetchArrivalData,
  Route,
} from "../../utils/flightDataApi"; // Import your fetch functions

export const FlightTable = () => {
  const [departures, setDepartures] = useState<Route[]>([]);
  const [arrivals, setArrivals] = useState<Route[]>([]);
  const airportCode = "pdx"; // Replace with the desired airport code

  useEffect(() => {
    const fetchData = async (airportCode: string) => {
      const departureData = await fetchDepartureData(airportCode);
      const arrivalData = await fetchArrivalData(airportCode);
      setDepartures(departureData);
      setArrivals(arrivalData);
    };

    fetchData(airportCode);
  }, [airportCode]);

  return (
    <section className="py-8 bg-[#f5f6f7]">
      <div className="max-w-[1600px] m-auto flex flex-col sm:flex-row sm:justify-evenly">
        {/* Departure Table */}
        <table className="w-[45%] bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b text-center bg-[#76a0e9] font-RobotoSlab"
                colSpan={5}
              >
                Departures
              </th>
            </tr>
            <tr className="font-RobotoSlab">
              <th className="py-2 px-4 border-b">Depart Time</th>
              <th className="py-2 px-4 border-b">Airline</th>
              <th className="py-2 px-4 border-b">Flight</th>
              <th className="py-2 px-4 border-b">Origin</th>
              <th className="py-2 px-4 border-b">Destination</th>
            </tr>
          </thead>
          <tbody>
            {departures.map((route, index) => (
              <tr key={index} className="text-center font-Roboto">
                <td className="py-2 px-4 border-b">{route.departureTime}</td>
                <td className="py-2 px-4 border-b">{route.airlineIcao}</td>
                <td className="py-2 px-4 border-b">{route.flightNumber}</td>
                <td className="py-2 px-4 border-b">{route.departureIata}</td>
                <td className="py-2 px-4 border-b">{route.arrivalIata}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Arrival Table */}
        <table className="w-[45%] bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b text-center bg-[#76a0e9] font-RobotoSlab"
                colSpan={5}
              >
                Arrivals
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b">Arrival Time</th>
              <th className="py-2 px-4 border-b">Airline</th>
              <th className="py-2 px-4 border-b">Flight</th>
              <th className="py-2 px-4 border-b">Origin</th>
              <th className="py-2 px-4 border-b">Destination</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.map((route, index) => (
              <tr key={index} className="text-center font-Roboto">
                <td className="py-2 px-4 border-b">{route.arrivalTime}</td>
                <td className="py-2 px-4 border-b">{route.airlineIcao}</td>
                <td className="py-2 px-4 border-b">{route.flightNumber}</td>
                <td className="py-2 px-4 border-b">{route.departureIata}</td>
                <td className="py-2 px-4 border-b">{route.arrivalIata}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
