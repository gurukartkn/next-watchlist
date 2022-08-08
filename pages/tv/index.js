import Head from "next/head";
import Link from "next/link";

import CardRow from "../../components/CardRow";

const Series = ({ genres }) => {
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-36 ">
      <Head>
        <title>WatchList | Series</title>
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
            href={`/tv/${encodeURIComponent(genre.id)}`}
            key={genre.id}
          >
            {genre.name}
          </Link>
        ))}
      </div>
      {/* <Latest section="tv" /> */}
      <CardRow
        section="tv"
        type="airing_today"
        title="TV Shows Airing Today"
        redirect="series"
      />
      <CardRow
        section="tv"
        type="on_the_air"
        title="TV Shows on the Air"
        redirect="series"
      />
      <CardRow
        section="tv"
        type="top_rated"
        title="Top Rated TV Shows"
        redirect="series"
      />
      <CardRow
        section="tv"
        type="popular"
        title=" Popular TV Shows"
        redirect="series"
      />
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
