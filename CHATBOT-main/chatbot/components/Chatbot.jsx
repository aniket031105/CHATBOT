import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import UserProfile from "./UserProfile";
import Sidebar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import orderData from "../data/ordersData";

const predefinedMessages = [
  "What is my refund status?",
  "Can I return my order?",
  "How do I generate a return label?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Welcome! Ask me about your order.", isUser: false }]);
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPredefined, setShowPredefined] = useState(true);
  const chatContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [orders, setOrders] = useState(orderData);

  // Full-screen chatbot style
  const chatbotStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: isDarkMode ? "rgba(18,18,18)" : "#CDEDF6",
    transition: "all 0.3s ease-in-out",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const fetchBotMessage = (userMessage) => {
    fetch('https://smart-nhv2.onrender.com/api/nlp/getorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessage, userId: "567" }),
    })
      .then(response => response.text())
      .then(botMessage => {
        const botReply = botMessage;
        console.log(botReply)
        setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error('Error fetching bot message:', error);
        setIsTyping(false);
      });
  };

  const handleSend = (message) => {
    if (!message) return;

    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setInput("");
    setIsTyping(true);
    setShowPredefined(false);

    fetchBotMessage(message);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={chatbotStyle}
    >
      {/* Sidebar */}
      <Sidebar
        onSelect={handleSend}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header - Fixed at the top */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 20px",
            background: isDarkMode ? "#1a1a1a" : "#5EB1BF",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h2 style={{
              margin: 0,
              fontSize: "1.5rem",
              color: isDarkMode ? "#fff" : "#333",
              fontWeight: "600"
            }}>
              Chatbot Shanks
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer", marginRight: "30px" }}
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=John`}
              alt="User"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: `4px solid ${isDarkMode ? "#ff4d4d" : "#007bff"}`,
                transition: "all 0.3s ease",
              }}
            />
          </motion.div>
        </div>

        {/* Chat Messages - Adjusted to fit above input box */}
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "10px",
            fontFamily: "Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
            width: "100%",
            height:"80",
            marginBottom:"6%",
            position: "relative",
            backgroundColor: isDarkMode ? "#121212" : "#CDEDF6",
          }}
        >

          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  alignSelf: msg.isUser ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                <MessageBubble text={msg.text} isUser={msg.isUser} isDarkMode={isDarkMode} />
                {msg.isOrderSelection && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                    {orders.map((order) => (
                      <button
                        key={order.orderId}
                        onClick={() => handleOrderSelection(order.orderId)}
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          backgroundColor: isDarkMode ? "#333" : "#ddd",
                          color: isDarkMode ? "#fff" : "#333",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                      >
                        {order.description}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                alignSelf: "flex-start",
                background: isDarkMode ? "#404040" : "#e9ecef",
                padding: "10px 15px",
                borderRadius: "15px",
                fontSize: "16px",
                color: isDarkMode ? "#fff" : "#333",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginLeft:170,
              }}
            >
              <span className="typing-indicator">...</span>
              Chatbot is typing
            </motion.div>
          )}

          {/* Floating Predefined Questions and Category Buttons */}
          {showPredefined && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: isMobile ? "90%" : "60%",
            }}>
              {predefinedMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: isDarkMode ? "#333" : "#ddd" }}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "10px",
                    background: isDarkMode ? "rgba(172, 172, 172, 0.53)" : "rgba(0, 0, 0, 0.05)",
                    color: isDarkMode ? "#fff" : "#333",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => setInput(msg)}
                >
                  {msg}
                </motion.div>
              ))}

              {/* Category Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}>
                {["Past Orders", "Order Status", "Returns", "Payment"].map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      border: "none",
                      borderRadius: "25px",
                      padding: "10px 20px",
                      background: isDarkMode ? "linear-gradient(135deg,rgba(190, 190, 190, 0.7),rgba(160, 159, 161, 0.9))" : "linear-gradient(135deg,rgb(219, 211, 211),rgba(163, 159, 168, 0.93))",
                      color: isDarkMode ? "#fff" : "#333",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: "Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Popup */}
        <AnimatePresence>
          {showProfile && (
            <UserProfile
              user={{ name: "John Doe", email: "john@example.com" }}
              closeProfile={() => setShowProfile(false)}
              isDarkMode={isDarkMode}
            />
          )}
        </AnimatePresence>

        {/* Input Box */}
        <div style={{ 
          position: "absolute",
          bottom: 20,
          left: "30%", // 250px for sidebar + 20px padding
          display: "flex", 
          gap: "10px",
          zIndex: 10,
          width:"60%",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px 15px",
              border: "none",
              borderRadius: "25px",
              outline: "none",
              backgroundColor: isDarkMode ? "rgba(172, 172, 172, 0.23)" : "rgba(0, 0, 0, 0.05)",
              color: isDarkMode ? "#fff" : "#333",
              fontSize: "16px",
              fontFamily: "inherit",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(input)}
            style={{
              backgroundColor: isDarkMode ? "#404040" : "#e0e0e0",
              color: isDarkMode ? "#fff" : "#333",
              border: "none",
              padding: "12px 20px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;
