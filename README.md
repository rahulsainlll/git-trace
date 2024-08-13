# git-trace

git-trace is a tool for viewing, and bookmarking gitHub repositories and issues effortlessly keep track of your favorite projects and issues with ease!

## features

git-Trace allows you to:  
Search Repositories: Quickly find GitHub repositories by owner and name.  
View Issues: Explore and view issues related to the repositories you’re interested in.  
Bookmark Items: Save repositories and issues for quick access, ensuring you never lose track of important projects.

## frontend

the frontend is built with Next.js and React, providing a seamless user experience. It features a clean and intuitive interface for searching repositories and viewing issues, with responsive design (under construction).


## backend

git-Trace’s backend handles repository and issue searches through gitHub’s api, and supports user authentication for bookmarking features. The system is powered by prisma and neon db for robust data management.


## running it yourself

you are welcome to self host git-trace. to get started, make sure that: 

- you are using python 3.9/3.10;
- port 8001 (used by the inference server) is free.

then follow the steps below:

1. set up the evn file 
2. run `npm install` 
3. run the development server: `npm run dev`

## feature requests

if you have any feature idea, feel free to use the issue tracker to let me know!
