'use client'

import React from 'react'
import type { Faq } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { typography } from '@/utilities/typography'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQAccordionClientProps {
  faqs: Faq[]
  defaultExpanded?: boolean
  allowMultiple?: boolean
}

export const FAQAccordionClient: React.FC<FAQAccordionClientProps> = ({
  faqs,
  defaultExpanded = true,
  allowMultiple = false,
}) => {
  return (
    <Accordion
      {...(allowMultiple
        ? { type: 'multiple' as const, defaultValue: defaultExpanded ? ['item-0'] : undefined }
        : { type: 'single' as const, defaultValue: defaultExpanded ? 'item-0' : undefined, collapsible: true })}
      className="space-y-4"
    >
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          value={`item-${index}`}
          className="border border-border rounded-lg px-6 bg-card"
        >
          <AccordionTrigger className={cn(typography.h4, 'text-left hover:no-underline')}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <RichText content={faq.answer} className="text-muted-foreground" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
