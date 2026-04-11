Deployment Setup: Chat & Pusher

To make the real-time chat work in production, add these exact environment variables to the hosting dashboards. Do not leave any localhost URLs.

--- FRONTEND (VERCEL) ---
Go to the Vercel project settings -> Environment Variables.

VITE_STRAPI_URL=https://your-live-backend-url.com
VITE_PUSHER_KEY=your_pusher_key
VITE_PUSHER_CLUSTER=your_pusher_cluster

* Note: You must trigger a new deployment in Vercel after adding these for them to work.

--- BACKEND (STRAPI) ---
Go to the backend hosting dashboard -> Environment Variables.

FRONTEND_URL=https://your-live-vercel-url.vercel.app
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster

* Note: You must restart the backend server after adding these.