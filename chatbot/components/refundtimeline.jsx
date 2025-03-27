import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RefundTimeline = ({ status = "pending" }) => {
  const [step, setStep] = useState(0);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    if (status === "failed") {
      setIsFailed(true);
      setStep(0); // Reset to first step when failed
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [status]);

  const steps = ["Pending", "Refund Initiated", "Processing", "Approved", "Transferred", "Completed"];

  const getStepColor = (index) => {
    if (isFailed) {
      return index === 0 ? "#f44336" : "#888"; // Red for failed step, gray for others
    }
    return index <= step ? "#4caf50" : "#888";
  };

  const getProgressBarColor = () => {
    if (isFailed) return "#f44336"; // Red for failed state
    return "linear-gradient(to right, #4caf50, #8bc34a)";
  };

  return (
    <div style={styles.timelineContainer}>
      {/* Progress Bar Animation */}
      {!isFailed && (
        <motion.div
          style={{
            ...styles.progressBar,
            width: `${(step / 5) * 100}%`,
            background: getProgressBarColor(),
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {/* Refund Steps */}
      <div style={styles.steps}>
        {steps.map((label, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.step,
              color: getStepColor(index),
              fontWeight: index <= step ? "bold" : "normal",
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: index <= step ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {label}
            <motion.div
              style={{
                ...styles.circle,
                backgroundColor: getStepColor(index),
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: index <= step ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  timelineContainer: {
    width: "80%",
    maxWidth: "600px",
    margin: "40px auto",
    position: "relative",
    textAlign: "center",
  },
  progressBar: {
    height: "8px",
    borderRadius: "5px",
    transition: "width 1.5s ease-in-out",
    position: "absolute",
    top: "25px",
    left: 0,
    zIndex: -1,
  },
  steps: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginTop: "40px",
  },
  step: {
    width: "100px",
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
    position: "relative",
  },
  circle: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    position: "absolute",
    top: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    transition: "background 0.5s",
  },
};

export default RefundTimeline;
