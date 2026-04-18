import "./Header.css";

// const regions = ["Europe", "Americas", "Asia", "Africa", "Oceania"];

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-mark">WikiPaises</div>

        {/* <nav className="top-nav" aria-label="Regions">
          {regions.map((region, index) => (
            <button
              key={region}
              type="button"
              className={index === 0 ? "top-link active" : "top-link"}
            >
              {region}
            </button>
          ))}
        </nav> */}

        <div className="top-tools" aria-hidden="true">
          <span className="tool globe" />
          <span className="tool profile" />
        </div>
      </div>
    </header>
  );
}

export default Header;
