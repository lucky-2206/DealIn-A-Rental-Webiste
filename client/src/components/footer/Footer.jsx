import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam illum quam optio autem suscipit incidunt dicta dolorum eum dolores recusandae laboriosam expedita quo facilis, numquam et.
            Delectus atque dolorum sapiente.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: 7078882110</span>
          {/* <span>YouTube: WebDevMania</span> */}
          <span>GitHub: lucky_2206</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Country: India</span>
          <span>Current Location: Mathura</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
