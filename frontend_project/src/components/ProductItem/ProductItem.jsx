import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../asyncActions/products'
import { ROOT_URL } from '../..'
import s from './ProductItem.module.css'
import minus from './media/minus.png'
import plus from './media/plus.png'
import { addProduct } from '../../store/basketProductsSlice'

export default function Item() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(store => store.product)

    const [countProduct, setCountProduct] = useState(1)
    const [active, setActive] = useState(false)

    const { title, image, discont_price, price, description } = product

    const styles = {
        display: discont_price > 0 ? 'flex' : 'none',
        background: discont_price > 0 ? 'yellow' : ''
    }

    useEffect(() => {
        dispatch(fetchProduct(id))
    }, [id,dispatch])

    const sale = Math.floor((discont_price * 100 / price - 100) * -1)
    const discount = sale >= 100 ? '' : `-${sale}%`

    const [text_btn, setText_btn] = useState('Add to Cart')
    const handlerStyle = () => {
        setText_btn('Added')
        setActive(true)
        setTimeout(() => {
            setText_btn('Add to Cart')
            setActive(false)
        }, 2000);
    }

    return (
        <div className={['wrapper', s.card].join(' ')}>
            <div>
                <img className={s.product_image} src={ROOT_URL + image} alt={title} />
            </div>
            <div className={s.product_detail}>
                <h3>{title}</h3>
                <div className={s.price}>
                    <div>
                        <p className={s.current_price}>{`$${discont_price > 0 ? discont_price : price}`}</p>
                        <p className={s.newdiscount}>{discont_price === null ? '' : `$${price}`}</p>
                    </div>
                    <p className={s.discount_percentage} style={styles}>{discont_price === null ? '' : discount}</p>
                </div>
                <div className={s.counter}>
                    <div className={s.counter_btn}>
                        <button onClick={() => countProduct > 1 ? setCountProduct(countProduct - 1) : countProduct} className={s.control_button}>
                            <img src={minus} alt="minus" />
                        </button>
                        <p>{countProduct}</p>
                        <button onClick={() => setCountProduct(countProduct + 1)} className={s.control_button}>
                            <img src={plus} alt="plus" />
                        </button>
                    </div>
                    <button className={text_btn === 'Add to Cart' ? s.btn : s.btn_added}
                        disabled={active}
                        onClick={() => {
                            dispatch(addProduct({ product, countProduct }))
                            setCountProduct(1)
                            handlerStyle()
                        }}
                    >{text_btn}
                    </button>
                </div>
                <p className={s.desc}>Description</p>
                <p className={s.text}>{description}</p>
            </div>
        </div>
    )
}