import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function BusinessCard({
  business,
  index = 0,
}) {
  const navigate = useNavigate();

  return (
    <article
      className="directory-business-card"
      style={{
        "--card-delay": `${Math.min(
          index * 0.04,
          0.35
        )}s`,
      }}
    >

      {/* ================= VISUAL ================= */}

      <div className="directory-card-image">

        <div className="card-orbit"></div>

        <div className="directory-card-emoji">
          {business.emoji}
        </div>

        <div className="directory-card-category">
          {business.category}
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="directory-card-content">

        <span className="directory-subcategory">
          {business.subcategory ||
            business.category}
        </span>

        <h3>
          {business.name}
        </h3>


        <div className="directory-location">
          <MapPin size={14} />

          <span>
            {business.location}
          </span>
        </div>


        <div className="directory-rating">

          <span className="rating-star">
            <Star
              size={12}
              fill="currentColor"
            />
          </span>

          <strong>
            {business.rating}
          </strong>

          {business.reviews && (
            <span>
              ({business.reviews.toLocaleString()} reviews)
            </span>
          )}

        </div>


        <p className="directory-description">
          {business.description}
        </p>


        <button
          className="directory-view-button"
          onClick={() =>
            navigate(
              `/business/${business.id}`
            )
          }
        >
          <span>
            View Business
          </span>

          <span className="directory-button-arrow">
            <ArrowRight size={15} />
          </span>
        </button>

      </div>

    </article>
  );
}

export default BusinessCard;