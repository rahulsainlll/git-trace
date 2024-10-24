<div align="center">
    <h1 align="center">Git-trace</h1>
    <h5>Open Source save issues and repositories endpoint</h5>
</div>

<div align="center">
  <a href="https://git-trace.vercel.app">git-trace.vercel.com</a>
</div>
<br/>

Git-trace is a tool for viewing, and bookmarking gitHub repositories and issues effortlessly keep track of your projects with ease!

## Featured In

<table>
<tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
    </tr>
    <tr>
        <td><img src="https://user-images.githubusercontent.com/63473496/213306279-338f7ce9-9a9f-4427-8c2a-3e344874498f.png#gh-dark-mode-only" width="200" height="auto" loading="lazy" alt="GSSoC Ext 24"/></td>
        <td>GirlScript Summer of Code Ext 2024</td>
        <td>GSSOC Ext is a one-month-long open-source program by the GirlScript Foundation that runs from October 1 to November 10, 2024</td> 
    </tr>
   <tr>
        <td><img src="https://cdn.prod.website-files.com/63bc83b29094ec80844b6dd5/66fc35d92c74c4e4103f3673_Flyte-at-Hacktoberfest-2024.png" width="200" height="auto" loading="lazy" alt="Hacktoberfest 24"/></td>
        <td>Hacktoberfest 2024</td>
        <td>Hacktober Fest is an annual celebration of open-source software development. It's a month-long event encouraging developers to contribute to open-source projects.</td> 
    </tr>
</table>

## Features

git-Trace allows you to:  
Search Repositories: Quickly find GitHub repositories by owner and name.  
View Issues: Explore and view issues related to the repositories you’re interested in.  
Bookmark Items: Save repositories and issues for quick access, ensuring you never lose track of important projects.

<!-- Installation Guide here -->

## Installation Guide

Before you begin, ensure you have the following prerequisites installed on your local machine:
- **Node.js**: Version 14 or higher
- **npm** (Node Package Manager): Usually comes with Node.js installation

Follow these instructions to set up **Git-trace** on your local machine for development or testing purposes:

1. **Clone the repository**:  
   Download a copy of the project to your local computer.

   ```sh
      git clone https://github.com/rahulsainlll/git-trace.git
      cd git-trace
   ```

  2. **Install dependencies**:
      
      Install all the necessary libraries and packages.

      ```sh
          npm install
        ```

  3. **Set up environment variables**:
      
      Copy the provided example .env file and fill in the necessary values.

      ```sh
          cp .env.example .env
        ```

  4. **Run the development server**:
      
      Start the development server.

      ```sh
          npm run dev
        ```

  5. **Build the project**: (optional)
      
      Prepare the project for production.

      ```sh
          npx next build
        ```

  6. **Explore and Test**: (optional)
      
      After following these steps, you can start exploring the app at http://localhost:3000. For more in-depth contribution or development guidelines, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

  <!-- Installation guide ends here -->

## Frontend

The frontend is built with Next.js and React, providing a seamless user experience. It features a clean and intuitive interface for searching repositories and viewing issues, with responsive design (under construction).


## Backend

Git-Trace’s backend handles repository and issue searches through gitHub’s api, and supports user authentication for bookmarking features. The system is powered by prisma and neon db for robust data management.


## Contributing

Please read through our [contributing guide](./CONTRIBUTING.md) before starting any work.

# Star History

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="
      https://api.star-history.com/svg?repos=rahulsainlll/git-trace&type=Date&theme=dark
    "
  />
  
  <source
    media="(prefers-color-scheme: light)"
    srcset="
      https://api.star-history.com/svg?repos=rahulsainlll/git-trace&type=Date
    "
  />
  <img
    alt="Star History Chart"
    src="https://api.star-history.com/svg?repos=rahulsainlll/git-trace&type=Date&theme=dark"
  />
</picture>

# Contributors

<a href="https://github.com/rahulsainlll/git-trace/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rahulsainlll/git-trace" />
</a>
