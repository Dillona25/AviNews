import { useState, useEffect } from "react";
// Component imports
import { Navbar } from "./Navbar/Navbar";
import { Hero } from "./Hero/Hero";
import { SearchArticles } from "./SearchArticles/SearchArticles";
import { Footer } from "./Footer/Footer";
import { About } from "./About/About";
import { SignInModal } from "./SignInModal/SignInModal";
import { NavDropDown } from "./NavbarDropDown/NavbarDropDown";
import { SignUpModal } from "./SignUpModal/SignUpModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SavedArticlesHeader } from "../routes/SavedArticlesHeader/SavedArticlesHeader";
import { SavedArticles } from "../routes/SavedArticles/SavedArticles";
import { ProfileModal } from "./ProfileModal/ProfileModal";
import { PreLoader } from "./PreLoader/PreLoader";
import { NotFound } from "./NotFound/Notfound";
import { getArticles, processServerRes } from "../utils/newsApi";
import { NoSearchYet } from "./NoSearchYet/NoSearchYet";
import useEscapeKey from "../hooks/useEscapeKey";
import { ArticleError } from "./ArticlesError/ArticlesError";
import * as auth from "../utils/authApi";
import {
  updateUser,
  saveArticle,
  getSavedArticles,
  deleteSaveArticles,
} from "../utils/MainApi";
import { LogoutConfirmModal } from "./LogoutConfirmModal/LogoutConfirmModal";
import { useCurrentUser } from "../store/currentUserContext";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import { FlightSearchModal } from "./FlightSearchModal/FlightSearchModal";
import { getArrivalData, getDepartureData } from "../utils/flightDataApi";
import { FlightTable } from "./FlightTable/FlightTable";

type GetArticlesParams = {
  fromDate: string;
  toDate: string;
  pageSize: number;
  userInput: string;
};

// A types object for thr Article that can be easily passed and used where needed
export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  _id: string;
}

type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  name: string;
  avatar: string;
  email: string;
  password: string;
};

