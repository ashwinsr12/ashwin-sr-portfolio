import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import profile from "../data/profile.json";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="brand" aria-label="Ashwin SR — home">
          <span className="brand__mark">AS</span>
          <span className="brand__name">Ashwin&nbsp;SR</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {onHome ? (
            <>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <Link to="/">← Back to portfolio</Link>
          )}
          <a className="btn btn--secondary nav-cta" href={profile.resumeFile} download>
            Résumé
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
