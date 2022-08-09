import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import CardItem from "../../components/CardItem";

const Movie = ({ movie, recommended, similar }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>WatchList | {movie.title}</title>
        <meta name="description" content={movie.tagline} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row md:gap-10 items-center lg:h-[100vh] lg:items-start">
        <div className="md:w-1/2 lg:hidden">
          <Image
            src={`${BASE_URL}${movie?.poster_path}`}
            alt={movie?.title}
            width={1080}
            height={1920}
          />
        </div>
        <div className="hidden lg:block lg:opacity-90">
          <Image
            src={`${BASE_URL}${movie?.backdrop_path}`}
            alt={movie?.title}
            layout="fill"
          />
        </div>
        <div className="flex flex-col gap-3 xl:gap-5 md:w-1/2 lg:absolute lg:w-1/3 lg:bg-white lg:bg-opacity-40 lg:backdrop-blur-lg  lg:p-10 lg:rounded-lg lg:shadow-xl">
          <p className="text-3xl font-bold text-center xl:text-left xl:text-4xl xl:font-extrabold">
            {movie?.title}
          </p>
          <p className="text-xl font-medium text-center xl:text-left xl:text-2xl ">
            {movie?.tagline}
          </p>
          <p className="text-md font-light xl:text-lg xl:font-normal">
            {movie?.overview}
          </p>
          <p className="text-lg">
            Status:{" "}
            <span className="font-medium xl:font-semibold">
              {movie?.status}
            </span>
          </p>
          <p className="text-md">
            Release Date:{" "}
            <span className="font-medium xl:font-semibold">
              {movie?.release_date}
            </span>
          </p>
          <div className="flex gap-2">
            {movie?.genres.map((genre) => (
              <Link
                href={`/movies/${encodeURIComponent(genre.id)}`}
                key="genre.id"
              >
                <a className="bg-slate-400 lg:bg-white p-1 px-2 rounded-full">
                  {genre.name}
                </a>
              </Link>
            ))}
          </div>
          <p>
            Movie Runtime:{" "}
            <span className="font-medium xl:font-semibold">
              {movie?.runtime}
            </span>{" "}
            minutes
          </p>
        </div>
      </div>

      <p className="mt-10 text-xl font-bold">Similar Movies</p>
      <div className="flex py-5 gap-5 overflow-x-scroll scrollbar-hide">
        {similar?.results.map((movies) => (
          <CardItem key={movies.id} data={movies} redirect="movie" />
        ))}
      </div>
      <p className="mt-10 text-xl font-bold">Recommended Movies</p>
      <div className="flex py-5 gap-5 overflow-x-scroll scrollbar-hide">
        {recommended?.results.map((movies) => (
          <CardItem key={movies.id} data={movies} redirect="movie" />
        ))}
      </div>
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const rres = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const sres = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const movie = await res.json();
  const recommended = await rres.json();
  const similar = await sres.json();
  return {
    props: {
      movie,
      recommended,
      similar,
    },
  };
}
