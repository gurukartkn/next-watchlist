import Head from "next/head";

import CardItem from "../../components/CardItem";

const searchResults = ({ query, redirect, results }) => {
  return (
    <div>
      <Head>
        <title>Search Results | WatchList</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center mb-5 font-semibold md:text-xl md:font-bold lg:text-left px-5 md:px-10 lg:px-20 xl:px-36">
        Search results for `{query}`
      </h3>
      <div className="flex flex-wrap justify-center gap-5 text-center ">
        {results?.map((result) => (
          <CardItem key={result.id} data={result} redirect={redirect} />
        ))}
      </div>
    </div>
  );
};

export default searchResults;

export async function getServerSideProps(context) {
  const { state, query, redirect } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${state}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  const data = await res.json();
  const results = data.results;
  return {
    props: {
      results,
      redirect,
      query,
    },
  };
}
