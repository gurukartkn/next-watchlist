import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ResultCard from "../../components/ResultCard";

const Search = () => {
  const router = useRouter();
  const [state, setState] = useState("movie");
  const [redirect, setRedirect] = useState("movie");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setQuery(localStorage.getItem("query"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("query", query);
    if (query != "") {
      fetch(
        `https://api.themoviedb.org/3/search/${state}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results.slice(0, 5));
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
    <div className="flex flex-col text-center items-center h-[81vh]">
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
          className={`border-2 px-6 p-2 rounded-l-md border-slate-900 ${
            state == "movie"
              ? "bg-slate-900  text-white font-semibold"
              : " text-slate-200"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setState("tv")}
          className={`border-2 px-6 p-2 rounded-r-md border-slate-900 ${
            state == "tv"
              ? "bg-slate-900  text-white font-semibold"
              : " text-slate-200"
          }`}
        >
          TV Shows
        </button>
      </div>

      <input
        type="text"
        id="search"
        placeholder={`Search`}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-5 py-2 px-5 text-slate-900 bg-slate-50 shadow-lg rounded-md w-[75vw] md:w-[55vw] mb-2"
      />

      {query != "" && (
        <div className="flex flex-col justify-center items-center w-[75vw] md:w-[55vw] gap-5 bg-slate-600 shadow-lg bg-opacity-60 backdrop-blur-lg rounded-md p-5">
          {results.length > 0 ? (
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
            <h1>No results found</h1>
          )}
          <button
            className="font-bold border-b-2"
            disabled={query.length < 3}
            onClick={handleRedirect}
          >
            More results
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
