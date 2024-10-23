"use client";
// Here make sure to replace the chatbotId with the chatbot id from the chatbase.io website after creating your own chatbout and that will enable the chat icon and funcitonality for the website
// WARNING: Without providing the chatbout id the chat icon will not appear
import { useEffect } from 'react';

const ChatBotEmbed: React.FC = () => {
  useEffect(() => {
    // Create first script element
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "ADD_YOUR_CHATBOT_ID",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script1);

    // Create second script element
    const script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute('chatbotId', "ADD_YOUR_CHATBOT_ID");
    script2.setAttribute('domain', "www.chatbase.co");
    script2.defer = true;
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // No visual component needed, just embedding scripts
};

export default ChatBotEmbed;
