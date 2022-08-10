import Image from "next/image";

const ResultCard = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="w-[75vw] p-5 border-2 border-black rounded-md flex flex-col text-center md:flex-row md:gap-5 md:text-left">
      <div>
        <Image
          src={`${BASE_URL}${result?.poster_path}`}
          alt={result.title}
          width={108}
          height={192}
          layout="fixed"
        />
      </div>
      <div>
        <a className="text-lg md:text-2xl font-bold">{result?.title}</a>
        <a className="text-lg md:text-2xl font-bold">{result?.name}</a>
        <p className="text-sm md:text-base line-clamp-3">{result?.overview}</p>
      </div>
    </div>
  );
};

export default ResultCard;
