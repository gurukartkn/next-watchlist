import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const Seasons = ({ id, season, data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="flex flex-col md:flex-row md:justify-around">
      <Head>
        <title>WatchList | {data.name}</title>
        <meta name="description" content={data.overview} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full md:w-1/3 lg:w-1/5">
        <Image
          src={`${BASE_URL}${data?.poster_path}`}
          alt={data?.name}
          width={108}
          height={192}
          layout="responsive"
        />
      </div>
      <div className="w-full md:h-[75vh] overflow-y-scroll md:w-2/3">
        <h2 className="text-xl font-bold text-center">Episodes</h2>
        <div className="p-2 flex flex-wrap gap-3 items-center justify-center">
          {data?.episodes?.map((episode) => (
            <div
              className="p-3 flex flex-col gap-2 bg-slate-200 rounded-md w-[300px] md:w-full"
              key={episode?.episode_number}
            >
              <Link
                href={`/series/${encodeURIComponent(id)}/${encodeURIComponent(
                  season
                )}/${encodeURIComponent(episode?.episode_number)}`}
              >
                <a className="text-lg font-semibold hover:text-slate-900 hover:font-bold">
                  {episode?.name}
                </a>
              </Link>
              <p className="font-thin line-clamp-3">{episode?.overview}</p>
              <p>
                Release Data:{" "}
                <span className="font-medium">{episode?.air_date}</span>
              </p>
              {episode?.still_path && (
                <div>
                  <Image
                    src={`${BASE_URL}${episode?.still_path}`}
                    alt={episode?.name}
                    height={108}
                    width={192}
                    layout="responsive"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seasons;

export async function getServerSideProps(context) {
  const { id, season } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();

  return {
    props: {
      id,
      season,
      data,
    },
  };
}
