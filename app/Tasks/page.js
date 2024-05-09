import Image from "next/image";
import styles from "../page.module.css";
import Navigation from '../../components/navigation';
import { sql } from '@vercel/postgres';
import Link from 'next/link';


// Define your page component
const YourPage = async () => {
 
    const returned = await sql `SELECT title, description, category,	priority,	due_date,	status,	created_at FROM tasks where user_id=${"2"};`;
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
            <button className="myButton">New Task</button>
          </Link>
          <br></br>
          <br></br>
          <p>Current Tasks</p>
               
       <table>
      <thead>
        <tr>
          {dataArray.length > 0 && Object.keys(dataArray[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((item) => (
           <tr key={item.id} className={`${styles.tablerowSpacing} ${item.status === 'InProgress' ? styles.inProgressBackgroundColor : ''} ${new Date(item.due_date) < new Date() ? styles.pastDueDate : ''}`}>
            {Object.values(item).map((value, index) => {
      // Check if value is a date
      if (value instanceof Date) {
        // Format the date to a readable string
        value = value.toLocaleDateString();
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
  
  