import { forwardGeo, reverseGeo } from '@daitanjs/geo';

export async function POST(req) {
  try {
    const { query, type } = await req.json();

    if (type === 'forward') {
      const locations = await forwardGeo({ location: query });
      return new Response(JSON.stringify({ locations }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (type === 'reverse') {
      const address = await reverseGeo({ coordinates: query });
      return new Response(JSON.stringify({ address }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid request type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
