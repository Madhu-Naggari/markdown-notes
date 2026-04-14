import { MoonIcon, SunIcon } from "../common/Icons";

function AppHeader({ description, onThemeToggle, theme, title, actions }) {
  return (
    <header className="topbar shadow-sm">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="topbar-actions">
        <button
          className="theme-button hover-shadow-md"
          onClick={onThemeToggle}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
        {actions}
      </div>
    </header>
  );
}

export default AppHeader;
