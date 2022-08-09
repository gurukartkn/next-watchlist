import Head from "next/head";
import Link from "next/link";

import CardRow from "../../components/CardRow";

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
      <div>
        {/* <Latest section="movie" /> */}
        <CardRow
          section="movie"
          type="popular"
          title="Popular Movies"
          redirect="movie"
          genreRedirect="movies"
          id=""
        />
        <CardRow
          section="movie"
          type="top_rated"
          title="Top Rated Movies"
          redirect="movie"
          genreRedirect="movies"
          id=""
        />
        <CardRow
          section="movie"
          type="upcoming"
          title="Upcoming Movies"
          redirect="movie"
          genreRedirect="movies"
          id=""
        />
        {genres.map((genre) => (
          <CardRow
            section="movie"
            type="genre"
            title={genre.name + ` ` + `Movies`}
            redirect="movie"
            genreRedirect="movies"
            id={genre.id}
            key={genre.id}
          />
        ))}
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
