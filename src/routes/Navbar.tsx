import useTitle from "~/utils/hooks/useTitle";

export default function Navbar() {
  const { title, subtitle } = useTitle();
  return (
    <nav className="nav">
      <div className="logo-container">
        <a href="index.html">
          <img
            src="images/white.png"
            style={{ backgroundColor: "transparent" }}
            className="nav-logo-image"
            alt=""
          />
        </a>
      </div>
      <header>
        <h1>{title}</h1>
        <h2 className="nav-head">{subtitle}</h2>
      </header>
      <div className="nav-container">
        <div className="nav-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className="nav-menu" id="nav-menu">
          <li className="nav-items">
            <a href="index.html" className="nav-links active-page">
              <i className="fa fa-plane nav-icons"></i>שחק
            </a>
          </li>
          <li className="nav-items">
            <a href="add-question.html" className="nav-links">
              <i className="fa fa-plus nav-icons"></i>הוסף שאלה
            </a>
          </li>
          <li className="nav-items">
            <a href={"records.html"} className="nav-links">
              <i className="fa fa-line-chart nav-icons"></i>שיאים
            </a>
          </li>
          <li className="nav-items">
            <a href="about.html" className="nav-links">
              <i className="fa fa-beer nav-icons"></i>אודות
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
