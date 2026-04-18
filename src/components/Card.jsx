import "./Card.css";
import { useEffect, useState } from "react";
import { getAllCountries } from "../services/countries.service";

const REGIONS = ["all", "Europe", "Americas", "Asia", "Africa", "Oceania"];
const PER_PAGE = 8;

const regionClassMap = {
  Europe: "europe",
  Americas: "americas",
  Asia: "asia",
  Africa: "africa",
  Oceania: "oceania",
};

function formatPopulation(value) {
  return `${new Intl.NumberFormat("en-US").format(value)} residents`;
}

function normalizeCountries(items) {
  return items
    .filter((country) => country.name?.common && country.flags?.svg)
    .map((country) => ({
      cca3: country.cca3,
      name: country.name.common,
      capital: country.capital?.[0] || "No capital listed",
      region: country.region || "Other",
      population: country.population || 0,
      flag: country.flags.svg,
      alt: country.flags.alt || `Flag of ${country.name.common}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function CountryItem({ country }) {
  const badgeClass = regionClassMap[country.region] || "other";

  return (
    <article className="country-card">
      <img className="country-flag" src={country.flag} alt={country.alt} />

      <div className="country-body">
        <div className="country-heading">
          <h2>{country.name}</h2>
          <span className={`country-badge ${badgeClass}`}>{country.region}</span>
        </div>

        <p className="country-capital">{country.capital}</p>
        <p className="country-population">{formatPopulation(country.population)}</p>
      </div>
    </article>
  );
}

function Card() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setCountries(normalizeCountries(data));
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    loadCountries();
  }, []);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleRegionChange(event) {
    setSelectedRegion(event.target.value);
    setPage(1);
  }

  const query = search.trim().toLowerCase();
  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;

    const matchesSearch =
      query.length === 0 ||
      country.name.toLowerCase().includes(query) ||
      country.capital.toLowerCase().includes(query);

    return matchesRegion && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const visibleCountries = filteredCountries.slice(start, start + PER_PAGE);

  return (
    <section className="card-section">
      <section className="hero-block">
        <h1>Explore the Atlas</h1>
        <p className="hero-copy">
          A curated digital archive of sovereign nations and cultures.
        </p>
      </section>

      <div className="card-toolbar">
        <label className="search-wrap">
          <span className="search-icon" aria-hidden="true" />
          <input
            className="card-search"
            type="text"
            placeholder="Search by nation, capital, or history..."
            value={search}
            onChange={handleSearchChange}
          />
        </label>

        <label className="filter-wrap">
          <span className="filter-icon" aria-hidden="true" />
          <select
            className="card-filter"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region === "all" ? "All Continents" : region}
              </option>
            ))}
          </select>
          <span className="filter-caret" aria-hidden="true" />
        </label>
      </div>

      <div className="cards-grid">
        {status === "loading" && (
          <p className="state-message">Carregando paises...</p>
        )}

        {status === "error" && (
          <p className="state-message">Nao foi possivel carregar os paises.</p>
        )}

        {status === "ready" &&
          visibleCountries.map((country) => (
            <CountryItem key={country.cca3} country={country} />
          ))}

        {status === "ready" && visibleCountries.length === 0 && (
          <p className="state-message">Nenhum pais encontrado.</p>
        )}
      </div>

      <div className="card-pager">
        <button
          className="pager-button"
          type="button"
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="pager-status">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="pager-button"
          type="button"
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <footer className="catalog-footer">
        <div className="footer-brand">
          <strong>WikiPaises</strong>
          <p>Digital curation. All rights reserved.</p>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <a href="/">About the atlas</a>
          <a href="/">Methodology</a>
          <a href="/">Data sources</a>
          <a href="/">Privacy policy</a>
        </nav>
      </footer>
    </section>
  );
}

export default Card;
