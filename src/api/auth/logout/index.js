import {
  initializeFirebase,
  signOut,
} from '../../../lib/firebaseClient';

export async function POST(req) {
  console.info('[logout.js] POST: Received logout request');

  try {
    // Initialize Firebase client
    const { auth } = initializeFirebase();

    console.info('[logout.js] POST: Signing out the user');
    await signOut(auth);

    // Success response
    return new Response(
      JSON.stringify({ message: 'Successfully logged out' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(
      `[logout.js] POST: Unexpected error - ${error.message}`,
      error,
    );
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
