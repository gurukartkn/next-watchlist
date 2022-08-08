import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Series = ({ series, similar }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>WatchList | {series.original_name}</title>
        <meta name="description" content={series.tagline} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-center">
        <div className="lg:w-1/2 xl:w-1/3">
          <Image
            src={`${BASE_URL}${series?.poster_path}`}
            alt={series?.original_name}
            width={1080}
            height={1920}
          />
        </div>
        <div className="lg:w-1/2">
          <p className="text-5xl font-bold text-center">
            {series?.original_name}
          </p>
          <p className="text-md font-light">{series?.overview}</p>
          <p className="text-lg font-medium">Status {series?.status}</p>
          <div className="flex gap-2">
            {series?.genres.map((genre) => (
              <Link
                href={`/series/${encodeURIComponent(genre.id)}`}
                key="genre.id"
              >
                <a className="bg-slate-400 p-1 px-2 rounded-full">
                  {genre.name}
                </a>
              </Link>
            ))}
          </div>
          <p>First Air Date: {series?.first_air_date}</p>
          <p>Last Air Date: {series?.last_air_date}</p>
          <p>Episode Runtime: {series?.episode_run_time} minutes</p>
          <p>Number of Episodes: {series?.number_of_episodes}</p>
          <p>Number of Seasons: {series?.number_of_seasons}</p>
          <div>
            Seasons
            <div className="flex gap-5 flex-wrap">
              {series?.seasons.map((season) => (
                <Link
                  href={`/series/seasons/${encodeURIComponent(season.id)}`}
                  key="season.id"
                >
                  <a className="flex flex-col w-[108px] justify-center items-center text-center">
                    {season.name}
                    <Image
                      src={`${BASE_URL}${season?.poster_path}`}
                      alt={series?.original_name}
                      width={108}
                      height={192}
                    />
                    Number of Episodes: {season?.episode_count}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 text-xl font-bold">Similar Web Series</p>
      <div className="flex py-5 gap-5 overflow-x-scroll scrollbar-hide">
        {similar?.results.map((series) => (
          <Link
            href={`/series/${encodeURIComponent(series.id)}`}
            key={series.id}
          >
            <a className="min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer hover:scale-105 ease-in-out">
              <Image
                src={`${BASE_URL}${series.poster_path}`}
                alt={series.original_name}
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

export default Series;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const sres = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const series = await res.json();
  const similar = await sres.json();
  return {
    props: {
      series,
      similar,
    },
  };
}
