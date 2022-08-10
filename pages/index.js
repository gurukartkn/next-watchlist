import Head from "next/head";

import CardRow from "../components/CardRow";

export default function Home() {
  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Head>
        <title>WatchList</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Latest section="movie" /> */}
      {/* <Latest section="tv" /> */}
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
    </div>
  );
}
