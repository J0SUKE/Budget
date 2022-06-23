import style from '../Dashboard.module.scss';

export default function ModaleLayout({children}) {
  return (
    <div className={style.modale}>
        {children}
    </div>
  )
}
