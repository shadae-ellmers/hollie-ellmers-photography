'use client'

import React, { FormEvent, useCallback, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useReCaptcha } from 'next-recaptcha-v3'

export default function ContactForm() {
  const { executeRecaptcha } = useReCaptcha()
  const form = useRef<HTMLFormElement>(null)
  const [dateField, setDateFeild] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFail, setShowFail] = useState(false)
  const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const sendEmail = () => {
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
          setShowFail(false)
        },
        (error) => {
          setShowFail(true)
          setShowSuccess(false)
        }
      )
  }

  const handleRecaptcha = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!executeRecaptcha) return

      const token = await executeRecaptcha('contact_form')

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
    },
    [executeRecaptcha]
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleRecaptcha(e)
      .then(() => {
        setShowSuccess(true)
        setShowFail(false)
        sendEmail()
      })
      .catch(() => {
        setShowFail(true)
        setShowSuccess(false)
      })
  }

  const displayDateField = (e: any) => {
    setDateFeild(!dateField)
  }

  return (
    <div className="px-6 sm:px-12 py-8 lg:text-lg w-full">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 w-full"
      >
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="John Smith"
            type="text"
            name="name"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4"
            required
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="john.smith@gmail.com"
            type="email"
            name="email"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4"
            required
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="enquiry">Enquiry type</label>
          <select
            id="enquiry"
            name="enquiry"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4"
            required
            defaultValue=""
          >
            <option disabled value="">
              Select one
            </option>
            <option value="Wedding">Wedding</option>
            <option value="Event">Event</option>
            <option value="Family">Family</option>
            <option value="Couples">Couples</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            placeholder="Wellington"
            type="text"
            name="location"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-1">
          <label htmlFor="dateCheck">Do you know the specific date?</label>
          <input
            id="dateCheck"
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
          <label htmlFor="date">Event date</label>
          <input
            id="date"
            type="date"
            name="date"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Let me know the details..."
            name="message"
            className="border-2 border-olive rounded-sm w-full max-w-[450px] py-2 px-4 h-50"
            required
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="mt-4 px-10 py-1 w-min self-center cursor-pointer border-2 border-olive bg-olive text-amber-50 hover:bg-amber-50 hover:text-olive focus:bg-amber-50 focus:text-olive rounded-3xl text-2xl"
        />
        <div className={`self-center ${!showSuccess ? 'hidden' : ''}`}>
          <p>
            Submission successfully sent. I will be in touch as soon as
            possible.
          </p>
        </div>
        <div className={`self-center ${!showFail ? 'hidden' : ''}`}>
          <p>
            There was an issue with your submission. Please try again or contact
            me directly.
          </p>
        </div>
      </form>
    </div>
  )
}
