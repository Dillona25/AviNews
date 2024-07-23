import { NEWS_BASE_URL } from "./constants";

// Types for each parameter that we have for the request
type GetArticlesParams = {
  fromDate: string;
  toDate: string;
  pageSize: number;
  userInput?: string;
};

export const processServerRes = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
};

// Search query in which does its best to condense the user input to aviation articles related to their input
const searchQuery = ({ userInput }: GetArticlesParams) =>
  `${userInput} AND (aviation OR aircraft)`;

// Request to getArticles using the fetch method
export const getArticles = ({
  fromDate,
  toDate,
  pageSize,
  userInput,
}: GetArticlesParams) => {
  const query = searchQuery({ userInput, fromDate, toDate, pageSize });
  return fetch(
    `${NEWS_BASE_URL}/everything/?q=${query}&apiKey=f048494bbf6540f1995cbbfe929e5677&$from=${fromDate}&to=${toDate}$pageSize=${pageSize}, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: ApiKey,
      }
    }`
  ).then(processServerRes);
};
