import { auth } from '@daitanjs/authentication';

export async function GET(req) {
  console.log('[user.js] GET: Received request to fetch user');

  try {
    // Extract Authorization Header
    const authorizationHeader = req.headers.get('authorization');
    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
      console.error('[user.js] GET: Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Authorization header is missing or invalid' }),
        { status: 401 }
      );
    }

    console.log(
      '[user.js] GET: Authorization header received:',
      authorizationHeader
    );

    // Extract Bearer Token
    const token = authorizationHeader.split('Bearer ')[1];
    if (!token || typeof token !== 'string') {
      console.error('[user.js] GET: Bearer token is missing or invalid');
      return new Response(
        JSON.stringify({ error: 'Bearer token is missing or invalid' }),
        { status: 401 }
      );
    }

    console.log('[user.js] GET: Verifying token:', token);

    // Verify the token using Firebase Admin SDK
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (verifyError) {
      console.error(
        '[user.js] GET: Token verification failed',
        verifyError.message
      );

      const errorMessage =
        verifyError.code === 'auth/argument-error'
          ? 'Invalid or malformed token'
          : 'Token verification failed';
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 401,
      });
    }

    console.log('[user.js] GET: Token verified successfully:', decodedToken);

    // Return the decoded user information
    return new Response(JSON.stringify({ user: decodedToken }), {
      status: 200,
    });
  } catch (error) {
    console.error(
      `[user.js] GET: Unexpected error - ${error.message}`,
      error
    );

    // Detailed error response for debugging
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
