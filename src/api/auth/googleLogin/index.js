import { auth } from '../../../lib/firebaseClient';

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export async function POST(req) {
  console.info('[googleLogin.js] POST: Received request');

  try {
    const rawBody = await req.text();

    if (!rawBody || typeof rawBody !== 'string') {
      console.error('[googleLogin.js] POST: Empty or invalid request body');
      return new Response(
        JSON.stringify({ success: false, error: 'Request body is empty or invalid' }),
        { status: HTTP_STATUS.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (error) {
      console.error('[googleLogin.js] POST: Invalid JSON format', error.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON format in request body' }),
        { status: HTTP_STATUS.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { idToken } = parsedBody;

    if (!idToken || typeof idToken !== 'string' || idToken.trim().length < 20) {
      console.error('[googleLogin.js] POST: Missing or invalid ID token');
      return new Response(
        JSON.stringify({ success: false, error: 'ID token is missing or invalid' }),
        { status: HTTP_STATUS.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.info('[googleLogin.js] POST: Verifying ID token');

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      console.info('[googleLogin.js] POST: Token verified successfully');

      return new Response(
        JSON.stringify({ success: true, user: decodedToken }),
        { status: HTTP_STATUS.OK, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('[googleLogin.js] POST: Token verification failed', error.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired ID token' }),
        { status: HTTP_STATUS.UNAUTHORIZED, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('[googleLogin.js] POST: Unexpected Error', error.message, error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
