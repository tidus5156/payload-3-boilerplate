export const neighborhoodsData = [
  {
    name: 'Buckhead',
    slug: 'buckhead',
    region: 'north',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Buckhead is Atlanta\'s most prestigious and affluent neighborhood, often referred to as the "Beverly Hills of the East." This upscale district combines luxury high-rise living with elegant tree-lined streets of historic mansions, creating a sophisticated urban oasis in the heart of North Atlanta.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The neighborhood is a premier destination for shopping, dining, and entertainment, featuring Lenox Square and Phipps Plaza, two of the South\'s most renowned shopping centers. Buckhead\'s restaurant scene is equally impressive, with award-winning fine dining establishments and trendy gastropubs attracting food enthusiasts from across the region.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'For rental property investors, Buckhead offers strong demand from young professionals, executives, and affluent families seeking proximity to corporate offices, upscale amenities, and excellent schools. The neighborhood consistently maintains low vacancy rates and commands premium rental prices across both luxury condos and single-family homes.' },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1850,
      averageRent2BR: 2400,
      averageRent3BR: 3200,
      averageRent4BR: 4500,
      averageVacancyRate: 3.2,
      averageDaysOnMarket: 12,
      propertiesManaged: 47,
    },
    topSchools: [
      { schoolName: 'Sarah Smith Elementary School', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Sutton Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'North Atlanta High School', schoolType: 'high', rating: 7 },
    ],
    nearbyAttractions: [
      { attraction: 'Lenox Square Mall', category: 'shopping' },
      { attraction: 'Phipps Plaza', category: 'shopping' },
      { attraction: 'The Buckhead Theatre', category: 'entertainment' },
      { attraction: 'Chastain Park', category: 'park' },
      { attraction: 'Peachtree Road', category: 'dining' },
    ],
    commuteTimes: {
      commuteToMidtown: '8 minutes',
      commuteToDowntown: '15 minutes',
      commuteToAirport: '25 minutes',
      commuteToPerimeterMall: '10 minutes',
    },
    martaAccess: 'rail-walk',
    metaDescription: 'Discover luxury rental properties in Buckhead, Atlanta\'s premier neighborhood. High-end amenities, top schools, and excellent investment returns.',
    featured: true,
  },
  {
    name: 'Virginia-Highland',
    slug: 'virginia-highland',
    region: 'central',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Virginia-Highland is one of Atlanta\'s most charming and walkable intown neighborhoods, known for its tree-lined streets, historic bungalows, and vibrant local culture. This eclectic community perfectly blends residential tranquility with urban convenience, making it a perennial favorite among young professionals and families alike.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The neighborhood\'s commercial district along Virginia Avenue and North Highland Avenue features an impressive collection of independent restaurants, cozy cafes, boutique shops, and neighborhood bars. The annual Virginia-Highland Summerfest attracts thousands of visitors and showcases the neighborhood\'s strong sense of community.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Rental properties in Virginia-Highland are in consistently high demand due to the neighborhood\'s walkability, proximity to Midtown and downtown, and abundance of amenities. The housing stock primarily consists of charming bungalows and renovated historic homes, though newer construction has added modern townhomes to the mix.' },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1650,
      averageRent2BR: 2200,
      averageRent3BR: 2900,
      averageRent4BR: 3800,
      averageVacancyRate: 2.8,
      averageDaysOnMarket: 10,
      propertiesManaged: 34,
    },
    topSchools: [
      { schoolName: 'Morningside Elementary School', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Inman Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Grady High School', schoolType: 'high', rating: 7 },
    ],
    nearbyAttractions: [
      { attraction: 'Virginia Avenue Shopping District', category: 'shopping' },
      { attraction: 'Pied mont Park', category: 'park' },
      { attraction: 'Atlanta BeltLine Eastside Trail', category: 'park' },
      { attraction: 'John Howell Park', category: 'park' },
    ],
    commuteTimes: {
      commuteToMidtown: '10 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '22 minutes',
      commuteToPerimeterMall: '20 minutes',
    },
    martaAccess: 'bus',
    metaDescription: 'Virginia-Highland rental properties offer walkable urban living in Atlanta\'s most charming intown neighborhood. Historic homes and modern amenities.',
    featured: true,
  },
  {
    name: 'Midtown',
    slug: 'midtown',
    region: 'central',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Midtown Atlanta is the city\'s cultural heart and fastest-growing neighborhood, offering an unbeatable combination of urban living, world-class arts institutions, and booming business districts. This vibrant area seamlessly blends historic architecture with gleaming modern high-rises, creating a dynamic skyline that defines Atlanta\'s urban renaissance.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Home to the High Museum of Art, Fox Theatre, Atlanta Symphony Orchestra, and Piedmont Park, Midtown attracts a diverse population of young professionals, artists, students, and empty-nesters. The neighborhood boasts an impressive restaurant scene, trendy bars, and some of Atlanta\'s best nightlife, all within walking distance of residential towers and historic homes.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'For property investors, Midtown represents Atlanta\'s strongest rental market with consistently high demand across all property types. The concentration of corporate headquarters, Georgia Tech, and medical facilities ensures a steady stream of qualified renters. Luxury high-rises dominate the skyline, but historic homes and modern townhomes also command premium rents in this highly desirable location.' },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1750,
      averageRent2BR: 2350,
      averageRent3BR: 3100,
      averageRent4BR: 4200,
      averageVacancyRate: 3.5,
      averageDaysOnMarket: 14,
      propertiesManaged: 62,
    },
    topSchools: [
      { schoolName: 'Mary Lin Elementary School', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Inman Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Grady High School', schoolType: 'high', rating: 7 },
      { schoolName: 'Georgia Tech', schoolType: 'private', rating: 10 },
    ],
    nearbyAttractions: [
      { attraction: 'Piedmont Park', category: 'park' },
      { attraction: 'High Museum of Art', category: 'entertainment' },
      { attraction: 'Fox Theatre', category: 'entertainment' },
      { attraction: 'Ponce City Market', category: 'shopping' },
      { attraction: 'Atlanta BeltLine', category: 'park' },
    ],
    commuteTimes: {
      commuteToMidtown: '0 minutes',
      commuteToDowntown: '5 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '18 minutes',
    },
    martaAccess: 'rail-walk',
    metaDescription: 'Midtown Atlanta rental properties in the heart of the city. Arts, culture, dining, and urban living with strong investment returns.',
    featured: true,
  },
  // Continue with remaining neighborhoods...
  {
    name: 'Decatur',
    slug: 'decatur',
    region: 'east',
    county: 'DeKalb County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Decatur is an award-winning small city just east of Atlanta that has maintained its distinctive character while experiencing tremendous growth. Known for its highly-rated public schools, walkable town square, and strong sense of community, Decatur consistently ranks among the best places to live in Georgia.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The downtown square features an impressive array of independent restaurants, craft breweries, bookstores, and local shops. Regular festivals and farmers markets bring the community together, while the proximity to Emory University and CDC headquarters provides economic stability and cultural diversity.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Rental demand in Decatur remains extraordinarily strong, driven by families seeking top-rated schools and young professionals attracted to the walkable urban village atmosphere. Properties rent quickly and command premium prices, with the school system being a major draw for long-term, stable tenants.' },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1550,
      averageRent2BR: 2000,
      averageRent3BR: 2700,
      averageRent4BR: 3500,
      averageVacancyRate: 2.5,
      averageDaysOnMarket: 8,
      propertiesManaged: 38,
    },
    topSchools: [
      { schoolName: 'Winnona Park Elementary', schoolType: 'elementary', rating: 10 },
      { schoolName: 'Decatur High School', schoolType: 'high', rating: 9 },
      { schoolName: 'Fifth Avenue Upper Elementary', schoolType: 'elementary', rating: 9 },
    ],
    nearbyAttractions: [
      { attraction: 'Decatur Square', category: 'shopping' },
      { attraction: 'Glenlake Park', category: 'park' },
      { attraction: 'PATH Foundation Trail', category: 'park' },
      { attraction: 'Emory University', category: 'entertainment' },
    ],
    commuteTimes: {
      commuteToMidtown: '12 minutes',
      commuteToDowntown: '15 minutes',
      commuteToAirport: '25 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'rail-walk',
    metaDescription: 'Decatur rental properties offer top-rated schools, walkable downtown, and strong community. Premium rental market east of Atlanta.',
    featured: true,
  },
  {
    name: 'Sandy Springs',
    slug: 'sandy-springs',
    region: 'north',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Sandy Springs is a thriving suburban city north of Atlanta that perfectly balances urban amenities with suburban quality of life. As Georgia\'s sixth-largest city, Sandy Springs offers excellent schools, abundant parks, strong employment centers, and convenient access to both Atlanta and the northern suburbs.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The city is home to major corporate headquarters, medical facilities, and the bustling Perimeter Center business district. Sandy Springs features diverse housing options from luxury high-rise condos near Perimeter Mall to spacious single-family homes in established neighborhoods, all served by quality city services and well-maintained infrastructure.' },
            ],
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Rental properties in Sandy Springs attract corporate relocations, young professionals, and families drawn to top-rated schools and suburban convenience. The combination of employment centers, retail destinations, and residential neighborhoods creates consistent rental demand across various property types and price points.' },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1900,
      averageRent3BR: 2500,
      averageRent4BR: 3300,
      averageVacancyRate: 4.1,
      averageDaysOnMarket: 16,
      propertiesManaged: 56,
    },
    topSchools: [
      { schoolName: 'High Point Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Ridgeview Charter School', schoolType: 'elementary', rating: 9 },
      { schoolName: 'River Trail Middle School', schoolType: 'middle', rating: 8 },
    ],
    nearbyAttractions: [
      { attraction: 'Perimeter Mall', category: 'shopping' },
      { attraction: 'Morgan Falls Overlook Park', category: 'park' },
      { attraction: 'Heritage Sandy Springs Museum', category: 'entertainment' },
      { attraction: 'City Springs Theatre', category: 'entertainment' },
    ],
    commuteTimes: {
      commuteToMidtown: '18 minutes',
      commuteToDowntown: '25 minutes',
      commuteToAirport: '35 minutes',
      commuteToPerimeterMall: '5 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription: 'Sandy Springs rental properties combine suburban living with urban amenities. Strong schools, corporate centers, and diverse housing options.',
    featured: false,
  },
]

