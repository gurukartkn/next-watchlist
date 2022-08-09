import Link from "next/link";
import Image from "next/image";

const CardItem = ({ redirect, data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="min-w-[100px] md:min-w-[150px] xl:min-w-[250px] left-0 cursor-pointer">
      <Link href={`/${redirect}/${encodeURIComponent(data?.id)}`}>
        <a>
          <Image
            src={`${BASE_URL}${data?.poster_path}`}
            alt={data?.title}
            width={1080}
            height={1920}
            layout="responsive"
          />
        </a>
      </Link>
    </div>
  );
};

export default CardItem;
