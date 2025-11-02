Netlify deployment
==================

This project builds to the `build` folder (webpack). The easiest ways to deploy to Netlify are using the Netlify UI (connected to a Git repo) or the Netlify CLI.

1) Deploy via Netlify UI (recommended)

- Push this repository to GitHub (or GitLab/Bitbucket).
- Go to https://app.netlify.com and create a new site from Git -> choose your repo.
- Set the "Build command" to:

  npm run build

- Set the "Publish directory" to:

  build

- Save & deploy. Netlify will run the build and publish the `build` folder.

2) Deploy via Netlify CLI (quick, from your machine)

- Install the Netlify CLI (if you don't have it):

  npm install -g netlify-cli

- Login:

  netlify login

- From the project root run (for a draft deploy):

  netlify deploy --dir=build

  To make it live (production):

  netlify deploy --dir=build --prod

Note: if you want Netlify to rebuild on pushes, use the UI to connect the repo and let Netlify build automatically. The included `netlify.toml` instructs Netlify to use `npm run build` and publish the `build` folder.

Troubleshooting
---------------
- If assets fail to load, make sure `assets/` is present in `build/` (it is copied by webpack's CopyPlugin).
- Check the Site deploy logs in Netlify for build/runtime errors.
