import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    // <div className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 text-white">
    <div className="bg-slate-700 text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
