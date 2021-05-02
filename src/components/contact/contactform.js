import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './contact.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("xoqyjlpp");
  if (state.succeeded) {
      return <p>Thanks for your feedback!</p>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
      <h3>
        Email Address
        </h3>
      </label>
      <input
        id="email"
        type="email"
        name="email"
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

function FeedbackForm() {
  return (
    <ContactForm />
  );
}
export default FeedbackForm;