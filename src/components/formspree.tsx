import React, { Component } from 'react'
import "../App.css"

class Formspree extends Component {

render() {
    return (
<div>
  <h3 className="formspree"> Send a message!</h3>
  <form  className="contact"
  action="https://formspree.io/f/xnqlrqvz"
  method="POST">
  <label className="label">
    Your email:
    <input type="email" name="_replyto"></input>
  </label>
  <label className="label" id="message">
    Your message:
    <textarea name="message"></textarea>
  </label>
  <button className="formButton"type="submit">Send</button>
</form>
</div>
)}
}

export default Formspree