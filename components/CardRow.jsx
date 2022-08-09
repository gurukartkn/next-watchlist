import { useState, useEffect } from "react";
import Link from "next/link";

import CardItem from "./CardItem";

const CardRow = ({ section, type, title, redirect, genreRedirect, id }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${section}/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      );
      const json = await res.json();
      const array = json.results;
      setData(array);
    };
    const getGenreData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${section}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${id}`
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
            <a className="font-mono bg-slate-200 p-1 px-2 rounded-md">
              + View all
            </a>
          </Link>
        )}
      </div>
      <div className="flex py-7 gap-5 overflow-x-scroll scrollbar-hide">
        {data?.map((d) => (
          <CardItem key={d.id} redirect={redirect} data={d} />
        ))}
      </div>
    </div>
  );
};

export default CardRow;
