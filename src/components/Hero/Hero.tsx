import { SearchBar } from "../SearchBar/SearchBar";
import { Button } from "../Button/Button";
import "../../vendor/fonts.css";
import { FormEvent, useState } from "react";
import { motion, spring } from "framer-motion";

type GetArticlesParams = {
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  userInput?: string;
};

type Props = {
  handleSearch: (params: GetArticlesParams) => void;
  handleSearchDepartures: (airportCode: string) => void;
};

export const Hero = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeForm, setActiveForm] = useState<"news" | "flights" | null>(null);

  const handleSearchBarChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (activeForm === "news") {
      props.handleSearch({
        userInput: searchValue,
        fromDate: "",
        toDate: "",
        pageSize: 100,
      });
    } else if (activeForm === "flights") {
      props.handleSearchDepartures(searchValue);
    }
    setSearchValue("");
  };

  const handleNewSearchTypeClick = () => {
    setActiveForm(null);
  };

  return (
    <header className="mt-7 px-4 py-[32px] sm:py-[80px] flex flex-col sm:max-w-[650px] sm:m-auto">
      <div className="gap-4 flex flex-col sm:gap-8">
        <h1 className="text-white text-[36px] font-normal leading-[44px] w-[288px] sm:w-full sm:text-[60px] sm:mt-[80px] sm:leading-[64px]">
          Top aviation news and flight tracking!
        </h1>
        <p className="text-white font-normal w-[288px] sm:w-full sm:text-[18px]">
          Have a case of FOMO or needing status on a flight? Worry no more. We
          are your source for the top recent aviation news and flight tracking.
        </p>
      </div>
      {activeForm === null && (
        <div className="flex flex-col sm:flex-row gap-4 mt-14">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setActiveForm("news")}
            className="rounded-full w-full m-auto py-5 text-center bg-[#2F71E5] text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
          >
            Search News
          </motion.button>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setActiveForm("flights")}
            className="rounded-full w-full m-auto py-5 text-center bg-white text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
          >
            Search Flights
          </motion.button>
        </div>
      )}
      {activeForm === "news" && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:relative mt-14"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <SearchBar
              placeholder="Search news articles"
              className="sm:py-5 sm:rounded-full "
              onChange={handleSearchBarChange}
              value={searchValue}
            />
            <Button
              text="Search"
              onClick={handleSearchSubmit}
              className="sm:absolute sm:py-5 sm:rounded-full sm:w-[150px] sm:right-0 mt-4 sm:mt-0"
            />
          </motion.div>
        </form>
      )}
      {activeForm === "flights" && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:relative mt-14"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <SearchBar
              placeholder="Track flights with airport code"
              className="sm:py-5 sm:rounded-full "
              onChange={handleSearchBarChange}
              value={searchValue}
            />
            <Button
              text="Search"
              onClick={handleSearchSubmit}
              className="sm:absolute sm:py-5 sm:rounded-full sm:w-[150px] sm:right-0 mt-4 sm:mt-0"
            />
          </motion.div>
        </form>
      )}
      <button
        onClick={handleNewSearchTypeClick}
        className={`text-center underline underline-offset-2 text-white mt-5 ${
          activeForm === null ? "invisible" : ""
        }`}
      >
        New search type
      </button>
    </header>
  );
};
