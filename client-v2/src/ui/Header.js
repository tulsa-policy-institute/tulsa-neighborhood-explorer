import { Link } from "react-router-dom";

const Header = () => (
  <div className="navbar bg-base-100 shadow-md z-10">
    <div className="flex-1">
      <Link to="/">
        <img
          src="/images/tpo-logo.png"
          className="h-12 inline"
          alt="logo"
        />
        <h1 className="font-headings inline font-bold md:text-lg text-xs">Neighborhood Explorer</h1>
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-0">
        <li><Link to="/">About</Link></li>
      </ul>
    </div>
  </div>
);

export default Header;
