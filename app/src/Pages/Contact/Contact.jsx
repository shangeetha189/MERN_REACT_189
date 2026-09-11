import React, { useState } from "react";
import "./Contact.css";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("http://localhost:4000/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {

        alert("Message sent successfully!");

        setName("");
        setEmail("");
        setMessage("");

      } else {

        alert(data.message || "Failed to send message");

      }

    } catch (error) {

      console.error("Contact error:", error);

      alert("Cannot connect to server");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="contact-page">

      <div className="contact-container">

        {/* LEFT SIDE */}

        <div className="contact-info">

          <div className="contact-logo">
            <EmailIcon />
          </div>

          <span className="contact-small-title">
            GET IN TOUCH
          </span>

          <h1>
            Let's talk about
            <span> your notes.</span>
          </h1>

          <p className="contact-description">
            Have an issue, suggestion, or feedback about the Notes app?
            Feel free to send a message. Your feedback helps make the
            application better and easier to use.
          </p>

          <div className="contact-details">

            <div className="contact-detail-item">

              <div className="detail-icon">
                <EmailIcon />
              </div>

              <div>
                <h3>Email</h3>
                <p>notes.support@gmail.com</p>
              </div>

            </div>

            <div className="contact-detail-item">

              <div className="detail-icon">
                <AccessTimeIcon />
              </div>

              <div>
                <h3>Response Time</h3>
                <p>Usually within 24 hours</p>
              </div>

            </div>

          </div>

          <div className="contact-note">

            <FavoriteBorderIcon />

            <p>
              Your ideas and feedback are always welcome.
            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="contact-form-card">

          <div className="form-top">

            <div>

              <span>MESSAGE</span>

              <h2>Send a Message</h2>

            </div>

            <div className="message-icon">
              <MessageOutlinedIcon />
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Your Name</label>

              <div className="input-wrapper">

               <PersonIcon />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Your Email</label>

              <div className="input-wrapper">

                <EmailIcon />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Your Message</label>

              <div className="input-wrapper textarea-wrapper">

                <MessageOutlinedIcon />

                <textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6"
                />

              </div>

            </div>


            <button
              type="submit"
              className="contact-submit"
              disabled={loading}
            >

              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <SendIcon />
                </>
              )}

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Contact;