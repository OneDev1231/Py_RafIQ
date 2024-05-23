import Header from "./Header";
import Footer from "./Footer";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-black font-Satoshi snap-y overflow-y-scroll max-h-screen snap-mandatory" id="landing">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
