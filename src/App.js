import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("#f0f8ff");
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // User Login
  const handleLogin = () => {
    if (name.trim() !== "") {
      setLoggedIn(true);
    }
  };

  // User Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setName("");
  };

  // Message Send Function
  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        user: name,
        time: new Date().toLocaleString(),
        file: selectedFile,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setSelectedFile(null);
      setCount(count + 1);
    }
  };

  // File Upload Function
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      maxWidth: "400px",
      margin: "auto",
      backgroundColor: darkMode ? "#333" : bgColor,
      borderRadius: "10px",
      boxShadow: "0px 0px 10px gray",
      color: darkMode ? "white" : "black"
    }}>
      <h1>💬 Chat App</h1>

      {!loggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "70%", padding: "5px", marginBottom: "5px" }}
          />
          <button onClick={handleLogin} style={{ marginLeft: "5px", padding: "5px", background: "blue", color: "white" }}>Login</button>
        </div>
      ) : (
        <>
          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: "10px" }}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={handleLogout} style={{ marginLeft: "10px", padding: "5px", background: "red", color: "white" }}>Logout</button>

          {/* Background Theme Buttons */}
          <div style={{ marginBottom: "10px" }}>
            <button onClick={() => setBgColor("blue")} style={{ background: "blue", color: "white", margin: "5px", padding: "5px" }}>🔵 Blue</button>
            <button onClick={() => setBgColor("green")} style={{ background: "green", color: "white", margin: "5px", padding: "5px" }}>🟢 Green</button>
            <button onClick={() => setBgColor("pink")} style={{ background: "pink", color: "black", margin: "5px", padding: "5px" }}>🌸 Pink</button>
            <button onClick={() => setBgColor("black")} style={{ background: "black", color: "white", margin: "5px", padding: "5px" }}>⚫ Black</button>
            <button onClick={() => setBgColor("#f0f8ff")} style={{ background: "gray", color: "white", margin: "5px", padding: "5px" }}>🔄 Reset</button>
          </div>

          {/* Message Input & Send Button */}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "70%", padding: "5px" }}
          />
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
          {showEmojiPicker && <EmojiPicker onEmojiClick={(emoji) => setMessage(message + emoji.emoji)} />}

          <button onClick={sendMessage} style={{ marginLeft: "5px", background: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Send</button>

          {/* File Upload */}
          <input type="file" onChange={handleFileChange} style={{ marginTop: "10px" }} />

          {/* Message Counter */}
          <h3>📩 Messages Sent: {count}</h3>

          {/* Messages List */}
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                background: msg.user === name ? "#d1e7dd" : "#f8d7da",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "5px"
              }}>
                <span><strong>{msg.user}</strong>: {msg.text} <small>({msg.time})</small></span>
                {msg.file && <img src={msg.file} alt="uploaded" style={{ width: "100px", marginTop: "5px" }} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
