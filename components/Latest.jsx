import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Latest = ({ section }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${section}/latest?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      );
      const json = await res.json();
      console.log(json);
      setData(json);
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="h-screen">
      <h1 className="capitalize text-xl font-bold">Trending {section}</h1>
      <Link href={`/${section}/${encodeURIComponent(data?.id)}`}>
        <Image
          src={`${BASE_URL}${data?.backdrop_path} `}
          alt={data?.title}
          height={1080}
          width={1920}
          layout="responsive"
        />
      </Link>

      <p>{data?.title}</p>
    </div>
  );
};

export default Latest;
