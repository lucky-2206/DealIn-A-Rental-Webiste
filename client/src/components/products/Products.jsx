import React from 'react'
import classes from './products.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'
import {FaRupeeSign ,FaMapMarkerAlt} from 'react-icons/fa'
import person from '../../images/user1.jpg'

const Products = () => {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  // fetch all properties
  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await request(`/product/getAll`, 'GET')
      setAllProducts(data)
    }
    fetchAllProducts()
  }, [])
  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const filteredProducts = allProducts.filter((product) => {
      if (product.type === options.type) {
        return product
      }
    })
    const queryStr = `type=${options.type}`

    navigate(`/products?${queryStr}`, { replace: true })
    setFilteredProducts(prev => filteredProducts)
  }

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProducts?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(prev => formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProducts, arrQuery])

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }




  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="Electronic_Gadgets">Electronic Gadgets</option>
            <option value="Men_Fashion">Men's Fashion</option>
            <option value="Women_Fashion">Women's Fashion</option>
            <option value="Sports">Sports</option>
            <option value="Household_Appliances">Household Appliances</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredProducts?.length > 0 ?
          (
            <>
            <div className={classes.titles}>
              <h5>Selected products</h5>
              <h2>Product you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProducts.map((product) => (
                <div keys={product._id}className={classes.property}>
                <Link className={classes.imgContainer} to={`/productDetail/${product._id}`}>
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
            </>
          ) : <h2 className={classes.noProperty}>We have no products with the specified options.</h2>}
      </div>
    </div>

  )
}

export default Products
