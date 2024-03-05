// Creating an object to specify the type of each prop, this ensure we dont pass the wrong type down the line
type Props = {
  placeholder: string;
  className?: string;
};

// "React.FC" stand for functional component so here I am defining that this is a functional component and I am deifning props directly in our parameters
export const SearchBar = ({ placeholder, className }: Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full bg-white rounded-[20px] p-4 m-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${className}`}
    ></input>
  );
};