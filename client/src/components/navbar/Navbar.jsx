import React from 'react'
import classes from './navbar.module.css'
import { Link, useNavigate,NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import {logout} from '../../redux/authSlice'
import {request} from '../../util/fetchAPI'

const Navbar = () => {
  const [state, setState] = useState({})
  const [showForm, setShowForm] = useState(false);
  const [photo,setPhoto] = useState("");
  const { user,token} = useSelector((state) => state.auth)
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogout=()=>{
    dispatch(logout())
    navigate("/signin")
  }

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  } 

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})

  }
  const handleListProduct =async(e)=>{
    e.preventDefault()
    let filename = null
    if(photo){
      const formData = new FormData()
      filename=crypto.randomUUID()+photo.name
      formData.append("filename",filename)
      formData.append("image",photo)

      await request('/upload/image',"POST",{},formData,true)
    }
    else{
      return
    }

    try{
      const options ={
        'Authorization':`Bearer ${token}`,
        'content-Type':'application/json'

      }
     const data= await request('/product',"POST",options,{...state,img:filename})
      console.log(data)
      handleCloseForm()
    }catch(error)
    {
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          DealIn
        </Link>

        <ul className={classes.center}>
        <li onClick={scrollToTop} className={classes.listItem}>
            Home
          </li>
          <li className={classes.listItem}>
            About
          </li>
          <li className={classes.listItem}>
            Featured
          </li>
          <li className={classes.listItem}>
            Contacts
          </li>
        </ul>
        <div className={classes.right}>
          {
            !user ?
              <>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/signin'>Sign In</Link>
              </>
              :
              <>
                <span>Hello {user.userName}</span>
                <span onClick={handleLogout} className={classes.logoutBtn}> Logout</span>
                <Link onClick={() => setShowForm(true)} className={classes.list}>List your Products</Link>
              </>
          }
        </div>
      </div>
      {
        showForm && (
          <div className={classes.listProductForm} onClick={handleCloseForm}>
            <div className={classes.listProductWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>List Product</h2>
              <form onSubmit={handleListProduct}>
                <input type="text" placeholder='Title...' name='title' onChange={handleState} />
                <input type="text" placeholder='Desc...' name='desc' onChange={handleState} />
                <select type='text'name='type' placeholder="Type.." onChange={handleState}>
                  <option name="Electronic_Gadgets">Electronic Gadgets</option>
                  <option name="Men_Fashion">Men's Fashion</option>
                  <option name="Women_Fashion">Women's Fashion</option>
                  <option name="Sports">Sports</option>
                  <option name="Household_Appliances">Household_Appliances</option>
                </select>
                {/* <input type="text" placeholder='Type...' name='type' onChange={handleState} /> */}
                <input type="number" placeholder='Price...' name='price' onChange={handleState} />
                <input type="text" placeholder='Location...' name='location' onChange={handleState} />

                <div style={{ display: 'flex', alignItem: 'center', gap: '12px', width: '50%' }}>
                  <label htmlFor="photo">Product picture <AiOutlineFileImage/></label>
                  <input
                    type="file"
                    id="photo"
                    style={{ display: 'none' }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <p>{photo.name}</p>}
                </div>
                <button>List Product</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
            </div>

          </div>
        )
      }

    </div>
  )
}

export default Navbar
