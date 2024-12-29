import { connect } from '@daitanjs/data';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('[GET /api/your-endpoint] Connecting to MongoDB...');
      const { db } = await connect();
      console.log('[GET /api/your-endpoint] Successfully connected to MongoDB.');
      
      console.log('[GET /api/your-endpoint] Fetching all users from the database...');
      const data = await db.collection('users').find({}).toArray();
      console.log(`[GET /api/your-endpoint] Successfully fetched ${data.length} users.`);
      
      res.status(200).json(data);
    } catch (error) {
      console.error(`[GET /api/your-endpoint] Error loading data: ${error.message}`);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    console.warn(`[${req.method} /api/your-endpoint] Method not allowed.`);
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
