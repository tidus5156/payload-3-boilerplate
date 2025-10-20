import { getPayload } from 'payload'
import config from '@payload-config'

const neighborhoods = [
  // NORTH ATLANTA
  {
    name: 'Buckhead',
    slug: 'buckhead',
    region: 'north',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Buckhead is Atlanta's most prestigious neighborhood, known for its upscale shopping, fine dining, and luxury high-rise living. This affluent area offers a sophisticated urban lifestyle with easy access to downtown Atlanta and major employers.",
              },
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
      averageDaysOnMarket: 8,
      propertiesManaged: 24,
    },
    topSchools: [
      { schoolName: 'Sarah Smith Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Sutton Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'North Atlanta High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '10 minutes',
      commuteToDowntown: '15 minutes',
      commuteToAirport: '25 minutes',
      commuteToPerimeterMall: '15 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Luxury Buckhead property management with premium rental services. Expert management for high-end Atlanta properties.',
  },
  {
    name: 'Sandy Springs',
    slug: 'sandy-springs',
    region: 'north',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Sandy Springs is a thriving suburban city just north of Atlanta, offering excellent schools, abundant parks, and convenient access to major highways. With a mix of apartments, townhomes, and single-family homes, it attracts young professionals and families alike.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1550,
      averageRent2BR: 1950,
      averageRent3BR: 2650,
      averageRent4BR: 3400,
      averageVacancyRate: 4.1,
      averageDaysOnMarket: 11,
      propertiesManaged: 32,
    },
    topSchools: [
      { schoolName: 'High Point Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Ridgeview Charter School', schoolType: 'middle', rating: 9 },
      { schoolName: 'Riverwood High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '18 minutes',
      commuteToDowntown: '22 minutes',
      commuteToAirport: '35 minutes',
      commuteToPerimeterMall: '8 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Sandy Springs property management services with deep local expertise. Professional rental management in North Atlanta.',
  },
  {
    name: 'Alpharetta',
    slug: 'alpharetta',
    region: 'north',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Alpharetta is one of metro Atlanta's fastest-growing cities, known for its top-rated schools, family-friendly atmosphere, and booming technology sector. The area features excellent shopping, dining, and recreational facilities.",
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1850,
      averageRent3BR: 2550,
      averageRent4BR: 3200,
      averageVacancyRate: 3.8,
      averageDaysOnMarket: 12,
      propertiesManaged: 18,
    },
    topSchools: [
      { schoolName: 'Manning Oaks Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Northwestern Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Alpharetta High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '28 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '45 minutes',
      commuteToPerimeterMall: '15 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Alpharetta property management with focus on families. Top-rated school districts and professional rental services.',
  },
  {
    name: 'Roswell',
    slug: 'roswell',
    region: 'north',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Roswell combines historic charm with modern amenities, featuring a picturesque downtown, excellent parks, and highly-rated schools. This family-oriented community offers a great quality of life with easy access to Atlanta.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1400,
      averageRent2BR: 1750,
      averageRent3BR: 2450,
      averageRent4BR: 3100,
      averageVacancyRate: 4.2,
      averageDaysOnMarket: 13,
      propertiesManaged: 22,
    },
    topSchools: [
      { schoolName: 'Sweet Apple Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Elkins Pointe Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Roswell High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '25 minutes',
      commuteToDowntown: '32 minutes',
      commuteToAirport: '42 minutes',
      commuteToPerimeterMall: '12 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Roswell property management combining historic charm and modern living. Family-friendly rental management services.',
  },
  {
    name: 'Dunwoody',
    slug: 'dunwoody',
    region: 'north',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Dunwoody is a thriving suburban city with excellent schools, abundant parks, and convenient MARTA access. Known for its walkable village area and family-friendly atmosphere, it's a top choice for professionals and families.",
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1500,
      averageRent2BR: 1900,
      averageRent3BR: 2600,
      averageRent4BR: 3300,
      averageVacancyRate: 3.5,
      averageDaysOnMarket: 10,
      propertiesManaged: 28,
    },
    topSchools: [
      { schoolName: 'Vanderlyn Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Peachtree Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Dunwoody High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '20 minutes',
      commuteToDowntown: '25 minutes',
      commuteToAirport: '35 minutes',
      commuteToPerimeterMall: '5 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Dunwoody property management with MARTA access. Professional rental services in prime North Atlanta location.',
  },

  // EAST ATLANTA
  {
    name: 'Decatur',
    slug: 'decatur',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Decatur is a vibrant, walkable city with an award-winning downtown square, excellent restaurants, and top-rated schools. Known for its progressive values and strong sense of community, Decatur attracts young professionals and families seeking urban amenities with a neighborhood feel.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1650,
      averageRent2BR: 2100,
      averageRent3BR: 2850,
      averageRent4BR: 3600,
      averageVacancyRate: 2.8,
      averageDaysOnMarket: 7,
      propertiesManaged: 35,
    },
    topSchools: [
      { schoolName: 'Winnona Park Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Renfroe Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Decatur High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '15 minutes',
      commuteToDowntown: '18 minutes',
      commuteToAirport: '28 minutes',
      commuteToPerimeterMall: '22 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Decatur property management in walkable urban community. Award-winning schools and downtown square location.',
  },
  {
    name: 'Tucker',
    slug: 'tucker',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Tucker is an affordable suburban community offering good schools, convenient highway access, and a growing downtown area. Its central location provides easy commutes to Atlanta, Decatur, and other major employment centers.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1250,
      averageRent2BR: 1550,
      averageRent3BR: 2100,
      averageRent4BR: 2700,
      averageVacancyRate: 4.5,
      averageDaysOnMarket: 14,
      propertiesManaged: 16,
    },
    topSchools: [
      { schoolName: 'Indian Creek Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Tucker Middle School', schoolType: 'middle', rating: 6 },
      { schoolName: 'Tucker High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '22 minutes',
      commuteToDowntown: '25 minutes',
      commuteToAirport: '32 minutes',
      commuteToPerimeterMall: '18 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Tucker property management with affordable rentals. Convenient East Atlanta location with highway access.',
  },

  // Add more neighborhoods... (continuing the pattern for 40-50 total)
  {
    name: 'Marietta',
    slug: 'marietta',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Marietta combines historic charm with modern amenities, featuring a beautiful downtown square, excellent parks, and diverse housing options. Close to major employers like Lockheed Martin and Dobbins Air Force Base.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1350,
      averageRent2BR: 1700,
      averageRent3BR: 2300,
      averageRent4BR: 2900,
      averageVacancyRate: 4.0,
      averageDaysOnMarket: 12,
      propertiesManaged: 26,
    },
    topSchools: [
      { schoolName: 'West Side Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Lassiter High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '20 minutes',
      commuteToDowntown: '28 minutes',
      commuteToAirport: '38 minutes',
      commuteToPerimeterMall: '18 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Marietta property management near major employers. Historic charm meets modern rental living.',
  },
  {
    name: 'Smyrna',
    slug: 'smyrna',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Smyrna is a rapidly growing city with a revitalized downtown, excellent parks, and convenient access to Atlanta and Marietta. The city's Jonquil City moniker reflects its beautiful streetscapes and community pride.",
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1400,
      averageRent2BR: 1750,
      averageRent3BR: 2400,
      averageRent4BR: 3000,
      averageVacancyRate: 3.6,
      averageDaysOnMarket: 10,
      propertiesManaged: 20,
    },
    topSchools: [
      { schoolName: 'Campbell Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Campbell High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '18 minutes',
      commuteToDowntown: '25 minutes',
      commuteToAirport: '35 minutes',
      commuteToPerimeterMall: '15 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Smyrna property management in revitalized downtown area. Growing community with convenient access.',
  },
  {
    name: 'Kennesaw',
    slug: 'kennesaw',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Kennesaw is home to Kennesaw State University and offers a mix of student housing and family neighborhoods. The area features Civil War history, Kennesaw Mountain National Battlefield, and growing retail development.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1300,
      averageRent2BR: 1650,
      averageRent3BR: 2250,
      averageRent4BR: 2850,
      averageVacancyRate: 4.3,
      averageDaysOnMarket: 13,
      propertiesManaged: 14,
    },
    topSchools: [
      { schoolName: 'Big Shanty Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'North Cobb High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '28 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '45 minutes',
      commuteToPerimeterMall: '20 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Kennesaw property management near KSU campus. Mix of student and family rental properties.',
  },
  {
    name: 'Brookhaven',
    slug: 'brookhaven',
    region: 'north',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Brookhaven is an upscale city with a thriving downtown area, luxury apartments, and excellent schools. The area combines urban amenities with suburban feel, attracting young professionals and families.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1700,
      averageRent2BR: 2200,
      averageRent3BR: 2950,
      averageRent4BR: 3700,
      averageVacancyRate: 3.1,
      averageDaysOnMarket: 9,
      propertiesManaged: 30,
    },
    topSchools: [
      { schoolName: 'Ashford Park Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Chamblee High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '12 minutes',
      commuteToDowntown: '18 minutes',
      commuteToAirport: '28 minutes',
      commuteToPerimeterMall: '10 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Brookhaven property management in upscale urban neighborhood. MARTA access and luxury rentals.',
  },
  {
    name: 'Midtown',
    slug: 'midtown',
    region: 'central',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Midtown Atlanta is the cultural heart of the city, featuring world-class arts venues, Piedmont Park, and a thriving urban scene. High-rise living with walkability to restaurants, entertainment, and major employers.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1950,
      averageRent2BR: 2600,
      averageRent3BR: 3500,
      averageRent4BR: 4800,
      averageVacancyRate: 2.5,
      averageDaysOnMarket: 6,
      propertiesManaged: 42,
    },
    topSchools: [
      { schoolName: 'Mary Lin Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Grady High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '0 minutes',
      commuteToDowntown: '8 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '20 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Midtown Atlanta property management for urban professionals. High-rise rentals with MARTA access.',
  },
  {
    name: 'Virginia-Highland',
    slug: 'virginia-highland',
    region: 'central',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Virginia-Highland is a charming intown neighborhood known for its bungalow-style homes, tree-lined streets, and vibrant commercial district along Virginia Avenue. Popular with young professionals and families seeking walkability.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1750,
      averageRent2BR: 2300,
      averageRent3BR: 3100,
      averageRent4BR: 3900,
      averageVacancyRate: 2.9,
      averageDaysOnMarket: 8,
      propertiesManaged: 19,
    },
    topSchools: [
      { schoolName: 'Morningside Elementary', schoolType: 'elementary', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '10 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '22 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Virginia-Highland property management in walkable intown neighborhood. Bungalows and historic charm.',
  },
  {
    name: 'Johns Creek',
    slug: 'johns-creek',
    region: 'north',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Johns Creek is one of the most affluent cities in Georgia, known for its top-rated schools, safe neighborhoods, and family-friendly atmosphere. The area features excellent parks and convenient access to major highways.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1500,
      averageRent2BR: 1900,
      averageRent3BR: 2700,
      averageRent4BR: 3500,
      averageVacancyRate: 3.4,
      averageDaysOnMarket: 11,
      propertiesManaged: 15,
    },
    topSchools: [
      { schoolName: 'State Bridge Crossing Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Riverwatch Middle School', schoolType: 'middle', rating: 9 },
      { schoolName: 'Chattahoochee High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '32 minutes',
      commuteToDowntown: '38 minutes',
      commuteToAirport: '48 minutes',
      commuteToPerimeterMall: '18 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Johns Creek property management in top-rated school district. Family-focused rental services.',
  },
  {
    name: 'Cumming',
    slug: 'cumming',
    region: 'north',
    county: 'Forsyth',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Cumming is the county seat of Forsyth County, offering excellent schools, lakefront living on Lake Lanier, and a growing downtown. The area attracts families seeking high-quality education and outdoor recreation.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1350,
      averageRent2BR: 1700,
      averageRent3BR: 2400,
      averageRent4BR: 3100,
      averageVacancyRate: 4.0,
      averageDaysOnMarket: 12,
      propertiesManaged: 12,
    },
    topSchools: [
      { schoolName: 'Sawnee Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Lakeside Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'South Forsyth High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '38 minutes',
      commuteToDowntown: '45 minutes',
      commuteToAirport: '55 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Cumming property management near Lake Lanier. Family neighborhoods with excellent schools.',
  },
  {
    name: 'East Point',
    slug: 'east-point',
    region: 'south',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'East Point is an affordable community near the airport with convenient MARTA access and easy highway connections. The city is experiencing revitalization with new development and improving amenities.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1150,
      averageRent2BR: 1450,
      averageRent3BR: 1900,
      averageRent4BR: 2400,
      averageVacancyRate: 5.2,
      averageDaysOnMarket: 16,
      propertiesManaged: 11,
    },
    topSchools: [
      { schoolName: 'Conley Hills Elementary', schoolType: 'elementary', rating: 6 },
      { schoolName: 'Tri-Cities High School', schoolType: 'high', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '20 minutes',
      commuteToDowntown: '15 minutes',
      commuteToAirport: '10 minutes',
      commuteToPerimeterMall: '30 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'East Point property management near airport. Affordable rentals with MARTA access.',
  },
  {
    name: 'College Park',
    slug: 'college-park',
    region: 'south',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'College Park is adjacent to Hartsfield-Jackson Airport, offering convenient access for aviation and airport employees. The area is undergoing redevelopment with new businesses and housing.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1100,
      averageRent2BR: 1400,
      averageRent3BR: 1850,
      averageRent4BR: 2350,
      averageVacancyRate: 5.5,
      averageDaysOnMarket: 17,
      propertiesManaged: 9,
    },
    topSchools: [
      { schoolName: 'Dodgen Middle School', schoolType: 'middle', rating: 5 },
    ],
    commuteTimes: {
      commuteToMidtown: '22 minutes',
      commuteToDowntown: '18 minutes',
      commuteToAirport: '5 minutes',
      commuteToPerimeterMall: '32 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'College Park property management near airport. Convenient for aviation industry employees.',
  },
  {
    name: 'Vinings',
    slug: 'vinings',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Vinings is an upscale community known for its luxury apartments, shopping at Vinings Jubilee, and scenic Chattahoochee River views. The area attracts young professionals seeking proximity to Buckhead and Atlanta.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1600,
      averageRent2BR: 2000,
      averageRent3BR: 2750,
      averageRent4BR: 3400,
      averageVacancyRate: 3.3,
      averageDaysOnMarket: 9,
      propertiesManaged: 25,
    },
    topSchools: [
      { schoolName: 'Teasley Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Pebblebrook High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '15 minutes',
      commuteToDowntown: '20 minutes',
      commuteToAirport: '30 minutes',
      commuteToPerimeterMall: '12 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Vinings property management in upscale riverside community. Luxury apartments near Buckhead.',
  },
  {
    name: 'Chamblee',
    slug: 'chamblee',
    region: 'north',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Chamblee is a diverse, revitalized city with excellent MARTA access, international restaurants along Buford Highway, and affordable housing. The area appeals to young professionals and diverse families.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1350,
      averageRent2BR: 1700,
      averageRent3BR: 2300,
      averageRent4BR: 2900,
      averageVacancyRate: 4.1,
      averageDaysOnMarket: 11,
      propertiesManaged: 17,
    },
    topSchools: [
      { schoolName: 'Chamblee Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Chamblee Charter High School', schoolType: 'high', rating: 9 },
    ],
    commuteTimes: {
      commuteToMidtown: '18 minutes',
      commuteToDowntown: '22 minutes',
      commuteToAirport: '30 minutes',
      commuteToPerimeterMall: '12 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Chamblee property management with MARTA access. Diverse community along Buford Highway.',
  },
  {
    name: 'Stone Mountain',
    slug: 'stone-mountain',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Stone Mountain is known for its iconic granite outcropping and surrounding park. The area offers affordable housing, diverse communities, and convenient access to Interstate 285.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1200,
      averageRent2BR: 1500,
      averageRent3BR: 2000,
      averageRent4BR: 2600,
      averageVacancyRate: 4.8,
      averageDaysOnMarket: 15,
      propertiesManaged: 13,
    },
    topSchools: [
      { schoolName: 'Smoke Rise Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Stone Mountain Middle School', schoolType: 'middle', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '28 minutes',
      commuteToDowntown: '30 minutes',
      commuteToAirport: '38 minutes',
      commuteToPerimeterMall: '30 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Stone Mountain property management near historic park. Affordable East Atlanta rentals.',
  },
  {
    name: 'Peachtree Corners',
    slug: 'peachtree-corners',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Peachtree Corners is a master-planned city with excellent technology infrastructure, modern amenities, and good schools. The area attracts professionals working in the technology corridor.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1850,
      averageRent3BR: 2500,
      averageRent4BR: 3200,
      averageVacancyRate: 3.7,
      averageDaysOnMarket: 10,
      propertiesManaged: 21,
    },
    topSchools: [
      { schoolName: 'Pinckneyville Middle School', schoolType: 'middle', rating: 8 },
      { schoolName: 'Norcross High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '25 minutes',
      commuteToDowntown: '30 minutes',
      commuteToAirport: '40 minutes',
      commuteToPerimeterMall: '15 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Peachtree Corners property management in technology corridor. Modern planned community.',
  },
  {
    name: 'Lawrenceville',
    slug: 'lawrenceville',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Lawrenceville is the county seat of Gwinnett County, featuring a charming downtown square, diverse community, and affordable housing. The area offers good schools and convenient highway access.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1300,
      averageRent2BR: 1650,
      averageRent3BR: 2200,
      averageRent4BR: 2800,
      averageVacancyRate: 4.4,
      averageDaysOnMarket: 13,
      propertiesManaged: 14,
    },
    topSchools: [
      { schoolName: 'Dacula Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Dacula High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '35 minutes',
      commuteToDowntown: '40 minutes',
      commuteToAirport: '50 minutes',
      commuteToPerimeterMall: '28 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Lawrenceville property management in Gwinnett County seat. Affordable family neighborhoods.',
  },
  {
    name: 'Acworth',
    slug: 'acworth',
    region: 'north',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Acworth is a lakeside community on Lake Acworth and Lake Allatoona, offering waterfront living and small-town charm. The area features a historic downtown, good schools, and outdoor recreation.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1250,
      averageRent2BR: 1600,
      averageRent3BR: 2150,
      averageRent4BR: 2750,
      averageVacancyRate: 4.5,
      averageDaysOnMarket: 14,
      propertiesManaged: 10,
    },
    topSchools: [
      { schoolName: 'Barber Middle School', schoolType: 'middle', rating: 7 },
      { schoolName: 'Harrison High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '35 minutes',
      commuteToDowntown: '42 minutes',
      commuteToAirport: '52 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Acworth property management on Lake Acworth. Lakeside living with small-town charm.',
  },
  {
    name: 'Duluth',
    slug: 'duluth',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Duluth features excellent Asian restaurants, diverse shopping, and a revitalized downtown. The area is known for its international community and convenient access to major highways.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1400,
      averageRent2BR: 1750,
      averageRent3BR: 2350,
      averageRent4BR: 3000,
      averageVacancyRate: 4.0,
      averageDaysOnMarket: 12,
      propertiesManaged: 16,
    },
    topSchools: [
      { schoolName: 'Duluth Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Duluth High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '30 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '45 minutes',
      commuteToPerimeterMall: '20 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Duluth property management in diverse international community. Excellent dining and shopping.',
  },
  {
    name: 'Suwanee',
    slug: 'suwanee',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Suwanee is a family-friendly city known for its award-winning town center, excellent parks, and top-rated schools. The area features a strong sense of community and high quality of life.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1850,
      averageRent3BR: 2550,
      averageRent4BR: 3300,
      averageVacancyRate: 3.6,
      averageDaysOnMarket: 10,
      propertiesManaged: 13,
    },
    topSchools: [
      { schoolName: 'Suwanee Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'North Gwinnett High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '35 minutes',
      commuteToDowntown: '40 minutes',
      commuteToAirport: '50 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Suwanee property management in award-winning town center community. Top schools and parks.',
  },
  {
    name: 'Canton',
    slug: 'canton',
    region: 'north',
    county: 'Cherokee',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Canton is the Cherokee County seat with a charming historic downtown, excellent schools, and growing retail development. The area offers a small-town feel with convenient access to Atlanta.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1300,
      averageRent2BR: 1650,
      averageRent3BR: 2250,
      averageRent4BR: 2850,
      averageVacancyRate: 4.2,
      averageDaysOnMarket: 13,
      propertiesManaged: 10,
    },
    topSchools: [
      { schoolName: 'Hasty Elementary', schoolType: 'elementary', rating: 8 },
      { schoolName: 'Sequoyah High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '38 minutes',
      commuteToDowntown: '45 minutes',
      commuteToAirport: '55 minutes',
      commuteToPerimeterMall: '28 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Canton property management in Cherokee County. Historic downtown and family neighborhoods.',
  },
  {
    name: 'Woodstock',
    slug: 'woodstock',
    region: 'north',
    county: 'Cherokee',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Woodstock features a vibrant downtown with boutique shopping, restaurants, and live music. The area combines small-town charm with modern amenities and excellent schools.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1350,
      averageRent2BR: 1700,
      averageRent3BR: 2300,
      averageRent4BR: 2950,
      averageVacancyRate: 3.9,
      averageDaysOnMarket: 11,
      propertiesManaged: 14,
    },
    topSchools: [
      { schoolName: 'Arnold Mill Elementary', schoolType: 'elementary', rating: 9 },
      { schoolName: 'Woodstock High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '32 minutes',
      commuteToDowntown: '40 minutes',
      commuteToAirport: '50 minutes',
      commuteToPerimeterMall: '22 minutes',
    },
    martaAccess: 'none',
    metaDescription:
      'Woodstock property management in vibrant downtown area. Boutique shopping and family living.',
  },
  {
    name: 'Norcross',
    slug: 'norcross',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Norcross is a diverse, walkable city with a historic downtown, international restaurants, and convenient access to major highways. The area is popular with young professionals.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1350,
      averageRent2BR: 1700,
      averageRent3BR: 2250,
      averageRent4BR: 2850,
      averageVacancyRate: 4.0,
      averageDaysOnMarket: 12,
      propertiesManaged: 15,
    },
    topSchools: [
      { schoolName: 'Summerour Middle School', schoolType: 'middle', rating: 7 },
      { schoolName: 'Norcross High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '25 minutes',
      commuteToDowntown: '30 minutes',
      commuteToAirport: '40 minutes',
      commuteToPerimeterMall: '15 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Norcross property management in walkable downtown. Diverse community with international flavor.',
  },
  {
    name: 'Snellville',
    slug: 'snellville',
    region: 'east',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Snellville is a family-oriented community with affordable housing, good schools, and convenient highway access. The area offers a suburban lifestyle with close proximity to Atlanta.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1250,
      averageRent2BR: 1550,
      averageRent3BR: 2100,
      averageRent4BR: 2700,
      averageVacancyRate: 4.6,
      averageDaysOnMarket: 14,
      propertiesManaged: 11,
    },
    topSchools: [
      { schoolName: 'Shiloh Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Shiloh High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '30 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '42 minutes',
      commuteToPerimeterMall: '28 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Snellville property management with affordable family housing. Convenient East Atlanta location.',
  },
  {
    name: 'Lithonia',
    slug: 'lithonia',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Lithonia offers affordable housing options and convenient access to Stone Mountain Park. The area is developing with new businesses and improving amenities.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1100,
      averageRent2BR: 1400,
      averageRent3BR: 1850,
      averageRent4BR: 2400,
      averageVacancyRate: 5.0,
      averageDaysOnMarket: 16,
      propertiesManaged: 8,
    },
    topSchools: [
      { schoolName: 'Lithonia Elementary', schoolType: 'elementary', rating: 6 },
      { schoolName: 'Lithonia High School', schoolType: 'high', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '32 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '40 minutes',
      commuteToPerimeterMall: '35 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Lithonia property management near Stone Mountain. Affordable East Atlanta housing options.',
  },
  {
    name: 'Lilburn',
    slug: 'lilburn',
    region: 'north',
    county: 'Gwinnett',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Lilburn is a diverse community with a historic downtown, affordable housing, and good schools. The area offers convenient access to major highways and shopping.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1300,
      averageRent2BR: 1600,
      averageRent3BR: 2150,
      averageRent4BR: 2750,
      averageVacancyRate: 4.4,
      averageDaysOnMarket: 13,
      propertiesManaged: 12,
    },
    topSchools: [
      { schoolName: 'Camp Creek Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'Berkmar High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '28 minutes',
      commuteToDowntown: '33 minutes',
      commuteToAirport: '43 minutes',
      commuteToPerimeterMall: '22 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Lilburn property management in diverse Gwinnett community. Affordable housing with highway access.',
  },
  {
    name: 'Powder Springs',
    slug: 'powder-springs',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Powder Springs is a growing community with affordable housing, good schools, and convenient access to I-20 and I-285. The area is popular with families and first-time homebuyers.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1200,
      averageRent2BR: 1500,
      averageRent3BR: 2050,
      averageRent4BR: 2650,
      averageVacancyRate: 4.5,
      averageDaysOnMarket: 14,
      propertiesManaged: 9,
    },
    topSchools: [
      { schoolName: 'Varner Elementary', schoolType: 'elementary', rating: 7 },
      { schoolName: 'McEachern High School', schoolType: 'high', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '28 minutes',
      commuteToDowntown: '35 minutes',
      commuteToAirport: '45 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Powder Springs property management with affordable family housing. Growing West Atlanta community.',
  },
  {
    name: 'Austell',
    slug: 'austell',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Austell is a diverse, affordable community with convenient access to Six Flags and major highways. The area is experiencing growth with new development and improving amenities.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1150,
      averageRent2BR: 1450,
      averageRent3BR: 1950,
      averageRent4BR: 2500,
      averageVacancyRate: 4.8,
      averageDaysOnMarket: 15,
      propertiesManaged: 8,
    },
    topSchools: [
      { schoolName: 'Garrett Middle School', schoolType: 'middle', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '25 minutes',
      commuteToDowntown: '30 minutes',
      commuteToAirport: '38 minutes',
      commuteToPerimeterMall: '22 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Austell property management near Six Flags. Affordable West Atlanta rentals.',
  },
  {
    name: 'Mableton',
    slug: 'mableton',
    region: 'west',
    county: 'Cobb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Mableton is a diverse, unincorporated community with affordable housing and convenient access to both Atlanta and Marietta. The area offers a suburban lifestyle with urban proximity.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1200,
      averageRent2BR: 1500,
      averageRent3BR: 2000,
      averageRent4BR: 2600,
      averageVacancyRate: 4.6,
      averageDaysOnMarket: 14,
      propertiesManaged: 10,
    },
    topSchools: [
      { schoolName: 'Mableton Elementary', schoolType: 'elementary', rating: 6 },
      { schoolName: 'Pebblebrook High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '22 minutes',
      commuteToDowntown: '28 minutes',
      commuteToAirport: '35 minutes',
      commuteToPerimeterMall: '20 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Mableton property management in affordable West Atlanta community. Convenient to downtown.',
  },
  {
    name: 'Grant Park',
    slug: 'grant-park',
    region: 'central',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Grant Park is a historic intown neighborhood surrounding the park and zoo of the same name. The area features Victorian homes, walkable streets, and a strong sense of community.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1600,
      averageRent2BR: 2100,
      averageRent3BR: 2850,
      averageRent4BR: 3600,
      averageVacancyRate: 3.2,
      averageDaysOnMarket: 8,
      propertiesManaged: 16,
    },
    topSchools: [
      { schoolName: 'Parkside Elementary', schoolType: 'elementary', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '12 minutes',
      commuteToDowntown: '8 minutes',
      commuteToAirport: '18 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Grant Park property management in historic intown neighborhood. Victorian homes near zoo.',
  },
  {
    name: 'Old Fourth Ward',
    slug: 'old-fourth-ward',
    region: 'central',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Old Fourth Ward is a rapidly developing intown neighborhood along the BeltLine with trendy restaurants, Ponce City Market, and modern apartments. The area is popular with young professionals.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1850,
      averageRent2BR: 2450,
      averageRent3BR: 3300,
      averageRent4BR: 4200,
      averageVacancyRate: 2.7,
      averageDaysOnMarket: 6,
      propertiesManaged: 28,
    },
    topSchools: [
      { schoolName: 'Inman Middle School', schoolType: 'middle', rating: 7 },
      { schoolName: 'Grady High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '8 minutes',
      commuteToDowntown: '10 minutes',
      commuteToAirport: '22 minutes',
      commuteToPerimeterMall: '22 minutes',
    },
    martaAccess: 'rail-walk',
    metaDescription:
      'Old Fourth Ward property management on the BeltLine. Modern apartments and urban lifestyle.',
  },
  {
    name: 'Inman Park',
    slug: 'inman-park',
    region: 'central',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Inman Park is Atlanta's first planned suburb, featuring beautifully restored Victorian homes, tree-lined streets, and the vibrant Krog Street Market. The neighborhood offers urban living with historic charm.",
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1750,
      averageRent2BR: 2300,
      averageRent3BR: 3100,
      averageRent4BR: 3950,
      averageVacancyRate: 2.9,
      averageDaysOnMarket: 7,
      propertiesManaged: 14,
    },
    topSchools: [
      { schoolName: 'Inman Middle School', schoolType: 'middle', rating: 7 },
      { schoolName: 'Grady High School', schoolType: 'high', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '10 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '23 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Inman Park property management in historic Victorian neighborhood. BeltLine access and Krog Street Market.',
  },
  {
    name: 'Candler Park',
    slug: 'candler-park',
    region: 'central',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Candler Park is an eclectic, walkable neighborhood with a strong community feel, bungalow homes, and local businesses. The area attracts artists, young families, and urban professionals.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1650,
      averageRent2BR: 2150,
      averageRent3BR: 2900,
      averageRent4BR: 3700,
      averageVacancyRate: 3.1,
      averageDaysOnMarket: 8,
      propertiesManaged: 12,
    },
    topSchools: [
      { schoolName: 'Mary Lin Elementary', schoolType: 'elementary', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '12 minutes',
      commuteToDowntown: '15 minutes',
      commuteToAirport: '23 minutes',
      commuteToPerimeterMall: '24 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Candler Park property management in eclectic intown neighborhood. Walkable community with MARTA.',
  },
  {
    name: 'East Atlanta Village',
    slug: 'east-atlanta-village',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'East Atlanta Village is a funky, artistic neighborhood with a thriving restaurant and bar scene. The area is known for its live music venues, local businesses, and creative community.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1550,
      averageRent2BR: 2000,
      averageRent3BR: 2700,
      averageRent4BR: 3400,
      averageVacancyRate: 3.5,
      averageDaysOnMarket: 9,
      propertiesManaged: 15,
    },
    topSchools: [
      { schoolName: 'Parkside Elementary', schoolType: 'elementary', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '15 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '18 minutes',
      commuteToPerimeterMall: '28 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'East Atlanta Village property management in artistic neighborhood. Live music and creative community.',
  },
  {
    name: 'West End',
    slug: 'west-end',
    region: 'south',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'West End is a historic neighborhood with Victorian homes, convenient MARTA access, and growing development. The area is experiencing revitalization with new restaurants and businesses.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1300,
      averageRent2BR: 1650,
      averageRent3BR: 2200,
      averageRent4BR: 2800,
      averageVacancyRate: 4.2,
      averageDaysOnMarket: 12,
      propertiesManaged: 11,
    },
    topSchools: [
      { schoolName: 'Young Middle School', schoolType: 'middle', rating: 5 },
    ],
    commuteTimes: {
      commuteToMidtown: '15 minutes',
      commuteToDowntown: '10 minutes',
      commuteToAirport: '15 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'West End property management in historic revitalizing neighborhood. MARTA access and Victorian homes.',
  },
  {
    name: 'Edgewood',
    slug: 'edgewood',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Edgewood is a rapidly developing neighborhood with trendy restaurants, breweries, and the Eastside BeltLine Trail. The area is popular with young professionals and artists.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1600,
      averageRent2BR: 2100,
      averageRent3BR: 2850,
      averageRent4BR: 3600,
      averageVacancyRate: 3.3,
      averageDaysOnMarket: 8,
      propertiesManaged: 13,
    },
    topSchools: [
      { schoolName: 'Inman Middle School', schoolType: 'middle', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '12 minutes',
      commuteToDowntown: '10 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Edgewood property management on the BeltLine. Trendy restaurants and urban living.',
  },
  {
    name: 'Ormewood Park',
    slug: 'ormewood-park',
    region: 'south',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Ormewood Park is a quiet, family-friendly neighborhood with bungalow homes, tree-lined streets, and convenient access to I-75/85. The area is experiencing growth while maintaining its residential character.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1850,
      averageRent3BR: 2500,
      averageRent4BR: 3200,
      averageVacancyRate: 3.7,
      averageDaysOnMarket: 10,
      propertiesManaged: 10,
    },
    topSchools: [
      { schoolName: 'Parkside Elementary', schoolType: 'elementary', rating: 7 },
    ],
    commuteTimes: {
      commuteToMidtown: '15 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '27 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Ormewood Park property management in quiet family neighborhood. Bungalow homes near downtown.',
  },
  {
    name: 'Kirkwood',
    slug: 'kirkwood',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Kirkwood is a diverse, walkable neighborhood with bungalow homes, local businesses, and strong community involvement. The area is on the BeltLine Eastside Trail with convenient urban access.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1550,
      averageRent2BR: 2000,
      averageRent3BR: 2700,
      averageRent4BR: 3400,
      averageVacancyRate: 3.4,
      averageDaysOnMarket: 9,
      propertiesManaged: 11,
    },
    topSchools: [
      { schoolName: 'Burgess-Peterson Academy', schoolType: 'elementary', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '14 minutes',
      commuteToDowntown: '12 minutes',
      commuteToAirport: '22 minutes',
      commuteToPerimeterMall: '26 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Kirkwood property management on the BeltLine. Diverse walkable neighborhood near downtown.',
  },
  {
    name: 'Reynoldstown',
    slug: 'reynoldstown',
    region: 'east',
    county: 'Fulton',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Reynoldstown is an affordable intown neighborhood on the BeltLine with growing development. The area features bungalow homes, local businesses, and convenient access to downtown.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1500,
      averageRent2BR: 1950,
      averageRent3BR: 2650,
      averageRent4BR: 3350,
      averageVacancyRate: 3.6,
      averageDaysOnMarket: 10,
      propertiesManaged: 9,
    },
    topSchools: [
      { schoolName: 'Benteen Elementary', schoolType: 'elementary', rating: 6 },
    ],
    commuteTimes: {
      commuteToMidtown: '13 minutes',
      commuteToDowntown: '10 minutes',
      commuteToAirport: '20 minutes',
      commuteToPerimeterMall: '25 minutes',
    },
    martaAccess: 'bus',
    metaDescription:
      'Reynoldstown property management on the BeltLine. Affordable intown living near downtown.',
  },
  {
    name: 'Avondale Estates',
    slug: 'avondale-estates',
    region: 'east',
    county: 'DeKalb',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Avondale Estates is a unique Tudor-style village with a charming downtown, strong community, and tree-lined streets. The small city offers walkability and proximity to Decatur.',
              },
            ],
          },
        ],
      },
    },
    marketData: {
      averageRent1BR: 1450,
      averageRent2BR: 1850,
      averageRent3BR: 2500,
      averageRent4BR: 3200,
      averageVacancyRate: 3.8,
      averageDaysOnMarket: 10,
      propertiesManaged: 8,
    },
    topSchools: [
      { schoolName: 'Avondale Elementary', schoolType: 'elementary', rating: 8 },
    ],
    commuteTimes: {
      commuteToMidtown: '18 minutes',
      commuteToDowntown: '20 minutes',
      commuteToAirport: '30 minutes',
      commuteToPerimeterMall: '24 minutes',
    },
    martaAccess: 'rail-near',
    metaDescription:
      'Avondale Estates property management in Tudor-style village. Walkable downtown with MARTA access.',
  },
]

const seedNeighborhoods = async () => {
  const payload = await getPayload({ config })

  console.log('🏘️  Seeding Metro Atlanta neighborhoods...\n')

  let created = 0
  let updated = 0
  let skipped = 0

  for (const neighborhood of neighborhoods) {
    try {
      const existing = await payload.find({
        collection: 'neighborhoods',
        where: {
          slug: {
            equals: neighborhood.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'neighborhoods',
          id: existing.docs[0].id,
          data: {
            ...neighborhood,
            _status: 'published',
          },
        })
        console.log(`✅ Updated: ${neighborhood.name}`)
        updated++
      } else {
        await payload.create({
          collection: 'neighborhoods',
          data: {
            ...neighborhood,
            _status: 'published',
          },
        })
        console.log(`✅ Created: ${neighborhood.name}`)
        created++
      }
    } catch (error) {
      console.error(`❌ Error with ${neighborhood.name}:`, error)
      skipped++
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Created: ${created}`)
  console.log(`   Updated: ${updated}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Total: ${neighborhoods.length}`)
  console.log(`\n✨ Neighborhoods seeded successfully!`)
  console.log(`   View at /areas-we-serve`)

  process.exit(0)
}

seedNeighborhoods()
