import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import'./contactform.css';
import {Button} from '../../views/design/Button.js';

function ContactForm() {
    const [state, handleSubmit] = useForm("xoqyjlpp");
    if (state.succeeded) {
    return <h3> Thanks for your feedback!</h3>;
    }
    return(
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="h2">CONTACT</h2>
          <p className="p" type="Name:">
          <input className = 'input' placeholder="Write your name here..">
          </input>
          </p>
          <p className="p" type="Email:">
          <input className = 'input' placeholder="Let us know how to contact you back.."
              id="email"
              type="email"
              name="email"
          />
          </p>
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          <p className="p" type="Message:"><input className = 'input' placeholder="What would you like to tell us.."
          id="message"
          name="message"
          />
          </p>
          <button className="button" type="submit" disabled={state.submitting}>Send Message</button>
        </form>
    );
}

function FeedbackForm() {
  return (
    <ContactForm />
  );
}
export default FeedbackForm;