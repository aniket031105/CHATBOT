import React from "react";
import { motion } from "framer-motion";
import orders from "../data/ordersData"; // 🔥 Import orders from separate file

const UserProfile = ({ user, closeProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        top: "85px",
        right: "0px",
        transform: "translateX(-50%)", 
        background: "white",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        width: "260px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={closeProfile}
        style={{
          float: "right",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "16px",
          color: "#888",
        }}
      >
        ✖
      </button>

      <h3 style={{ margin: "0 0 5px", color: "#333" }}>{user.name}</h3>
      <p style={{ fontSize: "14px", color: "#666" }}>{user.email}</p>

      <h4 style={{ margin: "10px 0 5px", fontSize: "15px" }}>Past Orders:</h4>
      <ul style={{ padding: 0, listStyleType: "none", maxHeight: "120px", overflowY: "auto" }}>
        {orders.length ? (
          orders.map((order) => (
            <li key={order.id} style={{ fontSize: "14px", padding: "5px 0", borderBottom: "1px solid #eee" }}>
              🛒 {order.product}
            </li>
          ))
        ) : (
          <p style={{ fontSize: "14px", color: "#888" }}>No past orders.</p>
        )}
      </ul>
    </motion.div>
  );
};

export default UserProfile;
