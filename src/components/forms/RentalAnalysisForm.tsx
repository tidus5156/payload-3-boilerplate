'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Textarea, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { Turnstile } from '@/components/Turnstile'

interface RentalAnalysisFormData {
  name: string
  email: string
  phone: string
  propertyAddress: string
  bedrooms: number
  bathrooms: number
  propertyType: string
  currentStatus: string
  message?: string
}

export const RentalAnalysisForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RentalAnalysisFormData>()

  const onSubmit = async (data: RentalAnalysisFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'rental-analysis',
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
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-deepNavy">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div>
          <Label htmlFor="phone" className="font-body text-deepNavy">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            placeholder="(404) 555-0100"
            className="mt-1"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Property Information */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-deepNavy">Property Information</h3>

        <div>
          <Label htmlFor="propertyAddress" className="font-body text-deepNavy">
            Property Address *
          </Label>
          <Input
            id="propertyAddress"
            {...register('propertyAddress', { required: 'Property address is required' })}
            placeholder="123 Main Street, Atlanta, GA 30303"
            className="mt-1"
          />
          {errors.propertyAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.propertyAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms" className="font-body text-deepNavy">
              Bedrooms *
            </Label>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              {...register('bedrooms', {
                required: 'Bedrooms is required',
                valueAsNumber: true,
              })}
              placeholder="3"
              className="mt-1"
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="bathrooms" className="font-body text-deepNavy">
              Bathrooms *
            </Label>
            <Input
              id="bathrooms"
              type="number"
              min="0"
              step="0.5"
              {...register('bathrooms', {
                required: 'Bathrooms is required',
                valueAsNumber: true,
              })}
              placeholder="2.5"
              className="mt-1"
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="propertyType" className="font-body text-deepNavy">
              Property Type *
            </Label>
            <select
              id="propertyType"
              {...register('propertyType', { required: 'Property type is required' })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select type...</option>
              <option value="single-family">Single Family Home</option>
              <option value="townhouse">Townhouse</option>
              <option value="condo">Condominium</option>
              <option value="multi-family">Multi-Family</option>
              <option value="other">Other</option>
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currentStatus" className="font-body text-deepNavy">
              Current Status *
            </Label>
            <select
              id="currentStatus"
              {...register('currentStatus', { required: 'Current status is required' })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select status...</option>
              <option value="vacant">Vacant</option>
              <option value="owner-occupied">Owner Occupied</option>
              <option value="rented">Currently Rented</option>
              <option value="other">Other</option>
            </select>
            {errors.currentStatus && (
              <p className="mt-1 text-sm text-red-600">{errors.currentStatus.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <Label htmlFor="message" className="font-body text-deepNavy">
          Additional Information
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Any additional details about your property..."
          rows={4}
          className="mt-1"
        />
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
        {isSubmitting ? 'Submitting...' : 'Get My Free Analysis'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 font-body text-sm font-semibold mb-2">
            Thank you! Your rental analysis request has been received.
          </p>
          <p className="text-green-700 font-body text-sm">
            Our team will analyze your property and send you a detailed rental analysis within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 font-body text-sm">
            There was an error submitting your request. Please try again or call us at (404) 555-0100.
          </p>
        </div>
      )}
    </form>
  )
}
