import React, { Component } from 'react'

class  Welcome extends Component {

  render () {
  return (
    <section className="section auth">
      <div className="container">
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you a email. Please click on the confirmation link to verify your account.</p>

      </div>
    </section>
  )
  }
}

export default Welcome