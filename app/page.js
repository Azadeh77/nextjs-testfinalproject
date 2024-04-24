import Image from "next/image";
import styles from "./page.module.css";
import { sql } from '@vercel/postgres';

export default async function Home() {
  const returned = await sql `SELECT username, password,email FROM login_info;`;
  let stringedReturn = JSON.stringify(returned.rows);
  let dataArray = returned.rows;
   console.log(dataArray);

  return (
  <>
  
   
    <br></br>
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
        <tr key={item.id}>
          {Object.values(item).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
    </>
  );
}