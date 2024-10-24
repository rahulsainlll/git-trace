"use client"; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const Footer = () => {
  const { theme } = useTheme();
  const repoUrl = "https://github.com/rahulsainlll/git-trace/"; 
  const issueTemplate = `${repoUrl}/issues/new?template=general_issue.yaml`; 
  const featureRequestTemplate = `${repoUrl}/issues/new?template=feature_request.yaml`; 
  const contributionGuideline = `${repoUrl}/issues/new?template=documentation_update.yaml`; 
  return (
    <footer className="flex justify-between text-black py-4 text-center border-t p-10">
      <div className='flex flex-row items-center'>
        <Image src={theme === 'dark' ? '/git4.png' : '/git3.png'} alt="Logo" width={38} height={38} />
        <div className='dark:text-white'>-trace</div>
      </div>
      <p 
        className="flex items-center text-sm cursor-pointer hover:underline text-muted-foreground" 
        onClick={() => window.open(contributionGuideline, '_blank')}
      >
        Contribute
      </p>
      <p 
        className="flex items-center text-sm cursor-pointer hover:underline text-muted-foreground" 
        onClick={() => window.open(issueTemplate, '_blank')}
      >
        Report an Issue
      </p>
      <p 
        className="flex items-center text-sm cursor-pointer hover:underline text-muted-foreground" 
        onClick={() => window.open(featureRequestTemplate, '_blank')}
      >
        Request a Feature
      </p>
    </footer>
  );
}
