
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Note from "./models/Note.js";
import User from "./models/User.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// TEMPORARY NOTES ARRAY
// ===============================

const notes = [
  {
    id: 1,
    title: "Note 1",
    description: "This is the first note"
  },
  {
    id: 2,
    title: "Note 2",
    description: "This is the second note"
  },
  {
    id: 3,
    title: "Note 3",
    description: "This is the third note"
  }
];


// ===============================
// GET ALL NOTES
// ===============================

app.get("/notes", (req, res) => {
  res.json(notes);
});


// ===============================
// CREATE NOTE
// ===============================

app.post("/note", async (req, res) => {

  const { title, description } = req.body;

  const newNote = {
    id: notes.length + 1,
    title: title,
    description: description
  };

  try {

    await Note.create(newNote);

    notes.push(newNote);

    console.log("New note created:", newNote);

    res.status(201).json(newNote);

  } catch (error) {

    console.log("Error creating note:", error);

    res.status(500).json({
      message: "Error creating note"
    });

  }
});


// ===============================
// UPDATE NOTE
// ===============================

app.put("/note/:id", async (req, res) => {

  const id = parseInt(req.params.id);

  const { title, description } = req.body;

  try {

    const note = notes.find((note) => note.id === id);

    if (!note) {

      return res.status(404).json({
        message: "Note not found"
      });

    }

    note.title = title;
    note.description = description;

    await Note.findOneAndUpdate(
      { id: id },
      {
        title: title,
        description: description
      }
    );

    console.log("Note updated:", note);

    res.json(note);

  } catch (error) {

    console.log("Error updating note:", error);

    res.status(500).json({
      message: "Error updating note"
    });

  }
});


// ===============================
// DELETE NOTE
// ===============================

app.delete("/note/:id", async (req, res) => {

  const id = parseInt(req.params.id);

  const index = notes.findIndex(
    (note) => note.id === id
  );

  if (index === -1) {

    return res.status(404).json({
      message: "Note not found"
    });

  }

  const deletedNote = notes.splice(index, 1);

  console.log("Note deleted:", deletedNote[0]);

  res.json({
    message: "Note deleted successfully",
    note: deletedNote[0]
  });

});


// ===============================
// REGISTER USER
// ===============================

app.post("/register", async (req, res) => {

  const { username, email, password } = req.body;

  try {

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password:", hashedPassword);

    // Create user
    const user = {
      username: username,
      email: email,
      password: hashedPassword
    };

    await User.create(user);

    console.log("User registered successfully");

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {

    console.log("Register error:", error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

});


app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {

      return res.status(401).json({
        message: "Invalid password"
      });

    }

   const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {

    console.log("Login error:", error);

    res.status(500).json({
      message: "Login failed"
    });

  }

});


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect("mongodb://127.0.0.1:27017/NoteDB")
  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

  })
  .catch((error) => {

    console.log(
      "MongoDB connection error:",
      error
    );

  });




// ================= CONTACT FORM =================



// ===============================
// START SERVER
// ===============================

app.listen(4000, () => {

  console.log(
    "Server is running on port 4000"
  );

});
