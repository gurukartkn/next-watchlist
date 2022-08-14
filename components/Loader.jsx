import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[83vh] flex items-center justify-center">
      <TailSpin color="white" height={80} width={80} />
    </div>
  );
};

export default Loader;
