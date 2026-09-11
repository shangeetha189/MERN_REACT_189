import React, { useState, useEffect } from "react";
import "./Home.css";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

function Home() {

  const [Notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // GET NOTES
  useEffect(() => {
    fetch("http://localhost:4000/notes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Notes from backend:", data);
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error getting notes:", error);
      });
  }, []);

  // OPEN CREATE FORM
  const handleCreateClick = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
    setShowForm(true);
  };

  // CREATE NOTE
  const handleCreateNote = () => {

    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill all the fields");
      return;
    }

    fetch("http://localhost:4000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
      .then((response) => response.json())
      .then((newNote) => {

        console.log("New note:", newNote);

        setNotes([...Notes, newNote]);
        setTitle("");
        setDescription("");
        setShowForm(false);

      })
      .catch((error) => {
        console.error("Error creating note:", error);
      });
  };

  // EDIT NOTE
  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setShowForm(true);
  };

  // UPDATE NOTE
  const handleUpdate = () => {

    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill all the fields");
      return;
    }

    fetch(`http://localhost:4000/note/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
      .then((response) => response.json())
      .then((updatedNote) => {

        console.log("Updated note:", updatedNote);

        setNotes(
          Notes.map((note) =>
            note.id === editId ? updatedNote : note
          )
        );

        setTitle("");
        setDescription("");
        setEditId(null);
        setShowForm(false);

      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  // DELETE NOTE
  const handleDelete = (id) => {

    fetch(`http://localhost:4000/note/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("Delete response:", data);

        setNotes(
          Notes.filter((note) => note.id !== id)
        );

      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  // FAVORITE
  const handleFavorite = (note) => {

    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteNotes")) || [];

    const alreadyFavorite =
      savedFavorites.some((item) => item.id === note.id);

    let updatedFavorites;

    if (alreadyFavorite) {

      updatedFavorites =
        savedFavorites.filter((item) => item.id !== note.id);

    } else {

      updatedFavorites = [
        ...savedFavorites,
        note
      ];
    }

    localStorage.setItem(
      "favoriteNotes",
      JSON.stringify(updatedFavorites)
    );

    alert(
      alreadyFavorite
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  // CANCEL POPUP
  const handleCancel = () => {

    setTitle("");
    setDescription("");
    setEditId(null);
    setShowForm(false);

  };

  // SEARCH
  const filteredNotes = Notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="home-container">

      {/* HERO SECTION */}

      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-icon">
            <StickyNote2Icon />
          </div>

          <div>

            <p className="hero-small">
              YOUR PERSONAL NOTE SPACE
            </p>

            <h1>
              Organize your thoughts.
            </h1>

            <p className="hero-description">
              Capture ideas, save important information,
              and keep your notes organized in one beautiful place.
            </p>

          </div>

        </div>

        <button
          className="create-btn"
          onClick={handleCreateClick}
        >
          <AddIcon />
          Create Note
        </button>

      </section>


      {/* STATS */}

      <section className="stats-container">

        <div className="stat-card">

          <div className="stat-number">
            {Notes.length}
          </div>

          <div>
            <span>Total Notes</span>
            <p>Notes in your collection</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-number">
            {filteredNotes.length}
          </div>

          <div>
            <span>Visible Notes</span>
            <p>Results from your search</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-symbol">
            ♥
          </div>

          <div>
            <span>Quick Access</span>
            <p>Notes, favorites and more</p>
          </div>

        </div>

      </section>


      {/* NOTES HEADER */}

      <div className="notes-heading">

        <div>

          <p className="section-label">
            YOUR COLLECTION
          </p>

          <h2>
            My Notes
          </h2>

        </div>


        <div className="home-search">

          <SearchIcon />

          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* NOTES */}

      <div className="Cards-container">

        {filteredNotes.length > 0 ? (

          filteredNotes.map((values, index) => (

            <div
              className="box"
              key={values.id}
            >

              <div className="card-top">

                <span className="note-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="note-tag">
                  NOTE
                </span>

              </div>


              <div className="note-main-icon">
                <StickyNote2Icon />
              </div>


              <h3>
                {values.title}
              </h3>


              <p className="note-description">
                {values.description}
              </p>


              <div className="card-footer">

                <span>
                  Note #{values.id}
                </span>


                <div className="buttons">

                  <button
                    className="favorite"
                    onClick={() => handleFavorite(values)}
                    title="Add to favorites"
                  >
                    <FavoriteIcon />
                  </button>


                  <button
                    className="edit"
                    onClick={() => handleEdit(values)}
                    title="Edit note"
                  >
                    <EditSquareIcon />
                  </button>


                  <button
                    className="delete"
                    onClick={() => handleDelete(values.id)}
                    title="Delete note"
                  >
                    <DeleteForeverIcon />
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <div className="empty-icon">
              <StickyNote2Icon />
            </div>

            <h3>
              No notes found
            </h3>

            <p>
              {search
                ? "Try searching with another word."
                : "Create your first note to get started."
              }
            </p>

            {!search && (
              <button
                className="empty-create-btn"
                onClick={handleCreateClick}
              >
                <AddIcon />
                Create Your First Note
              </button>
            )}

          </div>

        )}

      </div>


      {/* CREATE / EDIT POPUP */}

      {showForm && (

        <div className="popup-overlay">

          <div className="popup">

            <div className="popup-decoration"></div>

            <div className="popup-header">

              <div>

                <p>
                  {editId === null
                    ? "NEW NOTE"
                    : "EDIT NOTE"
                  }
                </p>

                <h2>
                  {editId === null
                    ? "Create a new note"
                    : "Update your note"
                  }
                </h2>

              </div>


              <button
                className="close-btn"
                onClick={handleCancel}
              >
                <CloseIcon />
              </button>

            </div>


            <label>
              Note Title
            </label>

            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />


            <label>
              Description
            </label>

            <textarea
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />


            <div className="popup-buttons">

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>


              <button
                className="create-note-btn"
                onClick={
                  editId === null
                    ? handleCreateNote
                    : handleUpdate
                }
              >
                {editId === null
                  ? "Create Note"
                  : "Update Note"
                }
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Home;