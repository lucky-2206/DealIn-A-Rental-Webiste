import React from 'react'
import classes from './productDetails.module.css'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { request } from '../../util/fetchAPI'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'
const ProductDetail = () => {
  const { user } = useSelector((state) => state.auth)
  const [productDetail, setProductDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const { id } = useParams()
  const formRef = useRef()
  const navigate = useNavigate();

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/product/find/${id}`, "GET")
        setProductDetail(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle('')
    setDesc('')
  }

  const handleContactOwner = async (e) => {
    e.preventDefault()

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(navigate('/'))
      .catch((err) => console.log(err))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${productDetail?.img}`} />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${productDetail?.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${productDetail?.type}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: $ </span>{`${productDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12p2x' }}>
                Owner <img src={`http://localhost:5000/images/${productDetail?.currentOwner?.profileImg}` } alt="" className={classes.owner}/>
              </span>
            </div>
          </div>
          <p className='classes.desc'>
            Desc: <span>{`${productDetail?.desc}`}</span>
          </p>
          <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Owner:
          </button>
        </div>
      </div>
      {
        showForm && (
          <div className={classes.contactForm} onClick={handleCloseForm}>
            <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>Send Email to Owner</h2>
              <form onSubmit={handleContactOwner} ref={formRef}>
                <input value={user?.email} type='text' placeholder='My email' name='form_email' />
                <input value={user?.userName} type='text' placeholder='My userName' name='form_userName' />
                <input value={productDetail.currentOwner.email} type='email' placeholder='Owner email' name='to_email' />
                <input type='text' placeholder='Title' name='form_title' />
                <input type='text' placeholder='Desc' name='message' />
                <button>Send</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
            </div>
          </div>
        )
      }
    </div>



  )
}

export default ProductDetail
