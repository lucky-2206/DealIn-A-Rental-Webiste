import React, { useState,useEffect } from 'react'
import classes from './featuredProducts.module.css'
import {Link} from 'react-router-dom'
import img from '../../images/img7.jpg'
import person from '../../images/user1.jpg'
import {FaRupeeSign ,FaMapMarkerAlt} from 'react-icons/fa'
import { request } from '../../util/fetchAPI'
const FeaturedProducts = () => {
  const [featuredProducts,setFeaturedProducts]=useState([])

  useEffect(()=>{
    const fetchFeatured = async()=>{
      try{
        const data = await request('/product/find/featured','GET')
         setFeaturedProducts(data)
      }
      catch(error)
      {
        console.error(error.message)
      }
    }
    fetchFeatured()
  },[])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Products you may like</h5>
          <h2>Our Featured Products</h2>
        </div>

        <div className={classes.featuredProducts}>
          {featuredProducts?.map((product)=>(
            <div key={product._id} className={classes.featuredProduct}>
              <Link to ={`/productDetail/${product._id}`} className={classes.imgContainer}>
              <img src={`http://localhost:5000/images/${product?.img}`}/>
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price} ><FaRupeeSign/>{product?.price}</span>
                  <img src={`http://localhost:5000/images/${product?.currentOwner?.profileImg}` } className={classes.owner} alt="" />
                </div>
                <div className={classes.moreDetails}>
                  <span><FaMapMarkerAlt className={classes.icon}/>{product?.location}</span>
                </div>
                <div className={classes.desc}>
                  {product?.desc}
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
      
    </div>
  )
}

export default FeaturedProducts
