import Head from "next/head";
import Image from "next/image";

const Episode = ({ data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>WatchList | {data.name}</title>
        <meta name="description" content={data?.overview} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row md:gap-10 items-center lg:h-[100vh] lg:items-start">
        <div className="lg:hidden">
          {data.still_path && (
            <Image
              src={`${BASE_URL}${data?.still_path}`}
              alt={data?.name}
              height={1080}
              width={1920}
            />
          )}
        </div>
        <div className="hidden lg:block lg:opacity-90">
          {data.still_path && (
            <Image
              src={`${BASE_URL}${data?.still_path}`}
              alt={data?.name}
              layout="fill"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 xl:gap-5 lg:absolute lg:w-1/3 lg:bg-white lg:text-slate-900 lg:bg-opacity-40 lg:backdrop-blur-lg  lg:p-10 lg:rounded-lg lg:shadow-xl">
          <p className="text-3xl font-bold text-center xl:text-left xl:text-4xl xl:font-extrabold">
            {data.name}
          </p>
          <p className="text-md font-light xl:text-lg xl:font-normal">
            {data.overview}
          </p>
          <p className="text-md">
            Air Data:{" "}
            <span className="font-medium xl:font-semibold">
              {data.air_date}
            </span>
          </p>
          <p>
            Runtime:{" "}
            <span className="font-medium xl:font-semibold">{data.runtime}</span>{" "}
            minutes
          </p>
          <p>
            Episode Number:{" "}
            <span className="font-medium xl:font-semibold">
              {data.episode_number}
            </span>
          </p>
          <p>
            Season Number:{" "}
            <span className="font-medium xl:font-semibold">
              {data.season_number}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Episode;

export async function getServerSideProps(context) {
  const { id, season, episode } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
