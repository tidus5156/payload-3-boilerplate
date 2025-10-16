export const headerData = {
  navItems: [
    {
      link: {
        type: 'custom',
        label: 'Services',
        url: '/services',
      },
      children: [
        {
          link: {
            type: 'custom',
            label: 'Full-Service Management',
            url: '/services/full-service',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Tenant Placement',
            url: '/services/tenant-placement',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Maintenance Coordination',
            url: '/services/maintenance',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Property Inspections',
            url: '/services/inspections',
          },
        },
      ],
    },
    {
      link: {
        type: 'custom',
        label: 'About',
        url: '/about',
      },
      children: [
        {
          link: {
            type: 'custom',
            label: 'Our Team',
            url: '/about/team',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Testimonials',
            url: '/about/testimonials',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Why Choose Us',
            url: '/about/why-choose-us',
          },
        },
      ],
    },
    {
      link: {
        type: 'custom',
        label: 'Neighborhoods',
        url: '/neighborhoods',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Blog',
        url: '/posts',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Contact',
        url: '/contact',
      },
    },
  ],
}
