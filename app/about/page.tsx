"use client"; 

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Define the component
const About: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const contributionGuideline = 'https://github.com/rahulsainlll/git-trace/blob/main/CONTRIBUTING.md';

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  return (
    <div style={getContainerStyle(theme)}>
      <h1 style={styles.title}>Git-trace</h1>
      <p style={styles.subtitle}>
        Open Source save issues and repositories endpoint
        <br />
        <a href="https://git-trace.vercel.com" style={styles.link}>
          git-trace.vercel.com
        </a>
      </p>
    
      <section style={styles.section}>
        <h2 style={styles.heading}>🎯 About</h2>
        <p style={styles.text}>
          Git-trace is a tool for viewing, and bookmarking GitHub repositories
          and issues. Effortlessly keep track of your projects with ease!
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Features</h2>
        <ul style={styles.list}>
          <li>
            ✅ Search Repositories: Quickly find GitHub repositories by owner and name.
            </li>
          <li>
            ✅ View Issues: Explore and view issues related to the repositories you’re interested in.
            </li>
          <li>
          ✅ Bookmark Items: Save repositories and issues for quick access, ensuring you never lose track of important projects.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>👁‍🗨 Frontend</h2>
        <p style={styles.text}>
          The frontend is built with Next.js and React, providing a seamless
          user experience. It features a clean and intuitive interface for
          searching repositories and viewing issues, with responsive design
          (under construction).
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>🙈 Backend</h2>
        <p style={styles.text}>
          Git-trace’s backend handles repository and issue searches through GitHub’s API, and supports user authentication for bookmarking features. The system is powered by Prisma and Neon DB for robust data management.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Contributing</h2>
        <p style={styles.text}>
          Please read through our contributing guide before starting any work.
        </p>
        <p 
        className="flex items-center text-sm cursor-pointer hover:underline text-muted-foreground" 
        onClick={() => window.open(contributionGuideline, '_blank')}
      >
         👉 Contribute
      </p>
      </section>

      
    </div>
  );
};

const getContainerStyle = (theme: string | undefined): React.CSSProperties => ({
  backgroundColor: theme === "dark" ? "#000" : "#fff",
  color: theme === "dark" ? "#fff" : "#000",
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
  lineHeight: "1.6",
});

// Define the styles object with basic TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
  },
  section: {
    marginBottom: "20px",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  text: {
    fontSize: "1rem",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "1rem",
  },
};

export default About;
