import React from 'react'
import classes from './main.module.css'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
const Main = () => {

  const [type, setType] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    //navigating to properties
    navigate(`/products?type=${type}`)
  }

  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
      <h2>Why Purchase? When you can rent</h2>
      <h5>Search the item you needed</h5>
      <div className={classes.options}>
        <select onChange={(e) => setType(e.target.value)}>
          <option >Select type</option>
          <option value="Electronic_Gadgets">Electronic Gadgets</option>
          <option value="Men_Fashion">Men's Fashion</option>
          <option value="Women_Fashion">Women's Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Household_Appliances">Household Appliances</option>
        </select>
        <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
        </div>
        </div>
  )
}

export default Main
