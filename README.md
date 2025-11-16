# weather-app

Minimal weather app with a Vercel serverless function.

Local run

1. Create a `.env` file in the project root with:

```
API_KEY=your_openweathermap_api_key
OPENWEATHER_URL=https://api.openweathermap.org/data/2.5/weather
```

2. Install dependencies and start the dev server:

```bash
npm install
npm start
```

3. Open http://localhost:3000/public/ in your browser.

Vercel

- Add `API_KEY` and `OPENWEATHER_URL` as environment variables in your Vercel project settings.
- Ensure the `public/` folder is deployed as static files (this repo already contains `vercel.json` to rewrite to `/public`).

Fixes made

- Added `node-fetch@2` so the CommonJS `require('node-fetch')` in `/api/weather.js` works (v3 is ESM-only).
- Added a small local `index.js` Express dev server for testing.
- Moved frontend files to `public/` so Vercel serves them correctly.
- Improved error handling in `/api/weather.js` when environment variables are missing.
- Implemented a complete `public/script.js` client.

Next steps

- (Optional) Remove duplicate root static files, or keep `public/` as canonical.
- Verify deployment on Vercel with env vars set.
