// pages/api/createTask.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    console.log("createTask.called");
  if (req.method === 'POST') {
    const { title, description, category, priority, dueDate, status } = req.body;
console.log("title",title);
// Convert priority to number
const priorityNumber = priority === 'high' ? 2 : priority === 'medium' ? 1 : 0;
    try {
      await sql`INSERT INTO tasks (title, description, category, priority, due_date, status, user_id) VALUES (${title}, ${description}, ${category}, ${priorityNumber}, ${dueDate}, ${status}, 2)`;

      res.status(200).json({ message: 'Task created successfully' });
    } catch (err) {
      console.log(err);
      console.error('Failed to save the task', err);
      res.status(500).json({ message: `Failed to save the task: ${err.message}` });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}