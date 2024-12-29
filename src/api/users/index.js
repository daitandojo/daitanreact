import { connectToDatabase } from '@daitanjs/data';
import { getUsersController, createUserController } from '../../controllers/userController';

export async function GET() {
  try {
    console.log('[GET /api/users] Connecting to database...');
    await connect();
    console.log('[GET /api/users] Database connected successfully.');

    const users = await getUsersController();  // Updated to use "Controller" function
    console.log(`[GET /api/users] ${users.length} users fetched successfully.`);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(`[GET /api/users] Error fetching users: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log('[POST /api/users] Connecting to database...');
    await connect();
    console.log('[POST /api/users] Database connected successfully.');

    const body = await req.json();
    console.log('[POST /api/users] Request body received:', body);

    if (!body.uid || !body.email || !body.displayName) {
      console.error('[POST /api/users] Missing required fields:', body);
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const newUser = await createUserController(body);  // Updated to use "Controller" function
    console.log('[POST /api/users] User created successfully:', newUser);
    
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error(`[POST /api/users] Error creating user: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}
