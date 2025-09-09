import { useState } from "react";
import axios from "axios";

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
    // In your sendMessage function
try {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const res = await axios.post(`${apiUrl}/chat`, { message });
  const botMsg = { sender: "bot", text: res.data.reply };
  setChat((prev) => [...prev, botMsg]);
} catch (error) {
  console.error(error);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-900 shadow-2xl rounded-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🤖 AI Chatbot Demo
        </h1>

        <div className="h-96 overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4 space-y-3">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl text-sm max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
