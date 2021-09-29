import React, { Component } from 'react'

class Formspree extends Component {

render() {
    return (

<form
  action="https://formspree.io/f/xnqlrqvz"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="_replyto"></input>
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
)}
}

export default Formspree