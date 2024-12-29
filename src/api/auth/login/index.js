import { initializeFirebase, signIn } from '../../../lib/firebaseClient';

export async function POST(req, res) {
  console.info('[login.js] POST: Received request');

  if (req.method !== 'POST') {
    console.error('[login.js] POST: Method not allowed');
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      console.error('[login.js] POST: Missing email or password');
      return res
        .status(400)
        .json({ success: false, error: 'Email and password are required' });
    }

    console.info('[login.js] POST: Authenticating user with Firebase');

    // Initialize Firebase client
    const { auth } = initializeFirebase();

    // Authenticate using client-side Firebase Auth
    const userCredential = await signIn(email, password);

    // Retrieve ID token for the user
    const token = await userCredential.getIdToken();

    console.info('[login.js] POST: User authenticated successfully');
    return res.status(200).json({
      success: true,
      token,
      user: {
        uid: userCredential.uid,
        email: userCredential.email,
      },
    });
  } catch (error) {
    console.error(`[login.js] POST: Error during login - ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: 'Authentication failed' });
  }
}
