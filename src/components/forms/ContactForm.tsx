'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Textarea, Label } from '@/components/ui'
import { Turnstile } from '@/components/Turnstile'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          ...data,
          turnstileToken,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTurnstileToken(null)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <Label htmlFor="name" className="font-body text-deepNavy">
          Full Name *
        </Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="John Smith"
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <Label htmlFor="email" className="font-body text-deepNavy">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="john@example.com"
          className="mt-1"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <Label htmlFor="phone" className="font-body text-deepNavy">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="(404) 555-0100"
          className="mt-1"
        />
      </div>

      {/* Message Field */}
      <div>
        <Label htmlFor="message" className="font-body text-deepNavy">
          Message *
        </Label>
        <Textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          placeholder="Tell us how we can help..."
          rows={5}
          className="mt-1"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Turnstile CAPTCHA */}
      <Turnstile
        onSuccess={(token) => setTurnstileToken(token)}
        onError={() => setTurnstileToken(null)}
        onExpire={() => setTurnstileToken(null)}
        theme="light"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 font-body text-sm">
            Thank you for contacting us! We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 font-body text-sm">
            There was an error submitting your message. Please try again or call us directly.
          </p>
        </div>
      )}
    </form>
  )
}
