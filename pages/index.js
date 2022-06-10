import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [time,setTime]=useState(0);
  const [timerOn,setTimerOn]= useState(false);
  const [startStopButton,setStartStopButton]=useState("Start")
  const [showMin,setShowMin]=useState(false)
  const [lap,setLap]=useState([{lapNumber,lapDuration,lapTime}])
  const [lapNumber,setLapNumber]=useState(0)
  const [lapDuration,setLapDuration]=useState(0)
  const [lapTime,setLapTime]=useState(0);
  
  useEffect(()=>{
   
    let myInterval=null; 
    
    timerOn?myInterval=setInterval(()=>{
      setTime(prevTime=>prevTime+10)
      console.log(time)
    },10): clearInterval(myInterval)

  return ()=>clearInterval(myInterval)

  },[timerOn])

  const handleStartStop=(()=>{
    if(timerOn){
      setTimerOn(false)
      setStartStopButton("Start")
    }
    else{
      setTimerOn(true);
      setStartStopButton("Stop")
    }
    
  })

  const handleReset=(()=>{

   setTime(0);
   setTimerOn(false)
   setStartStopButton("Start")
   setLapNumber(0)
   setLapDuration(0)
   setLapTime(0)
   setLap([])
  });

  const handleLap=(()=>{
    let prevTime=lapTime;
    setLapNumber(lapNumber+1);
    setLapTime(time);
    setLapDuration(time-prevTime);
    setLap([{lapNumber,lapDuration,lapTime},...lap])
   
    
  })
  
 
  
  return (
    <div className={styles.container}>
      <Head>
        <title>StopWatch</title>
        <meta name="description" content="StopWatch App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className={styles.center}>
        <h3 className={styles.title}>
          Stopwatch
        </h3>
        <div className={styles.timer}>
        {
          parseInt((time/60000))?<span> {parseInt((time/60000))}min </span>:null
        }
        
        <span >{(parseInt(time/1000))%60}s </span>
        <span>  {parseInt(time/10)%100}</span>
       
       

        </div>
        <div> </div>
       
        <span className={styles.button2}>
        <button className={[styles.button1, styles.button2].join(" ")} onClick={handleStartStop}> {startStopButton} </button>
        
        
        <button className={[styles.button1, styles.button2].join(" ")}  onClick={handleReset} >Reset</button>

        <button className={[styles.button1, styles.button2].join(" ")}  onClick={handleLap}>Lap</button>
        </span>
      </main>
        <table>
        <tr>
        <th> Lap Number </th>
        <th> Lap Duration</th>
        <th> Lap Time</th>
        </tr>
        { 
          lap.length?lap.map((lp,idx)=>{
            return (
              <tr key={idx}>
            <td>{lp.lapNumber}</td>
            <td>{lp.lapDuration}</td>
            <td>{lp.lapTime} </td>
            </tr> )
          }):null
        }
       
        </table>
     
    </div>
  )
}
