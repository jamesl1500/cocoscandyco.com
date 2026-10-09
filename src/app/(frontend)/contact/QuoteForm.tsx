'use client'

import React, { useActionState } from 'react'

import { eventTypes } from '@/lib/options'

import { submitInquiry } from './actions'
import { initialInquiryState, type InquiryField } from './state'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

import styles from './contact.module.scss'

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState)

  if (state.status === 'success') {
    return (
      <div className={cx(styles.formNotice, styles.formNoticeSuccess)} role="status">
        <h2>Request sent</h2>
        <p>{state.message}</p>
      </div>
    )
  }

  const fieldProps = (name: InquiryField) => ({
    'aria-describedby': state.errors[name] ? `${name}-error` : undefined,
    'aria-invalid': state.errors[name] ? true : undefined,
    defaultValue: state.values[name],
    id: name,
    name,
  })

  const fieldError = (name: InquiryField) =>
    state.errors[name] && (
      <p className={styles.fieldError} id={`${name}-error`}>
        {state.errors[name]}
      </p>
    )

  return (
    <form action={formAction} className={styles.quoteForm} noValidate>
      {state.status === 'error' && (
        <p className={cx(styles.formNotice, styles.formNoticeError)} role="alert">
          {state.message}
        </p>
      )}

      <div className={styles.field}>
        <label htmlFor="name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input {...fieldProps('name')} autoComplete="name" required type="text" />
        {fieldError('name')}
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input {...fieldProps('email')} autoComplete="email" required type="email" />
          {fieldError('email')}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Phone</label>
          <input {...fieldProps('phone')} autoComplete="tel" type="tel" />
          {fieldError('phone')}
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="eventType">Event type</label>
          <select {...fieldProps('eventType')} defaultValue={state.values.eventType || ''}>
            <option value="">Choose one</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {fieldError('eventType')}
        </div>
        <div className={styles.field}>
          <label htmlFor="eventDate">Event date</label>
          <input {...fieldProps('eventDate')} type="date" />
          {fieldError('eventDate')}
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="guestCount">Number of guests</label>
          <input {...fieldProps('guestCount')} inputMode="numeric" min={1} type="number" />
          {fieldError('guestCount')}
        </div>
        <div className={styles.field}>
          <label htmlFor="location">Venue or city</label>
          <input {...fieldProps('location')} autoComplete="off" type="text" />
          {fieldError('location')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">
          Tell us about your event <span aria-hidden="true">*</span>
        </label>
        <textarea {...fieldProps('message')} required rows={5} />
        {fieldError('message')}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className={ui.visuallyHidden}>
        <label htmlFor="company">Company</label>
        <input autoComplete="off" id="company" name="company" tabIndex={-1} type="text" />
      </div>

      <button className={cx(ui.button, styles.submit)} disabled={pending} type="submit">
        {pending ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
