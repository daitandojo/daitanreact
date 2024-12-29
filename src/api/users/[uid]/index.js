import { connectToDatabase } from '@daitanjs/data';
import { 
  getUserByUidController, 
  updateUserController, 
  deleteUserController 
} from '../../../controllers/userController.js';

export async function GET(req, { params }) {
  const { uid } = params;

  if (!uid) {
    console.error('[GET /api/users] No user UID provided');
    return new Response(JSON.stringify({ error: 'No UID provided' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    await connect();
    const user = await getUserByUidController(uid);

    if (!user) {
      console.warn(`[GET /api/users/${uid}] User not found`);
      return new Response(JSON.stringify({ error: 'User not found' }), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    console.log(`[GET /api/users/${uid}] User found:`, user);
    return new Response(JSON.stringify(user), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error(`[GET /api/users/${uid}] Error fetching user: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function PUT(req, { params }) {
  const { uid } = params;

  if (!uid) {
    console.error('[PUT /api/users] No UID provided');
    return new Response(JSON.stringify({ error: 'No UID provided' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    await connect();
    const body = await req.json();
    const updatedUser = await updateUserController(uid, body);

    if (!updatedUser) {
      console.warn(`[PUT /api/users/${uid}] User not found`);
      return new Response(JSON.stringify({ error: 'User not found' }), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    console.log(`[PUT /api/users/${uid}] User updated successfully.`);
    return new Response(JSON.stringify(updatedUser), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error(`[PUT /api/users/${uid}] Error updating user: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function DELETE(req, { params }) {
  const { uid } = params;

  if (!uid) {
    console.error('[DELETE /api/users] No UID provided');
    return new Response(JSON.stringify({ error: 'No UID provided' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    console.log(`[DELETE /api/users/${uid}] Connecting to MongoDB...`);
    await connect();
    console.log(`[DELETE /api/users/${uid}] Successfully connected to MongoDB.`);
    
    console.log(`[DELETE /api/users/${uid}] Deleting user with Firebase UID: ${uid}`);
    const deleteResult = await deleteUserController(uid);

    if (deleteResult.error) {
      console.warn(`[DELETE /api/users/${uid}] User not found`);
      return new Response(JSON.stringify(deleteResult), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    console.log(`[DELETE /api/users/${uid}] User deleted successfully.`);
    return new Response(JSON.stringify({ message: 'User deleted' }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error(`[DELETE /api/users/${uid}] Error deleting user: ${error.message}`);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
