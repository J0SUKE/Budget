import React from 'react'
import style from './ButtonLoading.module.scss';

export default function ButtonLoading() {
  return (
    <div className={style.btn}>
        <div className={style.lds_ring}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
