import Head from "next/head";
import Link from "next/link";

import CardItem from "../../components/CardItem";
import Pagination from "../../components/Pagination";

const Movie = ({ movies, genres, id, page }) => {
  return (
    <div>
      <Head>
        <title>WatchList | Movies | {id}</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-3 md:gap-10 lg:gap-20 px-5 md:px-10 lg:px-20 xl:px-36 overflow-x-scroll scrollbar-hide">
        {genres.map((genre) => (
          <Link href={`/movies/${encodeURIComponent(genre.id)}`} key={genre.id}>
            <a
              className={`cursor-pointer text-black ${
                genre.id == id && "font-bold"
              }`}
            >
              {genre.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-5 text-center ">
        {movies.map((movie) => (
          <CardItem key={movie.id} data={movie} redirect="movie" />
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
