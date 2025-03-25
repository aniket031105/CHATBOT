import React from "react";
import { motion } from "framer-motion";

const MessageBubble = ({ text, isUser, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start", // ✅ Right for user, Left for bot
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: isUser 
            ? (isDarkMode ? "#4a4a4a" : "#333") 
            : ("transparent"),
          color: isUser 
            ? "#fff" 
            : (isDarkMode ? "#fff" : "#333"),
          padding: "10px 15px",
          borderRadius: "15px",
          maxWidth: "100%",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          fontSize: "15px",
          lineHeight: "1.4",
          marginLeft:170,
          marginRight:150
        }}
      >
        {typeof text === 'string' ? text : JSON.stringify(text, null, 2)}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
