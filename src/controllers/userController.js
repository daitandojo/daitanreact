import { User } from '@daitanjs/data';

export async function getUsersController() {
  try {
    const users = await User.find();
    console.info(`[getUsers] Status 200: Retrieved ${users.length} users`);
    return users;
  } catch (error) {
    console.error(`[getUsers] Status 500: ${error.message}`);
    throw new Error('Failed to fetch users');
  }
}

export async function createUserController(data) {
  try {
    if (!data || !data.uid || !data.email) {
      throw new Error('Missing required fields: uid, email');
    }
    const user = new User(data);
    await user.save();
    console.info(`[createUser] Status 201: User created with UID: ${user.uid}`);
    return user;
  } catch (error) {
    console.error(`[createUser] Status 500: ${error.message}`);
    throw new Error('Failed to create user');
  }
}

export async function getUserByUidController(uid) {
  try {
    if (!uid) throw new Error('UID is required');
    const user = await User.findOne({ uid });
    if (!user) {
      console.warn(`[getUserByUid] Status 404: User with UID ${uid} not found`);
      throw new Error(`User with UID ${uid} not found`);
    }
    console.info(`[getUserByUid] Status 200: User found`);
    return user;
  } catch (error) {
    console.error(`[getUserByUid] Status 500: ${error.message}`);
    throw new Error('Failed to fetch user');
  }
}

export async function updateUserController(uid, updatedProfile) {
  try {
    if (!uid) throw new Error('UID is required');
    const user = await User.findOneAndUpdate(
      { uid },
      { $set: updatedProfile },
      { new: true }
    );
    if (!user) {
      console.warn(`[updateUser] Status 404: User with UID ${uid} not found`);
      return { error: 'User not found' };
    }
    console.info(`[updateUser] Status 200: User updated successfully`);
    return user;
  } catch (error) {
    console.error(`[updateUser] Status 500: ${error.message}`);
    throw new Error('Failed to update user');
  }
}

export async function deleteUserController(uid) {
  try {
    if (!uid) throw new Error('UID is required');
    const user = await User.findOneAndDelete({ uid });
    if (!user) {
      console.warn(`[deleteUser] Status 404: User with UID ${uid} not found`);
      return { error: 'User not found' };
    }
    console.info(`[deleteUser] Status 200: User deleted successfully`);
    return { message: 'User deleted' };
  } catch (error) {
    console.error(`[deleteUser] Status 500: ${error.message}`);
    throw new Error('Failed to delete user');
  }
}
