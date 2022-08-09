import Link from "next/link";
import Image from "next/image";

const CardItem = ({ redirect, data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="shadow-lg min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer">
      <Link href={`/${redirect}/${encodeURIComponent(data?.id)}`}>
        <a className="relative group">
          <Image
            src={`${BASE_URL}${data?.poster_path}`}
            alt={data?.title}
            width={1080}
            height={1920}
            layout="responsive"
          />
          <div className="hidden lg:group-hover:block absolute bottom-0 p-3 text-black bg-white bg-opacity-20 backdrop-blur-lg rounded-t-sm max-w-[100px] md:max-w-[150px] xl:max-w-[250px]">
            <h1 className="font-bold text-lg">{data?.title}</h1>
            <h1 className="font-bold text-lg">{data?.name}</h1>
            <p className="line-clamp-6">{data?.overview}</p>
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
