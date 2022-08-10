import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MdSearch } from "react-icons/md";

import ResultCard from "../../components/ResultCard";

const Search = () => {
  const router = useRouter();
  const [state, setState] = useState("movie");
  const [redirect, setRedirect] = useState("movie");
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("query", query);
    if (query != "") {
      fetch(
        `https://api.themoviedb.org/3/search/${state}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        });
    }
  }, [query, state]);

  useEffect(() => {
    if (state == "movie") {
      setRedirect("movie");
    } else {
      setRedirect("series");
    }
  }, [state]);

  const handleRedirect = () => {
    router.push(
      `/search/searchResults?query=${query}&state=${state}&redirect=${redirect}`
    );
  };

  return (
    <div className="flex flex-col text-center justify-center items-center">
      <Head>
        <title>WatchList | Search</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <button
          onClick={() => setState("movie")}
          className={`border-2 px-6 p-2 rounded-l-md ${
            state == "movie"
              ? "bg-slate-400 border-slate-400 text-white font-semibold"
              : "border-slate-400 text-slate-400"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setState("tv")}
          className={`border-2 px-6 p-2 rounded-r-md ${
            state == "tv"
              ? "bg-slate-400 border-slate-400 text-white font-semibold"
              : "border-slate-400 text-slate-400"
          }`}
        >
          TV Shows
        </button>
      </div>
      <div className="flex w-[75vw] md:gap-5 justify-between items-center">
        <input
          type="text"
          id="search"
          placeholder={`Search`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="my-5 py-2 px-5 border-slate-700 border-2 rounded-md w-[55vw] md:w-full"
        />
        <button
          className="py-2 px-5 rounded-md border-2 border-blue-500 disabled:border-gray-500 disabled:text-gray-500"
          disabled={query.length < 3}
          onClick={handleRedirect}
        >
          <MdSearch size={22} />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-[75vw] gap-5">
        {query != "" && results.length > 0 ? (
          results.map((result) => (
            <Link
              key={result.id}
              href={`/${redirect}/${encodeURIComponent(result?.id)}`}
            >
              <a>
                <ResultCard result={result} redirect={redirect} />
              </a>
            </Link>
          ))
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold h-[60vh]">
              No results found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
