"use client";
import React, { useState } from 'react';
import { Plus, Minus } from "lucide-react";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    { question: "What is Git-trace?", answer: "Git-trace is an open-source tool that allows users to view and bookmark GitHub repositories and issues, making it easier to keep track of projects." },
    { question: "What features does Git-trace offer?", answer: "Git-trace allows you to search for repositories, view issues related to those repositories, and bookmark important repositories and issues for quick access." },
    { question: "What technology stack is used for Git-trace?", answer: "Git-trace uses Next.js and React for the frontend, while the backend utilizes GitHub's API for data retrieval, along with Prisma and Neon DB for data management." },
    { question: "How do I search for repositories on Git-trace?", answer: "You can search for repositories by entering the owner's name and the repository's name in the search bar." },
    { question: "How can I bookmark repositories and issues?", answer: "After viewing a repository or issue, you can use the bookmarking feature to save it for easy access later." },
    { question: "What should I do if I encounter issues while using Git-trace?", answer: "You can report any issues on the GitHub repository, where maintainers and the community can assist you." },
    { question: "Can I use Git-trace without installing it locally?", answer: "Yes, you can access Git-trace directly through the web at git-trace.vercel.com." },
  ];

  return (
    <div className="faq-container" style={{ maxWidth: '1000px', margin: 'auto', marginTop: '5rem' }}>
      <strong><h1>Frequently Asked Questions</h1></strong>
      <br />

      <div className="faq-items-container dark:text-white bg-slate-50 dark:bg-gray-900" style={{ borderRadius: '8px', boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        {faqData.map((item, index) => (
          <div key={index}>
            <button 
              onClick={() => toggleAccordion(index)} 
              style={{ 
                width: '100%', 
                padding: '20px', 
                textAlign: 'left', 
                // border: '1px solid #ccc', 
                borderRadius: '10px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <strong>{item.question}</strong>
              <span style={{ marginLeft: '10px' }}>
                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            {activeIndex === index && (
              <div className="accordion-body" style={{ padding: '10px', paddingLeft: '20px', paddingRight: '40px', marginTop: '-1px' }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
