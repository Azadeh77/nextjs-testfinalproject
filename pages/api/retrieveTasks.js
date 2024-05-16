import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const result = await sql`SELECT status, COUNT(*) FROM tasks WHERE user_id='2' GROUP BY status`;
  console.log("ttttttttttttttttt",result.rows);
  res.status(200).json(result.rows);
}