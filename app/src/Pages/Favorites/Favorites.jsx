import React, { useEffect, useState } from "react";
import "./Favorites.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Favorites() {

  const [favoriteNotes, setFavoriteNotes] = useState([]);

  useEffect(() => {

    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteNotes")) || [];

    setFavoriteNotes(savedFavorites);

  }, []);

  const removeFavorite = (id) => {

    const updatedFavorites = favoriteNotes.filter(
      (note) => note.id !== id
    );

    setFavoriteNotes(updatedFavorites);

    localStorage.setItem(
      "favoriteNotes",
      JSON.stringify(updatedFavorites)
    );

  };

  return (

    <div className="favorites-page">

      <div className="favorites-wrapper">

        {/* HEADER */}

        <div className="favorites-header">

          <div className="favorites-title-section">

            <div className="favorites-title-icon">
              <FavoriteIcon />
            </div>

            <div>

              <span className="favorites-label">
                YOUR COLLECTION
              </span>

              <h1>My Favorite Notes</h1>

              <p>
                Your saved thoughts, ideas and important notes.
              </p>

            </div>

          </div>


          <div className="favorites-count">

            <span>FAVORITES</span>

            <strong>{favoriteNotes.length}</strong>

          </div>

        </div>


        {/* CONTENT */}

        {favoriteNotes.length === 0 ? (

          <div className="empty-favorites">

            <div className="empty-heart-container">
              <FavoriteIcon className="empty-heart" />
            </div>

            <span className="empty-label">
              YOUR COLLECTION IS EMPTY
            </span>

            <h2>No favorite notes yet</h2>

            <p>
              You haven't saved any notes as favorites.
              Go to the Home page and click the heart button
              on a note to save it here.
            </p>

          </div>

        ) : (

          <div className="favorites-container">

            {favoriteNotes.map((note, index) => (

              <div
                className="favorite-card"
                key={note.id}
              >

                {/* CARD TOP */}

                <div className="favorite-card-top">

                  <div className="note-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="heart-badge">
                    <FavoriteIcon />
                  </div>

                </div>


                {/* NOTE CONTENT */}

                <div className="favorite-content">

                  <span className="saved-label">
                    SAVED NOTE
                  </span>

                  <h2>
                    {note.title}
                  </h2>

                  <p>
                    {note.description}
                  </p>

                </div>


                {/* CARD FOOTER */}

                <div className="favorite-card-footer">

                  <span>
                    Note #{note.id}
                  </span>

                  <button
                    className="remove-favorite"
                    onClick={() => removeFavorite(note.id)}
                  >

                    <DeleteForeverIcon />

                    Remove

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Favorites;