import Head from "next/head";
import Link from "next/link";

import CardRow from "../../components/CardRow";
import Latest from "../../components/Latest";

const Movies = ({ genres }) => {
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36 ">
      <Head>
        <title>WatchList | Movies</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-3 md:gap-10 lg:gap-20 overflow-x-scroll scrollbar-hide">
        {genres.map((genre) => (
          <Link
            className="text-gray-700"
            href={`/movies/${encodeURIComponent(genre.id)}`}
            key={genre.id}
          >
            {genre.name}
          </Link>
        ))}
      </div>
      <div>
        {/* <Latest section="movie" /> */}
        <CardRow
          section="movie"
          type="now_playing"
          title="Now Playing Movies"
          redirect="movie"
        />
        <CardRow
          section="movie"
          type="popular"
          title="Popular Movies"
          redirect="movie"
        />
        <CardRow
          section="movie"
          type="top_rated"
          title="Top RatedMovies"
          redirect="movie"
        />
        <CardRow
          section="movie"
          type="upcoming"
          title="Upcoming Movies"
          redirect="movie"
        />
      </div>
    </div>
  );
};

export default Movies;

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  const genres = data.genres;
  return {
    props: { genres },
  };
}
