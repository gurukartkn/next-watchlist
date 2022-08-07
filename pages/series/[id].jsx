import { useRouter } from "next/router";
import Head from "next/head";

const Series = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>WatchList | Series | {id}</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Series genre is {id}
    </div>
  );
};

export default Series;
