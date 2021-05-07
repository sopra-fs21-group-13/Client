import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './contact.css';
import {Button} from '../../views/design/Button.js';

function ContactForm() {
  const [state, handleSubmit] = useForm("xoqyjlpp");
  if (state.succeeded) {
      return <p>Thanks for your feedback!</p>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
      <h4 className = "h4text">
        Email Address:
        </h4>
      </label>
      <box>
      <input
        id="email"
        type="email"
        name="email"
      />
      </box>
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />
      <h4 className = "h4text">
      Message / Question:
      </h4>
      <box>
      <textarea
        id="message"
        name="message"
      />
      </box>
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />
      <Button>
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
      </Button>
    </form>
  );
}

function FeedbackForm() {
  return (
    <ContactForm />
  );
}
export default FeedbackForm;