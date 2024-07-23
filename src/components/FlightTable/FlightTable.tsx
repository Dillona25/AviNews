export const FlightTable = () => {
  return (
    <section className="py-8">
      <div className=" max-w-[1600px] m-auto flex flex-col sm:flex-row sm:justify-evenly">
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
              <th className="py-2 px-4 border-b">Orgin</th>
              <th className="py-2 px-4 border-b">Destination</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center font-Roboto">
              <td className="py-2 px-4 border-b">8:30</td>
              <td className="py-2 px-4 border-b">Alaska</td>
              <td className="py-2 px-4 border-b">HY67H</td>
              <td className="py-2 px-4 border-b">PDX</td>
              <td className="py-2 px-4 border-b">LAX</td>
            </tr>
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
              <th className="py-2 px-4 border-b">Orgin</th>
              <th className="py-2 px-4 border-b">Destination</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 border-b">8:30</td>
              <td className="py-2 px-4 border-b">Alaska</td>
              <td className="py-2 px-4 border-b">HY67H</td>
              <td className="py-2 px-4 border-b">PDX</td>
              <td className="py-2 px-4 border-b">LAX</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
