import Image from "next/image";
import styles from "../page.module.css";
import Navigation from '../../components/navigation';
import { sql } from '@vercel/postgres';
import Link from 'next/link';





// Define your page component
const YourPage = async () => {

  const returned = await sql `SELECT title, status FROM tasks where user_id=2;`;
  let stringedReturn = JSON.stringify(returned.rows);
  let dataArray = returned.rows;


  return (
    <div className="parent-container">
      <Navigation />
      <div className="right-content">
       {
        <>
          <Link href="/Tasks/NewTask">
          <button>New Task</button>
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
        <tr key={item.id} className={`${styles.tablerowSpacing} ${item.status === 'InProgress' ? styles.inProgressBackgroundColor : ''}`}>
          {Object.values(item).map((value, index) => (
            <td key={index} className={styles.tablecellSpacing}>{value}</td>
          ))}
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

// Export your page component
export default YourPage;