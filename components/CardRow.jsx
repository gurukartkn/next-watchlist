import { useState, useEffect } from "react";
import Link from "next/link";

import CardItem from "./CardItem";

const CardRow = ({ section, type, title, redirect, genreRedirect, id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${section}/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US`
      );
      const json = await res.json();
      const array = json.results;
      setData(array);
    };
    const getGenreData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${section}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${id}&include_adult=false`
      );
      const json = await res.json();
      const array = json.results;
      setData(array);
    };
    if (id === "") {
      getData();
    } else {
      getGenreData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-wrap gap-5">
        <h1 className="uppercase text-xl font-bold">{title}</h1>
        {id && (
          <Link href={`/${genreRedirect}/${encodeURIComponent(id)}`}>
            <a className="font-mono bg-slate-900 bg-opacity-60 backdrop-blur-lg shadow-lg p-1 px-2 rounded-md">
              + View all
            </a>
          </Link>
        )}
      </div>
      <div className="relative flex gap-3 justify-center items-center">
        <div className="flex py-7 gap-5 overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth">
          {data?.map((d) => (
            <CardItem key={d.id} redirect={redirect} data={d} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardRow;
