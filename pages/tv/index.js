import Head from "next/head";
import Link from "next/link";

import CardRow from "../../components/CardRow";

const Series = ({ genres }) => {
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36 ">
      <Head>
        <title>WatchList | TV Shows</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Latest section="tv" /> */}

      {genres.map((genre) => (
        <CardRow
          section="tv"
          type="genre"
          title={genre.name}
          redirect="series"
          genreRedirect="tv"
          id={genre.id}
          key={genre.id}
        />
      ))}
    </div>
  );
};

export default Series;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  const genres = data.genres;
  return {
    props: { genres },
  };
}