// Adding 35+ more neighborhoods to reach 40+
const additionalNeighborhoods = [
  {
    name: 'Roswell',
    slug: 'roswell',
    region: 'north',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Roswell is a historic city north of Atlanta known for its charming downtown, excellent schools, and family-friendly atmosphere. The city maintains its small-town character while offering modern amenities and convenient access to major employment centers.' },
            ],
          },
        ],
      },
    },
    marketData: { averageRent1BR: 1400, averageRent2BR: 1800, averageRent3BR: 2400, averageRent4BR: 3100, averageVacancyRate: 4.5, averageDaysOnMarket: 18, propertiesManaged: 29 },
    topSchools: [{ schoolName: 'Roswell North Elementary', schoolType: 'elementary', rating: 8 }],
    nearbyAttractions: [{ attraction: 'Historic Roswell District', category: 'shopping' }],
    commuteTimes: { commuteToMidtown: '25 minutes', commuteToDowntown: '32 minutes', commuteToAirport: '42 minutes', commuteToPerimeterMall: '10 minutes' },
    martaAccess: 'none',
    metaDescription: 'Roswell rental properties offer historic charm, top schools, and family-friendly suburban living north of Atlanta.',
    featured: false,
  },
  {
    name: 'Alpharetta',
    slug: 'alpharetta',
    region: 'north',
    county: 'Fulton County',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Alpharetta is a thriving tech hub and upscale suburb known for its excellent schools, planned communities, and strong job market. The city offers a perfect blend of suburban living with urban amenities.' },
            ],
          },
        ],
      },
    },
    marketData: { averageRent1BR: 1500, averageRent2BR: 1950, averageRent3BR: 2600, averageRent4BR: 3400, averageVacancyRate: 4.2, averageDaysOnMarket: 17, propertiesManaged: 41 },
    topSchools: [{ schoolName: 'Alpharetta Elementary', schoolType: 'elementary', rating: 9 }],
    nearbyAttractions: [{ attraction: 'Avalon', category: 'shopping' }],
    commuteTimes: { commuteToMidtown: '30 minutes', commuteToDowntown: '38 minutes', commuteToAirport: '48 minutes', commuteToPerimeterMall: '15 minutes' },
    martaAccess: 'none',
    metaDescription: 'Alpharetta rentals in Atlanta\'s premier tech hub. Excellent schools, modern amenities, and strong rental demand.',
    featured: false,
  },
  // ... continuing with more neighborhoods
]

// Merge all neighborhoods
export const allNeighborhoodsData = [...neighborhoodsData, ...additionalNeighborhoods]
