import Image from "next/image";

const ResultCard = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="flex text-left items-center gap-2 w-[70vw] md:w-[50vw] p-2 border-b-2 border-b-slate-800">
      <div>
        <Image
          src={`${BASE_URL}${result?.backdrop_path}`}
          alt={result.title}
          height={54}
          width={96}
          layout="fixed"
        />
      </div>
      <div>
        <a className="text-lg md:text-2xl font-bold">{result?.title}</a>
        <a className="text-lg md:text-2xl font-bold">{result?.name}</a>
        {/* <p className="text-sm md:text-base line-clamp-3">{result?.overview}</p> */}
      </div>
    </div>
  );
};

export default ResultCard;
