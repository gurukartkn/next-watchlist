import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import CardItem from "./CardItem";

const CardRow = ({ section, type, title, redirect }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
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
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <h1 className="capitalize text-xl font-bold">{title}</h1>

      <div className="flex py-7 gap-5 overflow-x-scroll scrollbar-hide">
        {data?.map((d) => (
          <CardItem key={d.id} redirect={redirect} data={d} />
        ))}
      </div>
    </div>
  );
};

export default CardRow;
