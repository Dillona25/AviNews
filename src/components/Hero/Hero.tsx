import { SearchBar } from "../SearchBar/SearchBar";
import { Button } from "../Button/Button";
import "../../vendor/fonts.css";
import { FormEvent, useState } from "react";

type GetArticlesParams = {
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  userInput?: string;
};

type Props = {
  handleSearch: (params: GetArticlesParams) => void;
  handleFlightSearchModal: () => void;
};

export const Hero = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBarChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchValue("");
    if (props.handleSearch) {
      props.handleSearch({
        userInput: searchValue,
        fromDate: "",
        toDate: "",
        pageSize: 100,
      });
    }
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
      {/* This div only appears on desktop */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:relative mt-20"
      >
        <SearchBar
          placeholder="Search news articles"
          className="sm:py-5 sm:rounded-full mb-2"
          onChange={handleSearchBarChange}
          value={searchValue}
        />
        <Button
          text="Search"
          onClick={handleSearchSubmit}
          className="sm:absolute sm:py-5 sm:rounded-full sm:w-[150px] sm:right-0 mt-4 sm:mt-0"
        />
      </form>
      <p className="m-auto text-white text-lg mt-5">
        Or track a flight{" "}
        <button
          onClick={props.handleFlightSearchModal}
          className="underline underline-offset-2 cursor-pointer"
        >
          here
        </button>
      </p>
    </header>
  );
};
