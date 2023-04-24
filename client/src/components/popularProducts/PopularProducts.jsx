import React from 'react'
import classes from './popularProducts.module.css'
import { Link } from 'react-router-dom'
import img1 from '../../images/electronicItem.jpg'
import img2 from '../../images/mensFashion.jpg'
import img3 from '../../images/womesFashion.jpg'
import img4 from '../../images/sports.jpg'
import img5 from '../../images/homeappliance.jpg'
import { useState,useEffect } from 'react'
import {request} from '../../util/fetchAPI'

const PopularProducts = () => {
  const[numProducts,setNumProducts]=useState({})

  useEffect(()=>{
    const fetchNumberProducts = async()=>{
      try{
        const data = await request('/product/find/types',"GET")
        setNumProducts(data)
      }
      catch(error){
        console.log(error.message)
      }
    }
    fetchNumberProducts()
  },[])


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of Products</h5>
          <h2>Best Products for you</h2>
        </div>
        <div className={classes.properties}>
        <Link className={classes.property} to ={'/products?type=Electronic_Gadgets'}>
        <img src={img1} alt="Electronic Items" />
        <div className={classes.quantity}>{numProducts?.Electronic_Gadgets} Products</div>
        <h5>Electronic Items</h5>
        </Link>

        <Link className={classes.property} to ={'/products?type=Men_Fashion'}>
        <img src={img2} alt="Men's Fashion Items" />
        <div className={classes.quantity}>{numProducts?.Men_Fashion} Products</div>
        <h5>Men's Fashion Items</h5>
        </Link>

        <Link className={classes.property} to ={'/products?type=Women_Fashion'}>
        <img src={img3} alt="Women's Fashion Items" />
        <div className={classes.quantity}>{numProducts?.Women_Fashion} Products</div>
        <h5>Women's Fashion Items</h5>
        </Link>

        <Link className={classes.property} to ={'/products?type=Sports'}>
        <img src={img4} alt="Sports Items" />
        <div className={classes.quantity}>{numProducts?.Sports} Products</div>
        <h5>Sports Items</h5>
        </Link>

        <Link className={classes.property} to ={'/products?type=Household_Appliances'}>
        <img src={img5} alt="Household Items" />
        <div className={classes.quantity}>{numProducts?.Household_Appliances} Products</div>
        <h5>Household Appliances Items</h5>
        </Link>
        </div>
      </div>

    </div>
  )
}

export default PopularProducts
