import { Link } from "react-router-dom";

const Header = () => (
  <div className="bg-national-flag-blue border-b-12 border-mustard p-2 shadow-md z-10">
    <div className="container mx-auto">
      <img src="/tulsa-flag-sigil.png" className="w-20 absolute" alt="logo" />
        <Link to="/">
          <h1 className="text-bone ml-16 md:ml-22 font-bold md:text-xl text-xs">Tulsa Neighborhood Explorer</h1>
        </Link>
    </div>
  </div>
);

export default Header;
