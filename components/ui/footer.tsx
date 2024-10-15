"use client"; 
import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  const repoUrl = "https://github.com/rahulsainlll/git-trace/"; 
  const issueTemplate = `${repoUrl}/issues/new?template=general_issue.yaml`; 
  const featureRequestTemplate = `${repoUrl}/issues/new?template=feature_request.yaml`; 
  const contributionGuideline = `${repoUrl}/issues/new?template=documentation_update.yaml`; 

  return (
    <footer className="flex justify-between text-black py-6 text-center border-t p-10 bg-yellow-500 relative" style={{ fontFamily: 'Marker Felt, fantasy', fontSize: '1.25rem' }}>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 to-white opacity-80 z-0"></div> {/* Gradient background */}
      <div className='flex flex-row items-center z-10'> {/* Added z-10 to keep content above the gradient */}
        <Image src="/git3.png" alt="Logo" width={38} height={38} />
        <div>-trace</div>
      </div>
      <p 
        className="flex items-center cursor-pointer hover:underline z-10" 
        onClick={() => window.open(contributionGuideline, '_blank')}
        style={{ color: 'black' }} // Set text color to black
      >
        Contribute
      </p>
      <p 
        className="flex items-center cursor-pointer hover:underline z-10" 
        onClick={() => window.open(issueTemplate, '_blank')}
        style={{ color: 'black' }} // Set text color to black
      >
        Report an Issue
      </p>
      <p 
        className="flex items-center cursor-pointer hover:underline z-10" 
        onClick={() => window.open(featureRequestTemplate, '_blank')}
        style={{ color: 'black' }} // Set text color to black
      >
        Request a Feature
      </p>
    </footer>
  );
};
