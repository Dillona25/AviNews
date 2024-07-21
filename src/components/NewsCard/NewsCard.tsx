import { Link, useLocation } from "react-router-dom";
import { Article } from "../App";

type Props = {
  isLoggedIn?: boolean;
  cardObj: Article;
  options?: string;
  handleSaveArticle?: (card: Article) => void;
  handleDeleteArticle?: (articleId: Article) => void;
  savedNewsArticles?: Article[];
};

export const NewsCard = (props: Props) => {
  const cardObj = props.cardObj;
  const location = useLocation();

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    const formattedDate = new Date(cardObj.publishedAt).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const isArticleSaved = props.savedNewsArticles?.some(
    (article) => article.title === cardObj.title
  );

  return (
    <div className="relative flex flex-col sm:h-[576px] w-[288px] sm:w-[400px] rounded-[20px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      {props.isLoggedIn ? (
        <div className="bg-white h-10 w-10 absolute right-[16px] top-[16px] rounded-[10px] flex">
          <button
            disabled={isArticleSaved}
            onClick={() =>
              props.handleSaveArticle?.({
                author: props.cardObj.author,
                title: props.cardObj.title,
                description: props.cardObj.description,
                publishedAt: props.cardObj.publishedAt,
                url: props.cardObj.url,
                urlToImage: props.cardObj.urlToImage,
                _id: props.cardObj._id,
              })
            }
            className={`z-10 h-6 w-6 m-auto ${
              isArticleSaved
                ? "bg-saveIconSaved hover:bg-saveIconSaved hover:cursor-not-allowed"
                : "bg-saveIcon"
            } hover:bg-saveIconHover`}
          ></button>
        </div>
      ) : (
        ""
      )}
      {location.pathname === "/SavedArticles" && (
        <div className="bg-white h-10 w-10 absolute right-[16px] top-[16px] rounded-[10px] flex">
          <button
            onClick={() =>
              props.handleDeleteArticle?.({
                author: props.cardObj.author,
                title: props.cardObj.title,
                description: props.cardObj.description,
                publishedAt: props.cardObj.publishedAt,
                url: props.cardObj.url,
                urlToImage: props.cardObj.urlToImage,
                _id: props.cardObj._id,
              })
            }
            className="bg-deleteIcon hover:bg-deleteHover h-6 w-6 m-auto"
          ></button>
        </div>
      )}
      <Link to={cardObj.url}>
        {cardObj.urlToImage ? (
          <img
            src={cardObj.urlToImage}
            alt={cardObj.title}
            className="h-[196px] w-full sm:h-[272px] rounded-t-[10px] shrink-0 object-cover"
          />
        ) : (
          <p className="h-[196px] w-full sm:h-[272px] rounded-t-[10px] flex items-center justify-center bg-gray-200">
            Sorry, this article has no image.
          </p>
        )}
        <div className="flex flex-col sm:justify-between gap-2 px-4 py-5">
          <div className="px-2 bg-[#f5f6f7] max-w-fit rounded-md line-clamp-1">
            <p className="hidden sm:block font-bold font-RobotoSlab text-[18px] text-[#84898b] ">
              {cardObj.author}
            </p>
          </div>
          <h1 className="font-RobotoSlab font-normal text-[22px] sm:text-[26px] leading-[24px] sm:leading-[30px] line-clamp-1">
            {cardObj.title}
          </h1>
          {cardObj.description ? (
            <p className="font-normal line-clamp-4 sm:line-clamp-5">
              {cardObj.description}
            </p>
          ) : (
            <p className=" w-full">Sorry, this article has no description.</p>
          )}
          <div className="px-2 bg-[#f5f6f7] w-fit rounded-md">
            <p className="font-bold font-RobotoSlab line-clamp-1 text-[18px] text-[#84898b] ">
              {formatDate()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
