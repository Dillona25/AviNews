import { motion } from "framer-motion";
import { SearchBar } from "../SearchBar/SearchBar";
import { Button } from "../Button/Button";
import Tracker from "../../images/FlightTracker.jpg";
import { FormEvent, useState } from "react";

export const FlightSearchModal = ({
  closeModal,
  handleSearchDepartures,
}: {
  closeModal: () => void;
  handleSearchDepartures: (airportCode: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBarChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchValue("");
    handleSearchDepartures(searchValue);
  };

  return (
    <div className="modal fixed flex flex-col items-center bottom-0 inset-0 z-50 backdrop-blur-md sm:h-[100%] sm:w-[100%] bg-black bg-opacity-50">
      <div className="sm:h-fit absolute bottom-0 bg-white m-auto p-5 sm:p-8 rounded-xl box-border sm:w-[700px] sm:top-0 sm:bottom-0 sm:left-0 sm:right-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="py-10"
        >
          <button
            onClick={closeModal}
            className="bg-closeIcon h-6 w-6 absolute right-[15px] top-[15px]"
          />
          <div className="flex flex-col gap-4">
            <h1 className="font-normal text-[40px] text-center sm:text-[50px]">
              Lets track flights!
            </h1>
            <img
              alt="flight tracker image"
              src={Tracker}
              className="w-[400px] m-auto"
            />
            <p className="text-lg text-center">
              Enter the aiports three letter identification code. This will pull
              up departures and arrivals where you will find a list of flights
            </p>
            <form className="flex flex-col sm:relative mt-5">
              <SearchBar
                placeholder="Airport Code"
                className="sm:py-5 sm:rounded-full mb-2"
                value={searchValue}
                onChange={handleSearchBarChange}
              />
              <Button
                text="Search"
                onClick={handleSearchSubmit}
                className="sm:absolute sm:py-5 sm:rounded-full sm:w-[150px] sm:right-0 mt-4 sm:mt-0"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
