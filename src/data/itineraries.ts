// TEMPORARY source for the planner seed. scripts/generatePlannerSeed.ts turns this
// into supabase/seed_planner.sql. Edit here, regenerate, and re-run the SQL.
// TODO: verify every route, activity and seasonal note before publishing.

export interface ItineraryStopSeed {
  destinationSlug: string
  day: number
  sequence: number
  description: string
}

export interface ItinerarySeed {
  slug: string
  title: string
  description: string
  durationDays: number
  coverImage: string
  stops: ItineraryStopSeed[]
}

export const itinerarySeed: ItinerarySeed[] = [
  // ---------------------------------------------------------------- 1 day
  {
    slug: 'modhera-and-patan-day-trip',
    title: 'Modhera and Patan Day Trip',
    description:
      'Two 11th-century Chaulukya monuments in one day: a Sun Temple and a famous stepwell. Best between October and March.',
    durationDays: 1,
    coverImage: 'destinations/modhera-sun-temple.jpg',
    stops: [
      {
        destinationSlug: 'modhera-sun-temple',
        day: 1,
        sequence: 1,
        description:
          'Start with the Sun Temple. Look closely at the carved assembly hall and walk around the stepped tank, the Surya Kund, in the morning light.',
      },
      {
        destinationSlug: 'rani-ki-vav',
        day: 1,
        sequence: 2,
        description:
          'Continue to Patan and walk down the levels of the stepwell, looking closely at the carved panels. Carry water and wear comfortable shoes.',
      },
    ],
  },
  {
    slug: 'champaner-and-vadodara-day-trip',
    title: 'Champaner and Vadodara Day Trip',
    description:
      'A Sultanate-era archaeological park in the morning and a grand royal palace later in the day. Best between October and February.',
    durationDays: 1,
    coverImage: 'destinations/champaner-pavagadh.jpg',
    stops: [
      {
        destinationSlug: 'champaner-pavagadh',
        day: 1,
        sequence: 1,
        description:
          "Start early. Walk through the old city's mosques, gateways and ruins, and climb Pavagadh Hill if time allows. Check whether the ropeway is operating.",
      },
      {
        destinationSlug: 'laxmi-vilas-palace',
        day: 1,
        sequence: 2,
        description:
          'Continue to Vadodara and admire the palace and its grounds. Check the visiting arrangements first, as part of the complex is a private residence.',
      },
    ],
  },

  // --------------------------------------------------------------- 2 days
  {
    slug: 'gir-and-somnath-weekend',
    title: 'Gir and Somnath Weekend',
    description:
      'Asiatic lions on the first day and a seaside pilgrimage temple on the second. Gir is usually closed during the monsoon, so plan for December to March.',
    durationDays: 2,
    coverImage: 'destinations/gir-national-park.jpg',
    stops: [
      {
        destinationSlug: 'gir-national-park',
        day: 1,
        sequence: 1,
        description:
          'Arrive and take a guided jeep safari through the forest. Safaris usually need advance booking through official channels, so check the current rules.',
      },
      {
        destinationSlug: 'somnath-temple',
        day: 2,
        sequence: 1,
        description:
          'Visit Somnath Temple in the morning, attend the aarti if the timing allows, and walk along the seashore beside the temple.',
      },
    ],
  },
  {
    slug: 'kutch-mandvi-and-the-rann',
    title: 'Kutch: Mandvi and the White Rann',
    description:
      'A historic port town and beach, then the white salt desert. Best from November to February.',
    durationDays: 2,
    coverImage: 'destinations/rann-of-kutch.jpg',
    stops: [
      {
        destinationSlug: 'mandvi-beach',
        day: 1,
        sequence: 1,
        description:
          'See the traditional wooden shipbuilding yards and the beach, visit Vijay Vilas Palace if it is open, and stay for the sunset.',
      },
      {
        destinationSlug: 'rann-of-kutch',
        day: 2,
        sequence: 1,
        description:
          'Allow time for the road journey. Watch the sun set over the white salt flats, and check any permit rules near the border and the Rann Utsav dates before you go.',
      },
    ],
  },

  // --------------------------------------------------------------- 3 days
  {
    slug: 'junagadh-gir-and-somnath',
    title: 'Junagadh, Gir and Somnath',
    description:
      'A classic Saurashtra route from an ancient fort city, through lion country, to a seaside temple. Best between December and March, when Gir is open.',
    durationDays: 3,
    coverImage: 'destinations/junagadh-uparkot-fort.jpg',
    stops: [
      {
        destinationSlug: 'junagadh-uparkot-fort',
        day: 1,
        sequence: 1,
        description:
          "Explore Uparkot Fort, its rock-cut Buddhist caves and its old stepwells, and see Mahabat Maqbara. If time allows, visit Ashoka's rock edicts near Mount Girnar.",
      },
      {
        destinationSlug: 'gir-national-park',
        day: 2,
        sequence: 1,
        description:
          'Travel to Sasan Gir and take a guided jeep safari. Visit the Devalia Safari Park if time allows.',
      },
      {
        destinationSlug: 'somnath-temple',
        day: 3,
        sequence: 1,
        description:
          'Visit Somnath Temple and the seashore beside it, and see the Triveni Sangam nearby.',
      },
    ],
  },
  {
    slug: 'heritage-highlights-ahmedabad-to-vadodara',
    title: 'Heritage Highlights: Ahmedabad to Vadodara',
    description:
      "Three days through Gujarat's best-known heritage: a walled city, two Chaulukya monuments, a Sultanate-era archaeological park and a royal palace. Best between October and February.",
    durationDays: 3,
    coverImage: 'destinations/ahmedabad-heritage-city.jpg',
    stops: [
      {
        destinationSlug: 'ahmedabad-heritage-city',
        day: 1,
        sequence: 1,
        description:
          "Take a heritage walk through the old city: Bhadra Fort, the Teen Darwaza gateway, Jama Masjid, Sidi Saiyyed Mosque and the pols. Visit Manek Chowk in the evening.",
      },
      {
        destinationSlug: 'modhera-sun-temple',
        day: 2,
        sequence: 1,
        description:
          'Start with the Sun Temple and its stepped tank, which lies on the way to Patan.',
      },
      {
        destinationSlug: 'rani-ki-vav',
        day: 2,
        sequence: 2,
        description: 'Continue to Patan for the carved stepwell, then return to Ahmedabad.',
      },
      {
        destinationSlug: 'champaner-pavagadh',
        day: 3,
        sequence: 1,
        description:
          'Travel towards Vadodara and visit the Champaner-Pavagadh archaeological park. Start early, as there is a lot of walking.',
      },
      {
        destinationSlug: 'laxmi-vilas-palace',
        day: 3,
        sequence: 2,
        description:
          'Finish in Vadodara at Laxmi Vilas Palace. Check the visiting arrangements beforehand.',
      },
    ],
  },

  // --------------------------------------------------------------- 5 days
  {
    slug: 'saurashtra-and-the-coast',
    title: 'Saurashtra and the Coast',
    description:
      'Five days from Junagadh to the Gulf of Kutch: a fort city, lions, two great temples and a marine park. Best between December and February.',
    durationDays: 5,
    coverImage: 'destinations/somnath-temple.jpg',
    stops: [
      {
        destinationSlug: 'junagadh-uparkot-fort',
        day: 1,
        sequence: 1,
        description:
          'Explore Uparkot Fort, its caves and stepwells, and the old city. Mount Girnar is nearby if you want a longer day.',
      },
      {
        destinationSlug: 'gir-national-park',
        day: 2,
        sequence: 1,
        description:
          'Take a guided jeep safari in Gir. Book in advance and check that the park is open.',
      },
      {
        destinationSlug: 'somnath-temple',
        day: 3,
        sequence: 1,
        description:
          'Visit Somnath Temple and walk along the seashore. A quieter day to rest before the long drive.',
      },
      {
        destinationSlug: 'dwarkadhish-temple',
        day: 4,
        sequence: 1,
        description:
          'Allow most of the day for the road journey from Somnath. Attend the darshan or aarti at Dwarkadhish Temple and walk to the Gomti Ghat.',
      },
      {
        destinationSlug: 'marine-national-park',
        day: 5,
        sequence: 1,
        description:
          'Travel towards Jamnagar. Visits to the Marine National Park usually need forest department permission and are planned around the tides, so check the rules in advance.',
      },
    ],
  },
  {
    slug: 'heritage-to-the-narmada',
    title: 'Heritage to the Narmada',
    description:
      'Five days from the walled city of Ahmedabad to the Statue of Unity, taking in stepwells, temples, a Sultanate-era city and a palace on the way. Best between October and February.',
    durationDays: 5,
    coverImage: 'destinations/statue-of-unity.jpg',
    stops: [
      {
        destinationSlug: 'ahmedabad-heritage-city',
        day: 1,
        sequence: 1,
        description:
          'Take a heritage walk through the old city, and eat at Manek Chowk in the evening.',
      },
      {
        destinationSlug: 'modhera-sun-temple',
        day: 2,
        sequence: 1,
        description: 'Begin with the Sun Temple and its stepped tank.',
      },
      {
        destinationSlug: 'rani-ki-vav',
        day: 2,
        sequence: 2,
        description: 'Continue to the stepwell at Patan, then return towards Ahmedabad.',
      },
      {
        destinationSlug: 'champaner-pavagadh',
        day: 3,
        sequence: 1,
        description:
          'Travel towards Vadodara and spend the day at the Champaner-Pavagadh archaeological park.',
      },
      {
        destinationSlug: 'laxmi-vilas-palace',
        day: 4,
        sequence: 1,
        description:
          'Visit Laxmi Vilas Palace and its grounds, and see more of Vadodara. Check the visiting arrangements first.',
      },
      {
        destinationSlug: 'statue-of-unity',
        day: 5,
        sequence: 1,
        description:
          'Travel to Kevadia for the Statue of Unity and the view of the Narmada river. Check the official website for current opening hours.',
      },
      {
        destinationSlug: 'zarwani-waterfall',
        day: 5,
        sequence: 2,
        description:
          'If time and season allow, add Zarwani Waterfall in the same district. It is at its best between July and October.',
      },
    ],
  },
]