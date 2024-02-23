import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import BtnNav from "../../UI/BtnNav";
import s from './BreadCrumbs.module.css'

export default function BreadCrumbs() {

  const { pathname } = useLocation();
  const breadcrumbs = useBreadcrumbs()

  const styles = {
    display: breadcrumbs.length < 2 || pathname.includes("NotFoundPage") ? 'none' : 'flex'
  }
  return (
    <div className='wrapper' >
      <div className={s.bread_style} style={styles}>
        <hr className={s.linie}></hr>
          {breadcrumbs
            .filter(el => el.breadcrumb.props.children !== 'Products')
            .map(el => <Link className={s.btn_el} to={el.match.pathname} key={el.id}>
              <BtnNav 
            
                text={el.breadcrumb.props.children}></BtnNav>
            </Link>)}
      </div>
    </div>

  )
}
