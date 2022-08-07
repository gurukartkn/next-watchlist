import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WatchList</title>
        <meta
          name="description"
          content="Never forget the movies and series that you wish to watch and maintain a record of previously watched ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-3xl font-bold font-mono">tailwind works</p>
    </div>
  );
}
