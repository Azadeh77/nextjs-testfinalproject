
import Image from "next/image";
import styles from "../page.module.css";
import Navigation from '../../components/navigation';
import { sql } from '@vercel/postgres';
import Link from 'next/link';

// Define your page component
const YourPage = async () => {

  
 //my previous code for retrieving
    const returned = await sql `SELECT task_id, title, description, category, priority, due_date, status, created_at FROM tasks where user_id=${"2"};`;
    
    let stringedReturn = JSON.stringify(returned.rows);
    let dataArray = returned.rows;
    console.log(returned.rows);


   
 
    return (
      <div className="parent-container">
        <Navigation />
        <div className="right-content">
         {
          <>
            <Link href="/Tasks/NewTask">
            <button className={`${styles.myButton}`}>New Task</button>
          </Link>


          <button className={`${styles.myButton}`} >Delete Task</button>
          <br></br>
          <br></br>
          <p>Current Tasks</p>
               
       <table>
      <thead>
        <tr>
        <th className={styles.checkboxColumn}></th> {/* Add this line for the checkbox column header */}
    {Object.keys(dataArray[0]).map((key, index) => {
      // Skip the task_id
      if (key === 'task_id') {
        return null;
      }
      // Capitalize the first letter
      key = key.charAt(0).toUpperCase() + key.slice(1);
      return <th key={index}>{key}</th>
    })}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((item) => (
           <tr key={item.id} className={`${styles.tablerowSpacing} ${item.status === 'InProgress' ? styles.inProgressBackgroundColor : ''} ${new Date(item.due_date) < new Date() ? styles.pastDueDate : ''}`}>
            <td className={styles.checkboxColumn}><input type="checkbox" 
             
             name={`task-${item.task_id}`}
            />
</td>
            {Object.entries(item).map(([key, value], index) => {
              // Skip the task_id
        if (key === 'task_id') {
          return null;
        }
      // Check if value is a date
      if (value instanceof Date) {
        // Format the date to a readable string
        value = value.toLocaleDateString();
      }
      // Check if key is 'priority' and change the value accordingly
  if (key === 'priority') {
    value = value === 0 ? 'Low' : value === 1 ? 'Medium' : 'High';
  }
      return <td key={index} className={styles.tablecellSpacing}>{value}</td>
    })}
          </tr>
        ))}
      </tbody>
    </table>
    </>
         
         
         }
        </div>
      </div>
    );
  }
  export const dynamic = 'force-dynamic';
 
  // Export your page component
  export default YourPage;
 
 

