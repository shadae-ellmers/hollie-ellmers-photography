'use client'

import React, { FormEvent, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)

  const [dateField, setDateFeild] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFail, setShowFail] = useState(false)

  const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()
    setShowSuccess(false)
    setShowFail(false)

    if (!form.current) return

    emailjs
      .sendForm(
        emailjsServiceId as string,
        emailjsTemplateId as string,
        form.current,
        {
          publicKey: emailjsPublicKey,
        }
      )
      .then(
        () => {
          setShowSuccess(true)
        },
        (error) => {
          setShowFail(true)
        }
      )
  }

  const displayDateField = (e: any) => {
    setDateFeild(!dateField)
  }

  return (
    <div className="px-6 sm:px-12 py-8 lg:text-lg w-full">
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col justify-center gap-4 w-full"
        >
          <div className="flex flex-col items-center gap-1">
            <label>Name</label>
            <input
              placeholder="John Smith"
              type="text"
              name="name"
              className="border-2 border-olive rounded-sm w-full lg:w-1/2 py-2 px-4"
              required
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label>Email</label>
            <input
              placeholder="john.smith@gmail.com"
              type="email"
              name="email"
              className="border-2 border-olive rounded-sm w-full lg:w-1/2 py-2 px-4"
              required
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label>Enquiry type</label>
            <select
              name="enquiry"
              className="border-2 border-olive rounded-sm w-full lg:w-1/2 py-2 px-4"
              required
              defaultValue=""
            >
              <option disabled value="">
                Select one
              </option>
              <option value="Wedding">Wedding</option>
              <option value="Event">Event</option>
              <option value="Family">Family</option>
              <option value="Pet">Pet</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <label>Do you have a specific date?</label>
            <input
              type="checkbox"
              name="dateCheck"
              className="ml-2"
              onChange={displayDateField}
            />
          </div>
          <div
            className={`flex-col items-center gap-1 ${
              dateField ? 'flex' : 'hidden'
            }`}
            aria-hidden={dateField ? false : true}
          >
            <label>Event date</label>
            <input
              type="date"
              name="date"
              className="border-2 border-olive rounded-sm w-full lg:w-1/2 py-2 px-4"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label>Message</label>
            <textarea
              placeholder="Let me know the details..."
              name="message"
              className="border-2 border-olive rounded-sm w-full lg:w-1/2 py-2 px-4 h-50"
              required
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="mt-4 px-10 py-1 w-min self-center cursor-pointer border-2 border-olive bg-olive text-amber-50 hover:bg-amber-50 hover:text-olive rounded-3xl text-2xl"
          />
          <div className={`self-center ${!showSuccess ? 'hidden' : ''}`}>
            <p>
              Submission successfully sent. I will be in touch as soon as
              possible.
            </p>
          </div>
          <div className={`self-center ${!showFail ? 'hidden' : ''}`}>
            <p>
              There was an issue with your submission. Please try again or
              contact me directly.
            </p>
          </div>
        </form>
      </ReCaptchaProvider>
    </div>
  )
}