type UpdateUserProps = {
  name: string;
  avatar: string;
};

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cardsData, setCardsData] = useState<Article[]>([]);
  const [searchedArticles, setSearchedArticles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [articlesError, setArticlesError] = useState("");
  const [savedNewsArticles, setSavedNewsArticles] = useState<Article[]>([]);
  const [_selectedArticleid, setSelectedArticleId] = useState(null);
  const { setCurrentUser } = useCurrentUser();
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);

  const handleNavMenu = () => {
    setActiveModal("navMenu");
  };

  const handleSignInModal = () => {
    setActiveModal("signIn");
  };

  const handleSignUpModal = () => {
    setActiveModal("signUp");
  };

  const handleProfileModal = () => {
    setActiveModal("profile");
  };

  const handleLogoutConfirm = () => {
    setActiveModal("logoutConfirm");
  };

  const handleArticlesConflictError = () => {
    setArticlesError("Error");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  // Calling the hook to close modals on escape
  useEscapeKey(closeModal);

  // Logic to handle Searching articles
  const handleSearch = ({
    fromDate,
    toDate,
    pageSize,
    userInput,
  }: GetArticlesParams) => {
    setIsLoading(true);
    getArticles({ fromDate, toDate, pageSize, userInput })
      .then((res) => {
        setCardsData(res.articles);
        setSearchedArticles(true);
        setSearchResults(true);
        setIsLoading(false);
      })
      .catch(() => {
        return handleArticlesConflictError();
      });
  };

  // Checking for token
  useEffect(() => {
    // Setting jwt to the token from local storage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      localStorage.setItem("jwt", jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          getSavedArticles(jwt).then((SavedArticles) => {
            setSavedNewsArticles(SavedArticles);
          });
        })
        .catch(console.error);
    }
  }, []);

  // Logic to login an existing user
  const handleLogin = ({ email, password }: LoginProps) => {
    auth
      .authorize({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          auth
            .checkToken(res.token)
            .then((data) => {
              setCurrentUser(data.data);
              setIsLoggedIn(true);
              getSavedArticles(res.token).then((SavedArticles) => {
                setSavedNewsArticles(SavedArticles);
              });
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  // Logic to register a new user
  function handleSignup({ email, password, avatar, name }: SignupProps) {
    auth
      .registration({ name, avatar, email, password })
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch(console.error);
  }

  // Logic go update the profile
  const updateProfile = ({ name, avatar }: UpdateUserProps) => {
    updateUser({ name, avatar })
      .then(({ data }) => {
        setCurrentUser(data);
        return data;
      })
      .catch(console.error);
  };

  const handleSaveArticle = (card: Article) => {
    saveArticle(card)
      .then(processServerRes)
      .then(({ data }) => {
        setSavedNewsArticles([...savedNewsArticles, data]);
        setSelectedArticleId(data._id);
      })
      .catch(console.error);
  };

  const handleDeleteArticle = (articleId: Article) => {
    deleteSaveArticles(articleId._id, localStorage.getItem("jwt") || "")
      .then(() => {
        const updatedArticles = savedNewsArticles.filter(
          (article) => article._id !== articleId._id
        );
        setSavedNewsArticles(updatedArticles);
      })
      .catch(console.error);
  };

  // Calling API endpoints to get flight data
  const handleSearchDepartures = (airportCode: string) => {
    getDepartureData(airportCode);
    getArrivalData(airportCode);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className={`bg-MobileHeaderImage bg-cover bg-center`}>
                <Navbar
                  handleNavMenu={handleNavMenu}
                  handleSignInModal={handleSignInModal}
                  handleProfileModal={handleProfileModal}
                  isLoggedIn={isLoggedIn}
                  handleLogoutConfirm={handleLogoutConfirm}
                />
                {activeModal === "navMenu" && (
                  <NavDropDown
                    isLoggedIn={isLoggedIn}
                    closeModal={closeModal}
                    handleSignInModal={handleSignInModal}
                    handleSignUpModal={handleSignUpModal}
                    handleProfileModal={handleProfileModal}
                    handleLogoutConfirm={handleLogoutConfirm}
                  />
                )}
                <Hero
                  handleSearch={handleSearch}
                  handleSearchDepartures={handleSearchDepartures}
                />
              </div>
              {/* These will only appear for the user when they search and get
              results */}
              <FlightTable />
              {searchResults === false && isLoading === false && (
                <NoSearchYet />
              )}
              {searchedArticles && cardsData.length > 0 && (
                <SearchArticles
                  isLoggedIn={isLoggedIn}
                  cardsData={cardsData}
                  handleSaveArticle={handleSaveArticle}
                  handleDeleteArticle={handleDeleteArticle}
                  savedNewsArticles={savedNewsArticles}
                />
              )}
              {/* These will only appear when the API is searching or when there are
              no results */}
              {isLoading && articlesError === "" && <PreLoader />}
              {cardsData.length === 0 && searchResults === true && <NotFound />}
              {articlesError === "Error" && searchResults === false && (
                <ArticleError />
              )}
              <About />
              <Footer />
              {activeModal === "signIn" && (
                <SignInModal
                  handleSignUpModal={handleSignUpModal}
                  closeModal={closeModal}
                  handleLogin={handleLogin}
                />
              )}
              {activeModal === "signUp" && (
                <SignUpModal
                  handleSignInModal={handleSignInModal}
                  closeModal={closeModal}
                  handleSignup={handleSignup}
                />
              )}
              {activeModal === "profile" && (
                <ProfileModal
                  closeModal={closeModal}
                  updateProfile={updateProfile}
                />
              )}
              {activeModal === "logoutConfirm" && (
                <LogoutConfirmModal
                  closeModal={closeModal}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              )}
            </div>
          }
        />
        <Route
          path="/SavedArticles"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Navbar
                handleNavMenu={handleNavMenu}
                handleProfileModal={handleProfileModal}
              />
              {activeModal === "navMenu" && (
                <NavDropDown
                  isLoggedIn={isLoggedIn}
                  closeModal={closeModal}
                  handleProfileModal={handleProfileModal}
                />
              )}
              <SavedArticlesHeader savedNewsArticles={savedNewsArticles} />
              <SavedArticles
                savedNewsArticles={savedNewsArticles}
                handleDeleteArticle={handleDeleteArticle}
              />
              {activeModal === "profile" && (
                <ProfileModal
                  closeModal={closeModal}
                  updateProfile={updateProfile}
                />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
