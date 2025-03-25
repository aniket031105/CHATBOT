import React,{useState} from "react";
import Faq from 'react-faq-component';

const Popup = ({ question, onClose,isDarkMode, toggleDarkMode }) => {
  const relatedQuestions = {
    "Return Policy": [
      { title: "What is the return period?", content: "You can return items within 30 days of receipt." },
      { title: "How do I initiate a return?", content: "To initiate a return, please contact our support team." }
    ],
    "Refund Policy": [
      { title: "How long does a refund take?", content: "Refunds are processed within 5-7 business days." },
      { title: "What is the refund process?", content: "The refund process involves verification and approval." }
    ],
    "Shipping Policy": [
      { title: "What are the shipping options?", content: "We offer standard and express shipping options." },
      { title: "How do I track my order?", content: "You can track your order using the tracking link sent to your email." }
    ],
    "Privacy Policy": [
      { title: "How is my data protected?", content: "We use encryption to protect your data." },
      { title: "Can I delete my data?", content: "Yes, you can request data deletion by contacting support." }
    ]
  };

  const filteredFaqData = {
    title: question,
    rows: relatedQuestions[question] || []
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: '275px', width: 'calc(100% - 275px)', height: '100%', backgroundColor: 'rgba(0 , 0 , 0,0.5)', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '500px', marginLeft: '20px' }}>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer',color:"red", }}>✖</button>
        <Faq data={filteredFaqData} />
      </div>
    </div>
  );
};

export default Popup;