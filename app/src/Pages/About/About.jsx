import React from "react";
import "./About.css";

import EditNoteIcon from "@mui/icons-material/EditNote";
import SecurityIcon from "@mui/icons-material/Security";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-badge">
          <span>✦</span> ABOUT NOTES
        </div>

        <h1>
          Your thoughts.
          <br />
          <span>Organized beautifully.</span>
        </h1>

        <p>
          Notes is a simple and secure digital workspace designed to help
          you capture, organize and manage your ideas in one place.
        </p>

        <div className="hero-line">
          <span></span>
          <small>WRITE · ORGANIZE · REMEMBER</small>
          <span></span>
        </div>

      </section>


      {/* FEATURES */}

      <section className="about-features">

        <div className="about-feature-card">

          <div className="feature-top">
            <span className="feature-number">01</span>

            <div className="feature-icon">
              <EditNoteIcon />
            </div>
          </div>

          <h2>Create & Edit</h2>

          <p>
            Create notes whenever inspiration strikes and edit them
            whenever you need.
          </p>

          <div className="feature-arrow">
            <ArrowForwardIcon />
          </div>

        </div>


        <div className="about-feature-card">

          <div className="feature-top">
            <span className="feature-number">02</span>

            <div className="feature-icon">
              <SecurityIcon />
            </div>
          </div>

          <h2>Secure Access</h2>

          <p>
            User accounts are protected with hashed passwords and
            token-based authentication.
          </p>

          <div className="feature-arrow">
            <ArrowForwardIcon />
          </div>

        </div>


        <div className="about-feature-card">

          <div className="feature-top">
            <span className="feature-number">03</span>

            <div className="feature-icon">
              <AutoAwesomeIcon />
            </div>
          </div>

          <h2>Simple Experience</h2>

          <p>
            A clean interface keeps your notes easy to create,
            find and manage.
          </p>

          <div className="feature-arrow">
            <ArrowForwardIcon />
          </div>

        </div>

      </section>


      {/* PURPOSE */}

      <section className="about-story">

        <div className="story-left">

          <span className="story-label">
            OUR PURPOSE
          </span>

          <h2>
            Everything important,
            <br />
            <span>in one place.</span>
          </h2>

          <div className="story-heart">
            <FavoriteIcon />
          </div>

        </div>


        <div className="story-right">

          <p>
            Notes was designed to provide a focused space where users
            can write down their thoughts without unnecessary complexity.
          </p>

          <p>
            From creating and editing notes to managing favorites,
            everything is kept simple and accessible.
          </p>

          <div className="story-bottom">

            <div>
              <strong>01</strong>
              <span>CREATE</span>
            </div>

            <div>
              <strong>02</strong>
              <span>ORGANIZE</span>
            </div>

            <div>
              <strong>03</strong>
              <span>SAVE</span>
            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM HIGHLIGHT */}

      <section className="about-highlight">

        <div className="highlight-icon">
          <EditNoteIcon />
        </div>

        <div>
          <p>YOUR IDEAS DESERVE A SPACE</p>

          <h3>
            Think it. Write it. Keep it.
          </h3>
        </div>

        <div className="highlight-star">
          ✦
        </div>

      </section>

    </div>
  );
}

export default About;