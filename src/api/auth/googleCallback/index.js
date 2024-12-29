import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export async function GET(req) {
  try {
    console.log('[googleCallback.js] GET: Received request');

    const code = new URL(req.url).searchParams.get('code');
    if (!code) {
      console.error('[googleCallback.js] GET: Authorization code missing');
      return new Response(JSON.stringify({ error: 'Authorization code missing' }), { status: 400 });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    console.log('[googleCallback.js] GET: Successfully retrieved user info');
    return new Response(JSON.stringify({ user: userInfo.data }), { status: 200 });
  } catch (error) {
    console.error(`[googleCallback.js] GET: Error - ${error.message}`, error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
