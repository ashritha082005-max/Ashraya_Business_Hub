import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  CheckCircle,
  Globe,
  Sparkles,
  ShieldCheck,
  Navigation,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { businesses } from "../data/businesses";

function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allBusinesses, setAllBusinesses] =
    useState(businesses);

  const [loading, setLoading] = useState(true);

  /*
   * Load existing businesses + businesses
   * stored in MongoDB Atlas
   */
  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/businesses`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load businesses"
          );
        }

        /*
         * Convert MongoDB _id into id
         * so the existing UI continues
         * working without any design changes.
         */
        const mongoBusinesses =
          (data.businesses || []).map(
            (business) => ({
              ...business,
              id: business._id,
            })
          );

        setAllBusinesses([
          ...businesses,
          ...mongoBusinesses,
        ]);
      } catch (error) {
        console.error(
          "LOAD BUSINESS DETAILS ERROR:",
          error
        );

        /*
         * If backend is unavailable,
         * existing businesses.js data
         * will still work.
         */
        setAllBusinesses(businesses);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  if (loading) {
    return (
      <div className="business-not-found">
        <span>ASHRAYA DIRECTORY</span>

        <h1>Loading business...</h1>

        <p>
          Please wait while we load the business details.
        </p>
      </div>
    );
  }

  /*
   * Find business from:
   * 1. Existing businesses.js
   * 2. MongoDB businesses
   */
  const business = allBusinesses.find(
    (item) => String(item.id) === String(id)
  );

  if (!business) {
    return (
      <div className="business-not-found">
        <div className="not-found-icon">
          <SearchIcon />
        </div>

        <span>ASHRAYA DIRECTORY</span>

        <h1>Business not found</h1>

        <p>
          The business you're looking for could not
          be found in our directory.
        </p>

        <button
          onClick={() =>
            navigate("/businesses")
          }
        >
          Explore Businesses
        </button>
      </div>
    );
  }

  const whatsappLink = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
        `Hello ${business.name}, I found your business on ASHRAYA. I would like to know more about your products/services.`
      )}`
    : null;

  return (
    <div className="business-details-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="details-hero">

        <div className="details-orb details-orb-one"></div>
        <div className="details-orb details-orb-two"></div>

        <div className="details-container">

          <button
            className="details-back"
            onClick={() =>
              navigate("/businesses")
            }
          >
            <ArrowLeft size={17} />
            Back to Businesses
          </button>

          <div className="details-hero-content">

            {/* Business Visual */}

            <div className="details-business-visual">

              <div className="details-ring ring-a"></div>
              <div className="details-ring ring-b"></div>

              <div className="details-business-icon">
                {business.emoji || "🏪"}
              </div>

              <div className="verified-badge">
                <ShieldCheck size={13} />
                Listed on ASHRAYA
              </div>

            </div>

            {/* Main Information */}

            <div className="details-main-info">

              <div className="details-category">

                <Sparkles size={13} />

                {business.category}

                {business.subcategory && (
                  <>
                    <span>/</span>
                    {business.subcategory}
                  </>
                )}

              </div>

              <h1>
                {business.name}
              </h1>

              <div className="details-meta">

                <div className="details-location">

                  <MapPin size={16} />

                  <span>
                    {business.location}
                  </span>

                </div>

                <div className="details-rating">

                  <span className="big-rating-star">

                    <Star
                      size={13}
                      fill="currentColor"
                    />

                  </span>

                  <strong>
                    {business.rating || "New"}
                  </strong>

                  {business.reviews > 0 && (
                    <span>
                      {business.reviews.toLocaleString()} reviews
                    </span>
                  )}

                </div>

              </div>

              <p className="details-description">
                {business.description}
              </p>

              {/* ACTION BUTTONS */}

              <div className="details-actions">

                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="details-call-button"
                  >
                    <Phone size={17} />
                    Call Business
                  </a>
                )}

                {business.whatsapp && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="details-whatsapp-button"
                  >
                    <MessageCircle size={17} />
                    WhatsApp
                  </a>
                )}

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="details-website-button"
                  >
                    <Globe size={17} />
                    Website
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="details-content">

        <div className="details-container">

          <div className="details-layout">

            {/* LEFT */}

            <div className="details-left">

              {/* SERVICES */}

              {business.services &&
                business.services.length > 0 && (

                  <section className="details-section">

                    <div className="details-section-heading">

                      <div>

                        <span>
                          WHAT THEY OFFER
                        </span>

                        <h2>
                          Services
                        </h2>

                      </div>

                      <div className="section-heading-icon">
                        <CheckCircle size={18} />
                      </div>

                    </div>

                    <div className="details-services">

                      {business.services.map(
                        (service, index) => (

                          <div
                            className="details-service-card"
                            key={service}
                          >

                            <div className="service-number">
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </div>

                            <div className="service-check">
                              <CheckCircle size={17} />
                            </div>

                            <span>
                              {service}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </section>

                )}

              {/* ABOUT */}

              <section className="details-about">

                <span>
                  ABOUT THIS BUSINESS
                </span>

                <h2>
                  Discover {business.name}
                </h2>

                <p>
                  {business.description}
                </p>

                <p>
                  Explore the services offered by this
                  business and connect with them directly
                  through ASHRAYA.
                </p>

              </section>

            </div>

            {/* SIDEBAR */}

            <aside className="details-sidebar">

              {/* CONNECT CARD */}

              <div className="connect-card">

                <div className="connect-icon">
                  <Navigation size={19} />
                </div>

                <span>
                  READY TO CONNECT?
                </span>

                <h3>
                  Get in touch
                </h3>

                <p>
                  Contact this business directly and
                  discover what they can offer you.
                </p>

                <div className="connect-divider"></div>

                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="sidebar-action"
                  >

                    <Phone size={16} />

                    <div>

                      <strong>
                        Call Business
                      </strong>

                      <span>
                        Speak directly
                      </span>

                    </div>

                  </a>
                )}

                {business.whatsapp && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="sidebar-action"
                  >

                    <MessageCircle size={16} />

                    <div>

                      <strong>
                        WhatsApp
                      </strong>

                      <span>
                        Send an enquiry
                      </span>

                    </div>

                  </a>
                )}

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="sidebar-action"
                  >

                    <Globe size={16} />

                    <div>

                      <strong>
                        Visit Website
                      </strong>

                      <span>
                        Explore online
                      </span>

                    </div>

                  </a>
                )}

              </div>

              {/* LOCATION */}

              <div className="location-card">

                <div className="location-card-icon">
                  <MapPin size={18} />
                </div>

                <div>

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {business.location}
                  </strong>

                </div>

              </div>

              {/* RATING */}

              <div className="rating-card">

                <div className="rating-card-top">

                  <div>

                    <span>
                      CUSTOMER RATING
                    </span>

                    <strong>
                      {business.rating || "New"}
                    </strong>

                  </div>

                  <div className="rating-large-star">

                    <Star
                      size={22}
                      fill="currentColor"
                    />

                  </div>

                </div>

                {business.reviews > 0 && (
                  <p>
                    Based on{" "}
                    <strong>
                      {business.reviews.toLocaleString()}
                    </strong>{" "}
                    customer reviews
                  </p>
                )}

                {(!business.reviews ||
                  business.reviews === 0) && (
                  <p>
                    This is a newly listed business.
                  </p>
                )}

              </div>

            </aside>

          </div>

        </div>

      </main>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="details-bottom-cta">

        <div className="details-container">

          <div>

            <span>
              DISCOVER MORE
            </span>

            <h2>
              Find more local businesses.
            </h2>

          </div>

          <button
            onClick={() =>
              navigate("/businesses")
            }
          >
            Explore Directory

            <ArrowLeft
              size={16}
              className="cta-arrow"
            />

          </button>

        </div>

      </section>

    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path d="m20 20-4-4" />
    </svg>
  );
}

export default BusinessDetails;