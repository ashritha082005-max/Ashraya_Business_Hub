import {
  Search,
  ArrowLeft,
  X,
  SlidersHorizontal,
  MapPin,
  Store,
  Utensils,
  Scissors,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  Sparkles,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { businesses } from "../data/businesses";
import BusinessCard from "../components/BusinessCard";

function Businesses() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const categoryFromURL =
    searchParams.get("category") || "All";

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  /*
   * LOGGED-IN USER
   */
  const user = JSON.parse(
    localStorage.getItem("ashrayaUser") || "null"
  );

  /*
   * LOGOUT
   */
  const handleLogout = () => {
    localStorage.removeItem("ashrayaToken");
    localStorage.removeItem("ashrayaUser");

    navigate("/login");
  };

  /*
   * EXISTING BUSINESSES + MONGODB BUSINESSES
   */
  const [allBusinesses, setAllBusinesses] =
    useState(businesses);

  /*
   * LOAD BUSINESSES FROM MONGODB
   */
  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/businesses"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load businesses"
          );
        }

        /*
         * MongoDB uses _id.
         * Your existing BusinessCard uses id.
         * Convert _id → id without changing
         * the existing BusinessCard.
         */
        const mongoBusinesses =
          (data.businesses || []).map(
            (business) => ({
              ...business,
              id: business._id,
            })
          );

        /*
         * MongoDB businesses first,
         * existing ASHRAYA businesses after.
         */
        setAllBusinesses([
          ...mongoBusinesses,
          ...businesses,
        ]);
      } catch (error) {
        console.error(
          "LOAD BUSINESSES ERROR:",
          error
        );

        /*
         * Keep existing businesses visible
         * if backend is unavailable.
         */
        setAllBusinesses(businesses);
      }
    };

    loadBusinesses();
  }, []);

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Shops", icon: Store },
    { name: "Food", icon: Utensils },
    { name: "Salons", icon: Scissors },
    {
      name: "Education",
      icon: GraduationCap,
    },
    {
      name: "Services",
      icon: BriefcaseBusiness,
    },
    {
      name: "Healthcare",
      icon: HeartPulse,
    },
  ];

  const filteredBusinesses =
    allBusinesses.filter((business) => {
      const matchesCategory =
        categoryFromURL === "All" ||
        business.category?.toLowerCase() ===
          categoryFromURL.toLowerCase();

      const searchableText = `
        ${business.name || ""}
        ${business.category || ""}
        ${business.subcategory || ""}
        ${business.location || ""}
        ${business.description || ""}
        ${(business.services || []).join(" ")}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

  const changeCategory = (category) => {
    if (category === "All") {
      setSearchParams(
        search
          ? { search }
          : {}
      );
    } else {
      setSearchParams(
        search
          ? {
              category,
              search,
            }
          : {
              category,
            }
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  const handleSearch = (value) => {
    setSearch(value);

    const params = {};

    if (categoryFromURL !== "All") {
      params.category =
        categoryFromURL;
    }

    if (value.trim()) {
      params.search = value;
    }

    setSearchParams(params);
  };

  return (
    <div className="businesses-page">

      <section className="businesses-hero">

        <div className="businesses-hero-glow glow-left"></div>
        <div className="businesses-hero-glow glow-right"></div>

        <div className="businesses-container">

          <button
            className="business-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>

          <div className="businesses-heading">

            <div className="businesses-title-area">

              <div className="businesses-eyebrow">
                <span></span>
                EXPLORE LOCAL
              </div>

              <h1>
                Discover Local
                <br />
                <em>Businesses.</em>
              </h1>

              <p>
                Find trusted businesses and services
                around you.
              </p>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >

              <div className="directory-badge">

                <div className="directory-badge-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <strong>
                    Local Directory
                  </strong>

                  <span>
                    Discover & connect
                  </span>
                </div>

              </div>

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "10px 15px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.08)",
                    color: "inherit",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  <LogOut size={17} />
                  Logout
                </button>
              )}

            </div>

          </div>

          <div className="directory-search">

            <Search size={21} />

            <input
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              placeholder="Search businesses, services or locations..."
            />

            {search && (
              <button
                className="clear-search"
                onClick={() =>
                  handleSearch("")
                }
              >
                <X size={17} />
              </button>
            )}

          </div>

          <div className="filter-wrapper">

            <div className="filter-label">
              <SlidersHorizontal size={14} />
              Explore by category
            </div>

            <div className="category-filters">

              {categories.map(
                (category) => {

                  const Icon =
                    category.icon;

                  const active =
                    categoryFromURL ===
                    category.name;

                  return (
                    <button
                      key={category.name}
                      className={`category-filter ${
                        active
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        changeCategory(
                          category.name
                        )
                      }
                    >
                      <Icon size={15} />
                      {category.name}
                    </button>
                  );
                }
              )}

            </div>

          </div>

        </div>

      </section>

      <main className="business-results">

        <div className="businesses-container">

          <div className="results-topbar">

            <div>

              <span className="results-small-label">
                LOCAL DISCOVERY
              </span>

              <h2>
                {categoryFromURL ===
                "All"
                  ? "All Businesses"
                  : categoryFromURL}
              </h2>

            </div>

            <div className="results-count">

              <strong>
                {filteredBusinesses.length}
              </strong>

              <span>
                {filteredBusinesses.length ===
                1
                  ? "business found"
                  : "businesses found"}
              </span>

            </div>

          </div>

          {(categoryFromURL !==
            "All" ||
            search) && (

            <div className="active-filters">

              <span>
                Active filters:
              </span>

              {categoryFromURL !==
                "All" && (

                <button
                  onClick={() => {

                    const params = {};

                    if (search) {
                      params.search =
                        search;
                    }

                    setSearchParams(
                      params
                    );
                  }}
                >
                  {categoryFromURL}
                  <X size={13} />
                </button>

              )}

              {search && (

                <button
                  onClick={() =>
                    handleSearch("")
                  }
                >
                  "{search}"
                  <X size={13} />
                </button>

              )}

              <button
                className="clear-all"
                onClick={
                  clearFilters
                }
              >
                Clear all
              </button>

            </div>

          )}

          {filteredBusinesses.length >
          0 ? (

            <div className="business-directory-grid">

              {filteredBusinesses.map(
                (business) => (

                  <BusinessCard
                    key={business.id}
                    business={business}
                  />

                )
              )}

            </div>

          ) : (

            <div className="directory-empty">

              <div className="empty-icon">
                <Search size={28} />
              </div>

              <span>
                NOTHING FOUND
              </span>

              <h2>
                No businesses found
              </h2>

              <p>
                We couldn't find a business matching
                your current search or category.
              </p>

              <button
                onClick={
                  clearFilters
                }
              >
                View All Businesses
              </button>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Businesses;