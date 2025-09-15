import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message });
      const botMsg = { sender: "bot", text: res.data.reply };
      setChat((prev) => [...prev, userMsg, botMsg]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>AI Chatbot Demo</h1>
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <p key={idx} className={msg.sender}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
