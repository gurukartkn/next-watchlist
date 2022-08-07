import { useRouter } from "next/router";

import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { RiNumber1 } from "react-icons/ri";

const Pagination = ({ section, id, page }) => {
  const router = useRouter();
  return (
    <div className="p-5 md:p-10 lg:px-20 xl:px-36 flex justify-between w-100">
      <button
        className="flex items-center justify-center enabled:hover:font-bold disabled:text-gray-500 "
        onClick={() => router.push(`/${section}/${id}`)}
        {...(page == 1 ? { disabled: true } : {})}
      >
        <RiNumber1 />
        st Page
      </button>
      <button
        className="flex items-center justify-center gap-2 enabled:hover:font-bold disabled:text-gray-500 "
        onClick={() =>
          router.push(`/${section}/${id}/?page=${parseInt(page) - 1}`)
        }
        {...(page <= 1 ? { disabled: true } : {})}
      >
        PREVIOUS <BsArrowLeftSquareFill className="text-3xl" />
      </button>
      <button
        className="flex cursor-pointer gap-2 items-center justify-center hover:font-bold"
        onClick={() =>
          router.push(`/${section}/${id}/?page=${parseInt(page) + 1}`)
        }
      >
        NEXT <BsArrowRightSquareFill className="text-3xl" />
      </button>
    </div>
  );
};

export default Pagination;
