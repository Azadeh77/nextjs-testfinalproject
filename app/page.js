import Image from "next/image";
import styles from "./page.module.css";
import Navigation from '../components/navigation';
import { sql } from '@vercel/postgres';



export default async function Home() {

  const returned = await sql `SELECT username, password,email FROM login_info;`;
  let stringedReturn = JSON.stringify(returned.rows);
  let dataArray = returned.rows;
   console.log(dataArray);

  return (
  <>
    <Navigation />
   
    
    </>
  );
}