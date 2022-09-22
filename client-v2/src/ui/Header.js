import { Link } from "react-router-dom";

const Header = () => (
  <div className="p-1 shadow-md">
    <div className="container mx-auto">
      <Link to="/">
        <img
          src="/images/tpo-logo.png"
          className="h-12 inline"
          alt="logo"
        />
        <h1 className="inline font-bold md:text-lg text-xs">Neighborhood Explorer</h1>
      </Link>
    </div>
  </div>
);

export default Header;
