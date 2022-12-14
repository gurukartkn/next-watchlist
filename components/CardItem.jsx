import Link from "next/link";
import Image from "next/image";

const CardItem = ({ redirect, data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="bg-slate-600 bg-opacity-40 backdrop-blur-lg inline-block shadow-lg min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer hover:scale-105">
      <Link href={`/${redirect}/${encodeURIComponent(data?.id)}`}>
        <a className="relative group">
          <Image
            src={`${BASE_URL}${data?.poster_path}`}
            alt={data?.title}
            width={1080}
            height={1920}
            layout="responsive"
          />
          <div className="hidden lg:group-hover:block absolute bottom-0 p-3 text-white bg-black bg-opacity-20 backdrop-blur-lg rounded-t-sm xl:w-[250px]">
            <h1 className="font-bold text-lg">{data?.title}</h1>
            <h1 className="font-bold text-lg">{data?.name}</h1>
            <div className="flex gap-2">
              <p>
                <span className="font-bold rounded-full p-1 border-2 border-slate-200">
                  {data?.vote_average}
                </span>{" "}
                based on{" "}
              </p>
              <p>
                <span className="font-medium">{data?.vote_count}</span> reviews
              </p>
            </div>
            <p>
              {data?.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CardItem;
