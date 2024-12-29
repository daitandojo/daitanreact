import { connect, User } from '@daitanjs/data';

export async function GET() {
  try {
    // Connect to MongoDB
    console.log('[GET /api/test] Connecting to MongoDB...');
    await connect();
    console.log('[GET /api/test] Successfully connected to MongoDB.');

    // Fetch all users
    const users = await User.find({})
    console.log('[GET /api/test] Users fetched:', users);

    // Return the list of users as JSON
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[GET /api/test] Error fetching users: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
