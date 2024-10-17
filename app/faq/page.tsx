"use client";
import { Bold } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import Image from 'next/image';

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={{ maxWidth: '1000px', margin: 'auto', marginTop: '2rem' }}>
      <strong><h1>Frequently Asked Questions</h1></strong>
      <br />

      <div className="faq-items-container" style={{ borderRadius: '8px', boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: 'whitesmoke' }}>
        <div>
          <button 
            onClick={() => toggleAccordion(1)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>What is Git-trace?</strong>
          </button>
          {activeIndex === 1 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              <strong>Git-trace is an open-source tool</strong> that allows users to view and bookmark GitHub repositories and issues, making it easier to keep track of projects.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(2)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>What features does Git-trace offer?</strong>
          </button>
          {activeIndex === 2 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              <strong>Git-trace allows you to search for repositories,</strong> view issues related to those repositories, and bookmark important repositories and issues for quick access.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(3)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>What technology stack is used for Git-trace?</strong>
          </button>
          {activeIndex === 3 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              <strong>Git-trace uses Next.js and React for the frontend,</strong> while the backend utilizes GitHub&#39;s API for data retrieval, along with Prisma and Neon DB for data management.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(4)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>How do I search for repositories on Git-trace?</strong>
          </button>
          {activeIndex === 4 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              You can search for repositories by entering the owner&#39;s name and the repository&#39;s name in the search bar.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(5)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>How can I bookmark repositories and issues?</strong>
          </button>
          {activeIndex === 5 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              After viewing a repository or issue, you can use the bookmarking feature to save it for easy access later.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(6)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>What should I do if I encounter issues while using Git-trace?</strong>
          </button>
          {activeIndex === 6 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              <strong>You can report any issues on the GitHub repository,</strong> where maintainers and the community can assist you.
            </div>
          )}
        </div>
        <br />
        
        <div>
          <button 
            onClick={() => toggleAccordion(7)} 
            style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#f9f9f9' }}>
            <strong>Can I use Git-trace without installing it locally?</strong>
          </button>
          {activeIndex === 7 && (
            <div className="accordion-body" style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
              <strong>Yes,</strong> you can access Git-trace directly through the web at git-trace.vercel.com.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
