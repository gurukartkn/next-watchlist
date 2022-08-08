import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Movie = ({ movie, recommended, similar }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>WatchList | {movie.title}</title>
        <meta name="description" content={movie.tagline} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row md:gap-10 items-center">
        <div className="md:w-1/2 xl:w-1/3">
          <Image
            src={`${BASE_URL}${movie?.poster_path}`}
            alt={movie?.title}
            width={1080}
            height={1920}
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-3xl font-bold text-center">{movie?.title}</p>
          <p className="text-xl font-medium text-center">{movie?.tagline}</p>
          <p className="text-md font-light">{movie?.overview}</p>
          <p className="text-lg font-medium">Status {movie?.status}</p>
          <p className="text-md">Release Date {movie?.release_date}</p>
          <div className="flex gap-2">
            {movie?.genres.map((genre) => (
              <Link
                href={`/movies/${encodeURIComponent(genre.id)}`}
                key="genre.id"
              >
                <a className="bg-slate-400 p-1 px-2 rounded-full">
                  {genre.name}
                </a>
              </Link>
            ))}
          </div>
          <p>{movie?.runtime} minutes</p>
        </div>
      </div>

      <p className="mt-10 text-xl font-bold">Similar Movies</p>
      <div className="flex py-5 gap-5 overflow-x-scroll scrollbar-hide">
        {similar?.results.map((movies) => (
          <Link
            href={`/movies/${encodeURIComponent(movies.id)}`}
            key={movies.id}
          >
            <a className="min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer hover:scale-105 ease-in-out">
              <Image
                src={`${BASE_URL}${movies.poster_path}`}
                alt={movies.title}
                width={1080}
                height={1920}
                layout="responsive"
              />
            </a>
          </Link>
        ))}
      </div>
      <p className="mt-10 text-xl font-bold">Recommended Movies</p>
      <div className="flex py-5 gap-5 overflow-x-scroll scrollbar-hide">
        {recommended?.results.map((movies) => (
          <Link
            href={`/movies/${encodeURIComponent(movies.id)}`}
            key={movies.id}
          >
            <a className="min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer hover:scale-105 ease-in-out">
              <Image
                src={`${BASE_URL}${movies.poster_path}`}
                alt={movies.title}
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
