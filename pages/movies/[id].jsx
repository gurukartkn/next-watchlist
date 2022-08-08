import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Pagination from "../../components/Pagination";

const Movie = ({ movies, genres, id, page }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36">
      <Head>
        <title>WatchList | Movies | {id}</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-3 md:gap-10 lg:gap-20 overflow-x-scroll scrollbar-hide">
        {genres.map((genre) => (
          <Link href={`/movies/${encodeURIComponent(genre.id)}`} key={genre.id}>
            <p
              className={`cursor-pointer ${
                genre.id == id ? "text-black font-bold" : "text-gray-700"
              }`}
            >
              {genre.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-5 text-center ">
        {movies.map((movie) => (
          <Link href={`/movie/${encodeURIComponent(movie.id)}`} key={movie.id}>
            <div className="w-56 bg-slate-100 shadow-lg cursor-pointer hover:scale-105 ease-in-out">
              <Image
                src={`${BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={1080}
                height={1920}
                layout="responsive"
              />
            </div>
          </Link>
        ))}
      </div>
      <Pagination section="movies" id={id} page={page} pages="500" />
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  let { id, page } = context.query;

  if (page === undefined) page = 1;

  const gres = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const gdata = await gres.json();
  const genres = gdata.genres;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${id}&page=${page}`
  );
  const data = await res.json();
  const movies = data.results;
  return {
    props: {
      movies,
      genres,
      id,
      page,
    },
  };
}
