import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import CardItem from "../../components/CardItem";

const Series = ({ series, similar }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>{series.name} | WatchList</title>
        <meta name="description" content={series.tagline} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col xl:flex-row xl:gap-10">
        <div className="hidden xl:block xl:w-1/3">
          <Image
            src={`${BASE_URL}${series?.poster_path}`}
            alt={series?.name}
            width={1080}
            height={1920}
          />
        </div>
        <div className="block xl:hidden">
          <Image
            src={`${BASE_URL}${series?.backdrop_path}`}
            alt={series?.original_name}
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>

        <div className="flex flex-col gap-3 xl:gap-5 xl:w-2/3">
          <p className="text-3xl font-bold text-center xl:text-left xl:text-4xl xl:font-extrabold">
            {series?.original_name}
          </p>
          <p className="text-md font-light xl:text-lg xl:font-normal">
            {series?.overview}
          </p>
          <div className="flex gap-2">
            {series?.genres.map((genre) => (
              <Link href={`/tv/${encodeURIComponent(genre.id)}`} key="genre.id">
                <a className="bg-slate-900 bg-opacity-60 backdrop-blur-lg shadow-lg p-1 px-2 rounded-md text-white">
                  {genre.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 xl:flex-row xl:gap-20">
            <div className="flex flex-col gap-3">
              <p>
                Status:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.status}
                </span>
              </p>
              <p>
                First Air Date:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.first_air_date}
                </span>
              </p>
              <p>
                Last Air Date:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.last_air_date}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p>
                Episode Runtime:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.episode_run_time}
                </span>{" "}
                minutes
              </p>
              <p>
                Number of Episodes:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.number_of_episodes}
                </span>
              </p>
              <p>
                Number of Seasons:{" "}
                <span className="font-medium xl:font-semibold">
                  {series?.number_of_seasons}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Seasons</h3>
            <div className="flex gap-5 flex-wrap">
              {series?.seasons.map((season) => (
                <Link
                  href={`/series/${encodeURIComponent(
                    series.id
                  )}/${encodeURIComponent(season.season_number)}`}
                  key={season.id}
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
          <CardItem key={series.id} data={series} redirect="series" />
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
