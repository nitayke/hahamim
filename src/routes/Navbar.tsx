import { Link } from "react-router-dom";
import useTitle from "~/hooks/useTitle";

export function Header() {
  const { title, subtitle } = useTitle();

  return (
    <header>
      <h1>{title}</h1>
      <h2 className="nav-head">{subtitle}</h2>
    </header>
  );
}

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo-container">
        <Link to="/">
          <img
            src="images/white.png"
            style={{ backgroundColor: "transparent" }}
            className="nav-logo-image"
            alt=""
          />
        </Link>
      </div>
      <Header />
      <div className="nav-container">
        <div className="nav-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className="nav-menu" id="nav-menu">
          <li className="nav-items">
            <Link to="/" className="nav-links active-page">
              <i className="fa fa-plane nav-icons"></i>
              שחק
            </Link>
          </li>
          <li className="nav-items">
            <Link to="/add-question" className="nav-links">
              <i className="fa fa-plus nav-icons"></i>
              הוסף שאלה
            </Link>
          </li>
          <li className="nav-items">
            <Link to="/records" className="nav-links">
              <i className="fa fa-line-chart nav-icons"></i>
              שיאים
            </Link>
          </li>
          <li className="nav-items">
            <Link to="/about" className="nav-links">
              <i className="fa fa-beer nav-icons"></i>
              אודות
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
