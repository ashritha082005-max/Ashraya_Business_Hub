import {
  ArrowRight,
  Search,
  MapPin,
  Phone,
  MessageCircle,
  Store,
  Utensils,
  Scissors,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const categories = [
    {
      name: "Shops",
      count: "120+",
      description: "Retail, fashion, electronics & more",
      icon: Store,
      color: "green",
    },
    {
      name: "Food",
      count: "85+",
      description: "Restaurants, cafes, bakeries & more",
      icon: Utensils,
      color: "orange",
    },
    {
      name: "Salons",
      count: "60+",
      description: "Beauty, hair & personal care",
      icon: Scissors,
      color: "pink",
    },
    {
      name: "Education",
      count: "45+",
      description: "Institutes, coaching & learning",
      icon: GraduationCap,
      color: "blue",
    },
    {
      name: "Services",
      count: "90+",
      description: "Professional & everyday services",
      icon: BriefcaseBusiness,
      color: "purple",
    },
    {
      name: "Healthcare",
      count: "35+",
      description: "Hospitals, clinics & pharmacies",
      icon: HeartPulse,
      color: "red",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/businesses?search=${encodeURIComponent(
          search.trim()
        )}`
      );
    } else {
      navigate("/businesses");
    }
  };

  const goToCategory = (category) => {
    navigate(
      `/businesses?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <div className="ashraya-home">

      {/* ================= NAVBAR ================= */}

      <header className="ashraya-navbar">

        <div className="navbar-inner">

          <button
            className="brand"
            onClick={() => navigate("/")}
          >
            <div className="brand-mark">A</div>

            <div className="brand-text">
              <strong>ASHRAYA</strong>
              <span>Digital Hub</span>
            </div>
          </button>

          <nav className="desktop-nav">

            <a href="#categories">
              Categories
            </a>

            <a href="#how">
              How It Works
            </a>

            {/* LOGIN - ADDED ONLY */}
            <button
              className="nav-login-button"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

            <button
              className="nav-business-button"
              onClick={() =>
                navigate("/add-business")
              }
            >
              List Your Business
              <ArrowRight size={15} />
            </button>

          </nav>

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

        {menuOpen && (
          <div className="mobile-nav">

            <a
              href="#categories"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Categories
            </a>

            <a
              href="#how"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              How It Works
            </a>

            {/* LOGIN - ADDED ONLY */}
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/add-business");
              }}
            >
              List Your Business
              <ArrowRight size={16} />
            </button>

          </div>
        )}

      </header>


      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-grid-pattern"></div>

        <div className="hero-orb orb-one"></div>
        <div className="hero-orb orb-two"></div>
        <div className="hero-orb orb-three"></div>

        <div className="hero-content">

          <div className="hero-left">

            <div className="hero-eyebrow animate-fade-up">
              <span className="eyebrow-dot"></span>
              YOUR LOCAL DIGITAL DIRECTORY
            </div>

            <h1 className="hero-title animate-fade-up delay-1">
              Discover.
              <br />
              <span>Connect.</span>
              <br />
              Grow.
            </h1>

            <p className="hero-description animate-fade-up delay-2">
              ASHRAYA helps you discover trusted local
              businesses, products and services — all in
              one place.
            </p>

            <form
              className="hero-search animate-fade-up delay-3"
              onSubmit={handleSearch}
            >
              <Search size={21} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search businesses, services..."
              />

              <button type="submit">
                Search
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="hero-actions animate-fade-up delay-4">

              <button
                className="primary-button"
                onClick={() =>
                  navigate("/businesses")
                }
              >
                Explore Businesses
                <ArrowRight size={18} />
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  navigate("/add-business")
                }
              >
                <Store size={17} />
                List Your Business
              </button>

            </div>

            <div className="hero-trust animate-fade-up delay-5">

              <div>
                <ShieldCheck size={16} />
                Trusted listings
              </div>

              <div>
                <MapPin size={16} />
                Local discovery
              </div>

              <div>
                <Zap size={16} />
                Connect instantly
              </div>

            </div>

          </div>


          {/* ================= HERO PHONE ================= */}

          <div className="hero-right">

            <div className="hero-visual">

              <div className="visual-ring ring-one"></div>
              <div className="visual-ring ring-two"></div>

              <div className="phone-shadow"></div>

              <div className="phone-frame">

                <div className="phone-notch"></div>

                <div className="phone-screen">

                  <div className="phone-topbar">

                    <div>
                      <small>
                        Good morning 👋
                      </small>

                      <strong>
                        Find what you need.
                      </strong>
                    </div>

                    <div className="phone-avatar">
                      A
                    </div>

                  </div>

                  <div className="phone-search">
                    <Search size={14} />
                    Search nearby...
                  </div>

                  <div className="nearby-label">
                    <MapPin size={12} />
                    Near you
                  </div>

                  <div className="mini-business-card">

                    <div className="mini-icon food">
                      🥐
                    </div>

                    <div>
                      <strong>
                        Local Bakery
                      </strong>
                      <span>
                        Food • 4.8 ★
                      </span>
                    </div>

                    <ChevronRight size={14} />

                  </div>

                  <div className="mini-business-card">

                    <div className="mini-icon salon">
                      ✂️
                    </div>

                    <div>
                      <strong>
                        Beauty Salon
                      </strong>
                      <span>
                        Salons • 4.6 ★
                      </span>
                    </div>

                    <ChevronRight size={14} />

                  </div>

                  <div className="mini-business-card">

                    <div className="mini-icon shop">
                      🛍️
                    </div>

                    <div>
                      <strong>
                        Local Store
                      </strong>
                      <span>
                        Shops • 4.7 ★
                      </span>
                    </div>

                    <ChevronRight size={14} />

                  </div>

                  <div className="phone-highlight">

                    <div>
                      <Sparkles size={13} />
                    </div>

                    <span>
                      Discover more nearby
                    </span>

                  </div>

                  <div className="phone-bottom-nav">
                    <span className="active">
                      ⌂
                    </span>
                    <span>⌕</span>
                    <span>♡</span>
                    <span>◉</span>
                  </div>

                </div>

              </div>


              <div className="floating-card floating-one">

                <div className="floating-icon green">
                  <MessageCircle size={17} />
                </div>

                <div>
                  <strong>
                    Connect directly
                  </strong>

                  <span>
                    Call or WhatsApp
                  </span>
                </div>

              </div>


              <div className="floating-card floating-two">

                <div className="floating-icon orange">
                  <MapPin size={17} />
                </div>

                <div>
                  <strong>
                    Find nearby
                  </strong>

                  <span>
                    Local businesses
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stats-container">

          <div className="stat">
            <strong>120+</strong>
            <span>Local categories</span>
          </div>

          <div className="stat">
            <strong>66</strong>
            <span>Listed businesses</span>
          </div>

          <div className="stat">
            <strong>6</strong>
            <span>Major categories</span>
          </div>

          <div className="stat">
            <strong>24/7</strong>
            <span>Digital discovery</span>
          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section
        className="categories-section"
        id="categories"
      >

        <div className="section-container">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                EXPLORE LOCAL
              </span>

              <h2>
                Everything local,
                <br />
                <span>in one place.</span>
              </h2>
            </div>

            <p>
              Find businesses and services across
              categories that matter to you.
            </p>

          </div>


          <div className="category-grid">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  className={`category-card ${category.color}`}
                  onClick={() =>
                    goToCategory(
                      category.name
                    )
                  }
                >

                  <div className="category-card-top">

                    <div className="category-icon">
                      <Icon size={23} />
                    </div>

                    <ArrowRight
                      size={19}
                      className="category-arrow"
                    />

                  </div>

                  <div className="category-info">

                    <h3>
                      {category.name}
                    </h3>

                    <strong>
                      {category.count} businesses
                    </strong>

                    <p>
                      {category.description}
                    </p>

                  </div>

                </button>
              );
            })}

          </div>

        </div>

      </section>


      {/* ================= HOW ================= */}

      <section
        className="how-section"
        id="how"
      >

        <div className="section-container">

          <div className="how-heading">

            <span className="section-eyebrow">
              HOW IT WORKS
            </span>

            <h2>
              Local discovery,
              <br />
              <span>made simple.</span>
            </h2>

            <p>
              Finding the right local business should
              never be complicated.
            </p>

          </div>


          <div className="steps-container">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                <Search size={23} />
              </div>

              <h3>
                Search
              </h3>

              <p>
                Search for businesses, products or
                services near you.
              </p>

            </div>

            <div className="step-connector"></div>

            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                <MapPin size={23} />
              </div>

              <h3>
                Discover
              </h3>

              <p>
                Explore business information, services,
                ratings and locations.
              </p>

            </div>

            <div className="step-connector"></div>

            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                <Phone size={23} />
              </div>

              <h3>
                Connect
              </h3>

              <p>
                Call or WhatsApp businesses directly
                and get what you need.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY ASHRAYA ================= */}

      <section className="why-section">

        <div className="section-container">

          <div className="why-grid">

            <div className="why-content">

              <span className="section-eyebrow">
                WHY ASHRAYA
              </span>

              <h2>
                Built for your
                <br />
                <span>local community.</span>
              </h2>

              <p>
                ASHRAYA brings local businesses and
                customers closer together through a
                simple digital experience.
              </p>

              <button
                className="text-button"
                onClick={() =>
                  navigate("/businesses")
                }
              >
                Explore the directory
                <ArrowRight size={17} />
              </button>

            </div>


            <div className="why-features">

              <div className="why-feature">

                <div className="why-feature-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <h3>
                    Local First
                  </h3>

                  <p>
                    Discover businesses and services
                    around your area.
                  </p>
                </div>

              </div>


              <div className="why-feature">

                <div className="why-feature-icon">
                  <Users size={21} />
                </div>

                <div>
                  <h3>
                    Direct Connection
                  </h3>

                  <p>
                    Connect directly with businesses
                    without unnecessary steps.
                  </p>
                </div>

              </div>


              <div className="why-feature">

                <div className="why-feature-icon">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3>
                    Simple & Trusted
                  </h3>

                  <p>
                    Clear business information helps
                    you make better choices.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BUSINESS OWNER ================= */}

      <section className="owner-section">

        <div className="owner-container">

          <div className="owner-circle circle-one"></div>
          <div className="owner-circle circle-two"></div>

          <div className="owner-content">

            <div className="owner-icon">
              <Store size={27} />
            </div>

            <span className="owner-eyebrow">
              FOR BUSINESS OWNERS
            </span>

            <h2>
              Your business
              <br />
              <span>deserves to be found.</span>
            </h2>

            <p>
              Create your ASHRAYA business profile
              and connect with more local customers.
            </p>

            <button
              className="owner-button"
              onClick={() =>
                navigate("/add-business")
              }
            >
              List Your Business
              <ArrowRight size={18} />
            </button>

          </div>


          <div className="owner-dashboard">

            <div className="dashboard-header">

              <div className="dashboard-logo">
                A
              </div>

              <div>
                <strong>
                  Your Business
                </strong>

                <span>
                  ASHRAYA Profile
                </span>
              </div>

              <div className="dashboard-active">
                ● Active
              </div>

            </div>


            <div className="dashboard-chart">

              <div className="chart-label">
                Profile activity
              </div>

              <div className="chart-bars">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>

            </div>


            <div className="dashboard-stats">

              <div>
                <span>
                  Views
                </span>

                <strong>
                  1,248
                </strong>
              </div>

              <div>
                <span>
                  Enquiries
                </span>

                <strong>
                  86
                </strong>
              </div>

              <div>
                <span>
                  Rating
                </span>

                <strong>
                  4.8 ★
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="ashraya-footer">

        <div className="footer-main">

          <div className="footer-brand">

            <button
              className="footer-logo"
              onClick={() =>
                navigate("/")
              }
            >
              <div className="brand-mark">
                A
              </div>

              <div className="brand-text">
                <strong>
                  ASHRAYA
                </strong>

                <span>
                  Digital Hub
                </span>
              </div>
            </button>

            <p>
              Helping local businesses
              <br />
              go digital.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              Explore
            </h4>

            <button
              onClick={() =>
                navigate("/businesses")
              }
            >
              Businesses
            </button>

            <a href="#categories">
              Categories
            </a>

            <a href="#how">
              How It Works
            </a>

          </div>


          <div className="footer-column">

            <h4>
              For Business
            </h4>

            <button
              onClick={() =>
                navigate("/add-business")
              }
            >
              List Your Business
            </button>

            <span>
              Grow Your Presence
            </span>

            <span>
              Connect With Customers
            </span>

          </div>


          <div className="footer-column">

            <h4>
              ASHRAYA
            </h4>

            <span>
              Local Discovery
            </span>

            <span>
              Digital Presence
            </span>

            <span>
              Community First
            </span>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 ASHRAYA Digital Hub
          </span>

          <span>
            Built for local businesses.
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;
