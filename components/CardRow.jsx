import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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
          <Link href={`/${redirect}/${encodeURIComponent(d.id)}`} key={d.id}>
            <a className="min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer hover:scale-105 ease-in-out">
              <Image
                src={`${BASE_URL}${d.poster_path}`}
                alt={d.title}
                width={1080}
                height={1920}
                layout="responsive"
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardRow;
