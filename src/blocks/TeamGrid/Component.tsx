import React from 'react'
import type { TeamGridBlock as TeamGridBlockType, TeamMember } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Mail, Phone, Linkedin } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'

const backgroundColors = {
  transparent: '',
  lightGray: 'bg-lightGray',
  white: 'bg-white',
}

const gridClasses = {
  two: 'grid-cols-1 md:grid-cols-2',
  three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

const spacingClasses = {
  compact: spacing.sectionCompact,
  normal: spacing.section,
  spacious: spacing.sectionSpacious,
}

export const TeamGridBlock: React.FC<TeamGridBlockType> = async ({
  heading,
  subheading,
  teamMembers: selectedMembers,
  showAllActive = true,
  limit = 6,
  columns = 'three',
  showBio = false,
  showContact = false,
  showLinkedIn = true,
  backgroundColor = 'transparent',
  spacing: spacingProp = 'normal',
}) => {
  const payload = await getPayload({ config: configPromise })

  let teamMembers: TeamMember[] = []

  // If specific members are selected, use those
  if (selectedMembers && selectedMembers.length > 0) {
    teamMembers = selectedMembers.filter((member): member is TeamMember => typeof member === 'object')
  } else if (showAllActive) {
    // Otherwise, query active members
    const result = await payload.find({
      collection: 'team-members',
      where: {
        active: { equals: true },
      },
      limit: limit || 6,
      sort: 'order',
    })

    teamMembers = result.docs
  }

  if (!teamMembers || teamMembers.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        spacingClasses[spacingProp as keyof typeof spacingClasses],
        backgroundColors[backgroundColor as keyof typeof backgroundColors]
      )}
      aria-labelledby={heading ? 'team-heading' : undefined}
    >
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {heading && (
              <h2 id="team-heading" className={typography.h2}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={cn(typography.body, 'mt-4 text-muted-foreground')}>
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8',
            gridClasses[columns as keyof typeof gridClasses]
          )}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl overflow-hidden",
                "bg-white border border-lightGray shadow-soft",
                "hover:shadow-card-hover hover:-translate-y-2",
                "transition-all duration-500"
              )}
            >
              {/* Photo */}
              {member.photo && typeof member.photo === 'object' && (
                <div className="relative aspect-square w-full overflow-hidden bg-lightGray">
                  <Media
                    resource={member.photo}
                    fill
                    imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Name & Title */}
                <div className="text-center mb-4">
                  <h3 className={cn(typography.h4, 'text-deepNavy mb-1')}>
                    {member.name}
                  </h3>
                  <p className="text-warmGold font-medium">
                    {member.title}
                  </p>
                </div>

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.certifications.map((cert, certIndex) => (
                        <span
                          key={certIndex}
                          className="text-xs px-2 py-1 rounded-full bg-lightGray text-charcoal"
                        >
                          {cert.certification}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {showBio && member.bio && (
                  <div className="mb-4 text-sm text-warmGray">
                    <RichText content={member.bio} enableGutter={false} />
                  </div>
                )}

                {/* Contact Info */}
                {showContact && (member.email || member.phone) && (
                  <div className="mb-4 space-y-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-charcoal hover:text-skyBlue transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-charcoal hover:text-skyBlue transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* LinkedIn */}
                {showLinkedIn && member.linkedin && (
                  <div className="flex justify-center pt-4 border-t border-lightGray">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-skyBlue hover:text-deepNavy transition-colors"
                      aria-label={`View ${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>View Profile</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Decorative bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
