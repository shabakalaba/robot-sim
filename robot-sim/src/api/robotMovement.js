const API = 'http://localhost:3001';

// Get the latest movement from the database.
export async function getLatest() {
  const res = await fetch(`${API}/get`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  return data;
}

// Create a new movement in the database.
export async function createRow(x_position, y_position, direction) {
  const res = await fetch(`${API}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x_position, y_position, direction }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
