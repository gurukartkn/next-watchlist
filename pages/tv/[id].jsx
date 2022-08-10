import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import CardItem from "../../components/CardItem";
import Pagination from "../../components/Pagination";

const Series = ({ genres, tv, id, page }) => {
  return (
    <div>
      <Head>
        <title>TV Shows | {id} | WatchList</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-3 md:gap-10 lg:gap-20 px-5 md:px-10 lg:px-20 xl:px-36 overflow-x-scroll scrollbar-hide">
        {genres.map((genre) => (
          <Link href={`/tv/${encodeURIComponent(genre.id)}`} key={genre.id}>
            <p className={`cursor-pointer ${genre.id == id && "font-bold"}`}>
              {genre.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-5 text-center ">
        {tv.map((series) => (
          <CardItem key={series.id} data={series} redirect="series" />
        ))}
      </div>
      <Pagination section="tv" id={id} page={page} pages="100" />
    </div>
  );
};

export default Series;

export async function getServerSideProps(context) {
  let { id, page } = context.query;

  if (page === undefined) page = 1;

  const gres = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const gdata = await gres.json();
  const genres = gdata.genres;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${id}&page=${page}`
  );
  const data = await res.json();
  const tv = data.results;
  return {
    props: {
      tv,
      genres,
      id,
      page,
    },
  };
}
