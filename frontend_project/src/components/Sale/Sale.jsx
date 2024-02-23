import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fecthAllProducts } from '../../asyncActions/products'
import s from './Sale.module.css'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
import BtnNav from '../../UI/BtnNav'

function Sale() {

    const { products } = useSelector(store => store.products)
    const dispatch = useDispatch()
    console.log(products);

    useEffect(() => {
        dispatch(fecthAllProducts('sale'))
    }, [dispatch])

    return (
        <div id='sale' className={`wrapper ${s.products}`}>
            <div className={`wrapper ${s.header}`}>
                <h2>Sale</h2>
                <hr className={s.linie}></hr>
                <div className={s.sale_nav}>
                    <Link to={'/products/sales'} >
                        <BtnNav text='All sales' />
                    </Link>
                </div>
            </div>
            <div className={s.cont_sale}>
                {products.sort((a, b) => (b.price/b.discont_price - 1) - (a.price/a.discont_price - 1)).slice(0, 4).map((el) => (
                    <Link className="link" key={el.id} to={`/products/${el.id}`}>
                        <ProductCard {...el} />
                    </Link>
                ))}
            </div>
            <div className={s.nav_sale}>
                <Link to={'/products/sales'} >
                    <BtnNav text='All sales' />
                </Link>
            </div>
        </div>
    )
}

export default Sale
