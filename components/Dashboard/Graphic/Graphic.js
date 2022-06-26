import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';
import moment from 'moment';

import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineController, 
  CategoryScale,
  LineElement, 
  PointElement, 
  LinearScale, 
  Title } from 'chart.js';

ChartJS.register(
  LineController, 
  CategoryScale,
  LineElement, 
  PointElement, 
  LinearScale, 
  Title);

export default function Graphic() {
  
  const {dark} = useContext(ThemeCntxt);

  const labels = useMemo(()=>{
    const days = []
    
    for (let i = 0; i < 7; i++) 
    {
      days.push(moment().add(6, 'days').subtract(i, 'days').format('ddd'));
    }
    return days;
  })

  const data = useMemo(()=>(
    {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [30,40, 10],
      }]
    }))



  return (
    <div className={style.stats_zone}>
      <h2 className={`${dark ? style.dark : style.light}`}><strong>Expense</strong> Activity</h2>
      <div className={style.stats}>
        <Chart type='line' data={data} options={{maintainAspectRatio: false,}}/>
      </div>
    </div>
  )
}
