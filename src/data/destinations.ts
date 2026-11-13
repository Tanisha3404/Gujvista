import type { Destination } from '../types/destination'

// TEMPORARY seed data for Phases 1-2. It moves to supabase/seed.sql in Phase 3.
// TODO: verify every fact and coordinate before publishing.
export const destinationSeed: Destination[] = [
  {
    id: 'dest-1',
    name: 'Statue of Unity',
    slug: 'statue-of-unity',
    district: 'Narmada',
    categoryId: 'cat-1',
    shortDescription:
      'A 182-metre statue of Sardar Vallabhbhai Patel rising above the Narmada river.',
    fullDescription:
      "The Statue of Unity stands near Kevadia in the Narmada district and honours Sardar Vallabhbhai Patel, a leader of India's independence movement and the country's first Deputy Prime Minister. At 182 metres it is the tallest statue in the world, and it overlooks the Narmada river and the Sardar Sarovar Dam.",
    mainImage: 'destinations/statue-of-unity.jpg',
    bestTimeToVisit: 'October to March, when the weather is cooler.',
    latitude: 21.838,
    longitude: 73.719,
    travelTips:
      'Check the official website for current opening hours and visiting arrangements before you travel. Wear comfortable walking shoes and carry water.',
    historicalSignificance:
      "The statue honours Sardar Vallabhbhai Patel, who played a central role in bringing India's princely states together after independence and is often remembered as the 'Iron Man of India'. It was inaugurated in October 2018 on the occasion of his birth anniversary.",
    majorAttractions: [
      'The statue itself, with a viewing gallery',
      'The Narmada river and the Sardar Sarovar Dam nearby',
      'Gardens and other visitor attractions around the Kevadia area',
    ],
    thingsToDo: [
      'See the statue up close and enjoy the view of the Narmada from the viewing gallery',
      'Look out over the Sardar Sarovar Dam from nearby',
      'Walk through the landscaped gardens around the site',
    ],
  },
  {
    id: 'dest-2',
    name: 'Rann of Kutch',
    slug: 'rann-of-kutch',
    district: 'Kutch',
    categoryId: 'cat-5',
    shortDescription:
      'A vast white salt desert stretching to the horizon, known for its winter festival.',
    fullDescription:
      'The Rann of Kutch is a large seasonal salt marsh in the Kutch district that dries into a glittering white plain after the monsoon. Visitors come for its wide, open landscape, its sunsets, and the Rann Utsav, a winter cultural festival with local music, crafts and food.',
    mainImage: 'destinations/rann-of-kutch.jpg',
    bestTimeToVisit: 'November to February. The Rann is flooded during the monsoon.',
    latitude: 23.83, // approximate, near Dhordo. VERIFY.
    longitude: 69.68,
    travelTips:
      'Some areas close to the international border may need a permit, so check the current rules locally before you go. Carry sun protection and plenty of water, as there is little shade.',
    historicalSignificance:
      'The Great Rann of Kutch is one of the largest salt deserts in the world. It floods during the monsoon and dries into a white salt crust afterwards, and it has shaped life in Kutch for generations. The region is known for its embroidery, block printing and other handicrafts, and for the communities that live around the Rann.',
    majorAttractions: [
      'The white salt flats near Dhordo',
      'Rann Utsav, the winter cultural festival',
      'Kala Dungar, a hilltop viewpoint with views over the Rann',
    ],
    thingsToDo: [
      'Watch the sun set over the white salt flats',
      'Attend the Rann Utsav if you visit in winter',
      'Look for local handicrafts such as embroidery and block-printed textiles',
    ],
  },
  {
    id: 'dest-3',
    name: 'Somnath Temple',
    slug: 'somnath-temple',
    district: 'Gir Somnath',
    categoryId: 'cat-2',
    shortDescription:
      'A Shiva temple on the Arabian Sea coast, counted among the twelve Jyotirlingas.',
    fullDescription:
      'Somnath Temple stands at Prabhas Patan on the Arabian Sea coast and is revered as one of the twelve Jyotirlinga shrines of Lord Shiva. The temple has been destroyed and rebuilt several times over the centuries. The present structure, built in the Chaulukya style, was completed in 1951.',
    mainImage: 'destinations/somnath-temple.jpg',
    bestTimeToVisit: 'October to March. Early mornings and evenings are especially pleasant by the sea.',
    latitude: 20.888,
    longitude: 70.401,
    travelTips:
      'Dress modestly and expect security checks at the entrance. Check the official temple website for aarti timings.',
    historicalSignificance:
      'Somnath is often regarded as the first of the twelve Jyotirlinga shrines of Lord Shiva. The temple at Prabhas Patan has been damaged and rebuilt several times over the centuries, and the present temple was completed in 1951. For many devotees it stands as a symbol of resilience.',
    majorAttractions: [
      'The main Somnath Temple, built in the Chaulukya style',
      'The seashore beside the temple',
      'Triveni Sangam, where rivers meet near the sea',
    ],
    thingsToDo: [
      'Attend the aarti if your timing allows',
      'Walk along the seashore next to the temple',
      'Visit the Triveni Sangam nearby',
    ],
  },
  {
    id: 'dest-4',
    name: 'Gir National Park',
    slug: 'gir-national-park',
    district: 'Gir Somnath', // The park spans more than one district. VERIFY what to show.
    categoryId: 'cat-4',
    shortDescription:
      'The last natural home of the Asiatic lion, with dry forest and guided safaris.',
    fullDescription:
      'Gir National Park and Wildlife Sanctuary, around Sasan Gir, is the only place in the wild where Asiatic lions live. Its dry deciduous forest is also home to leopards, deer, crocodiles and many bird species, and guided jeep safaris are the main way to see it.',
    mainImage: 'destinations/gir-national-park.jpg',
    bestTimeToVisit:
      'December to March. The park is usually closed during the monsoon months, so check dates before you plan.',
    latitude: 21.12, // approximate, near Sasan Gir. VERIFY.
    longitude: 70.8,
    travelTips:
      'Safaris usually need to be booked in advance through official channels, so check the current booking rules before you travel.',
    historicalSignificance:
      'Gir is the last natural home of the Asiatic lion. The species once ranged across a much wider area but was reduced to a very small number, and protection and conservation efforts, with the involvement of local communities such as the Maldhari herders, have helped the population recover.',
    majorAttractions: [
      'Asiatic lions in their natural habitat',
      'Leopards, deer and many bird species',
      'Kamleshwar Dam, a large reservoir inside the forest',
      'Devalia Safari Park near Sasan Gir',
    ],
    thingsToDo: [
      'Take a guided jeep safari through the forest',
      'Visit the Devalia Safari Park',
      'Go birdwatching around the park',
    ],
  },
  {
    id: 'dest-5',
    name: 'Rani ki Vav',
    slug: 'rani-ki-vav',
    district: 'Patan',
    categoryId: 'cat-1',
    shortDescription:
      'An 11th-century stepwell with finely carved panels, a UNESCO World Heritage Site.',
    fullDescription:
      'Rani ki Vav is an elaborate stepwell at Patan on the banks of the Saraswati river, built in the 11th century. Its walls and pillars carry hundreds of carved sculptures, many depicting Vishnu in his avatars. It was inscribed as a UNESCO World Heritage Site in 2014.',
    mainImage: 'destinations/rani-ki-vav.jpg',
    bestTimeToVisit: 'October to March. Mornings give the best light for the carvings.',
    latitude: 23.859,
    longitude: 72.102,
    travelTips:
      'Wear comfortable footwear, as there are many steps. Carry water and sun protection.',
    historicalSignificance:
      "Rani ki Vav was built in the 11th century during the Chaulukya (Solanki) dynasty and is traditionally said to have been commissioned by Queen Udayamati in memory of her husband, King Bhimdev I. It was later buried under silt from the Saraswati river and was excavated in the 20th century. It is designed as an inverted temple, honouring the sacredness of water.",
    majorAttractions: [
      'Seven levels of stairs with carved pillars and pavilions',
      "Hundreds of sculptures, many showing Vishnu's avatars",
      'The deep well shaft at the western end',
    ],
    thingsToDo: [
      'Walk down the levels and look closely at the carved panels',
      'Visit in the morning for softer light for photographs',
      'Explore the town of Patan, known for patola silk weaving',
    ],
  },
  {
    id: 'dest-6',
    name: 'Saputara',
    slug: 'saputara',
    district: 'Dang',
    categoryId: 'cat-5',
    shortDescription:
      'A cool hill station in the Sahyadri range, green and misty during the monsoon.',
    fullDescription:
      'Saputara is a hill station in the Dang district, set in the Sahyadri range close to the Maharashtra border. It is known for its viewpoints, a lake, forested hills and nearby waterfalls that are at their best in the monsoon.',
    mainImage: 'destinations/saputara.jpg',
    bestTimeToVisit: 'July to September for monsoon greenery, or October to February for cooler weather.',
    latitude: 20.567,
    longitude: 73.75,
    travelTips:
      'Roads can be slippery and visibility low in heavy monsoon rain. Carry rain gear and drive carefully.',
    historicalSignificance:
      "Saputara is said to mean 'abode of serpents', and a serpent is worshipped locally. It lies in the Dang district, which is home to tribal communities and is known for the Dang Darbar festival, held around Holi.",
    majorAttractions: [
      'Saputara Lake',
      'Viewpoints such as Sunset Point and Echo Point',
      'Gira Falls, a waterfall in the area',
    ],
    thingsToDo: [
      'Watch the sunset from a viewpoint',
      'Go boating on Saputara Lake',
      'Visit Gira Falls during or just after the monsoon',
    ],
  },
    {
    id: 'dest-7',
    name: 'Polo Forest',
    slug: 'polo-forest',
    district: 'Sabarkantha',
    categoryId: 'cat-5',
    shortDescription:
      'A quiet forest near Vijaynagar, hiding centuries-old Jain and Hindu temples.',
    fullDescription:
      'Polo Forest lies near Vijaynagar in the Sabarkantha district, along the Harnav river. Its dense woodland shelters clusters of centuries-old Jain and Hindu temples, which makes it a favourite for walking, photography and quiet getaways, especially after the monsoon.',
    mainImage: 'destinations/polo-forest.jpg',
    bestTimeToVisit: 'July to October, when the forest is green after the rains.',
    latitude: 23.7, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 73.3,
    travelTips:
      'Wear sturdy walking shoes, as paths can be uneven and slippery after rain. Carry water and check local conditions before you go.',
        historicalSignificance:
      'The forest holds the ruins of an old settlement and several clusters of Jain and Hindu temples, believed to date from roughly the 10th to the 15th centuries. The ruins, set among trees beside the Harnav river, are among the main reasons visitors come.',
    majorAttractions: [
      'Clusters of Jain and Hindu temples hidden among the trees',
      'The Harnav river and dam',
      'Sharneshwar Mahadev Temple',
    ],
    thingsToDo: [
      'Walk or trek among the ruins and temple clusters',
      'Photograph the forest and temples after the monsoon',
      'Check whether the annual Polo Festival is on during your visit',
    ],
  },
  {
    id: 'dest-8',
    name: 'Zarwani Waterfall',
    slug: 'zarwani-waterfall',
    district: 'Narmada',
    categoryId: 'cat-5',
    shortDescription: 'A forest waterfall in the Narmada district that comes alive in the monsoon.',
    fullDescription:
      'Zarwani Waterfall lies in the forested hills of the Narmada district. It is best seen during and just after the monsoon, when the water is flowing and the surrounding forest is at its greenest.',
    mainImage: 'destinations/zarwani-waterfall.jpg',
    bestTimeToVisit: 'July to October, during and just after the monsoon.',
    latitude: 21.7, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 73.6,
    travelTips:
      'Rocks and paths near the water can be very slippery. Carry rain gear and take care, especially after heavy rain.',
        historicalSignificance:
      'Zarwani lies in a forested part of the Narmada district, an area that is home to tribal communities and is better known for its natural scenery than for historical monuments. The waterfall is a seasonal attraction, at its fullest during and after the monsoon.',
    majorAttractions: [
      'The waterfall itself, strongest in and after the monsoon',
      'The surrounding forest and hills',
      'Other sights elsewhere in the Narmada district, such as the Statue of Unity',
    ],
    thingsToDo: [
      'Visit during or just after the monsoon, when the water is flowing',
      'Enjoy the forest scenery and take photographs',
      'Combine the trip with the Statue of Unity, also in the Narmada district',
    ],
  },
  {
    id: 'dest-9',
    name: 'Dholavira',
    slug: 'dholavira',
    district: 'Kutch',
    categoryId: 'cat-1',
    shortDescription:
      'The remains of a Harappan city in the Rann of Kutch, a UNESCO World Heritage Site.',
    fullDescription:
      'Dholavira is an archaeological site on Khadir island in the Rann of Kutch, holding the remains of a Harappan (Indus Valley) city. It was inscribed as a UNESCO World Heritage Site in 2021 and is known for its planned layout and its sophisticated system of water conservation.',
    mainImage: 'destinations/dholavira.jpg',
    bestTimeToVisit: 'November to February, when the weather is cooler and drier.',
    latitude: 23.887, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 70.215,
    travelTips:
      'There is little shade, so carry sun protection and plenty of water. The area is remote, so check access and local conditions before you travel.',
        historicalSignificance:
      'Dholavira was a major city of the Harappan (Indus Valley) civilisation and was occupied for well over a thousand years, roughly between 3000 and 1500 BCE. It is remarkable for its planned layout and for its large reservoirs and water channels, built in a dry landscape. It was discovered in the late 1960s and added to the UNESCO World Heritage List in 2021.',
    majorAttractions: [
      'The ruins of the citadel, middle town and lower town',
      'The large reservoirs and water channels',
      'The site museum, with finds from the excavations',
      'The Fossil Park nearby',
    ],
    thingsToDo: [
      'Walk through the excavated ruins and see how the city was planned',
      'Visit the site museum',
      'Combine the trip with the Rann of Kutch',
    ],
  },
  {
    id: 'dest-10',
    name: 'Velavadar Blackbuck National Park',
    slug: 'velavadar-blackbuck-national-park',
    district: 'Bhavnagar',
    categoryId: 'cat-4',
    shortDescription: "A grassland park known for its blackbuck, one of India's fastest antelopes.",
    fullDescription:
      "Velavadar Blackbuck National Park in the Bhavnagar district protects one of India's largest stretches of tropical grassland and is best known for its blackbuck antelope. The park is also home to wolves, and large numbers of harriers roost here in the winter.",
    mainImage: 'destinations/velavadar-blackbuck-national-park.jpg',
    bestTimeToVisit:
      'October to March. The park is generally closed during the monsoon, so check opening dates.',
    latitude: 22.0, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 72.0,
    travelTips:
      'Visit early in the morning or late in the afternoon, when animals are most active. Check current entry and safari rules before you travel.',
        historicalSignificance:
      'The grassland at Velavadar was once a royal reserve of the rulers of Bhavnagar and was protected as a national park in the 1970s. It is one of the few places in India where a large area of tropical grassland survives, and it is closely tied to the recovery of the blackbuck.',
    majorAttractions: [
      'Large herds of blackbuck on the open grassland',
      'Indian wolves, which live in the park',
      'Birds such as the lesser florican, and winter roosts of harriers',
    ],
    thingsToDo: [
      'Take a jeep safari early in the morning or late in the afternoon',
      'Look for blackbuck, wolves and grassland birds',
      'Visit in winter, when the harriers gather to roost',
    ],
  },
    {
    id: 'dest-11',
    name: 'Dwarkadhish Temple',
    slug: 'dwarkadhish-temple',
    district: 'Devbhoomi Dwarka',
    categoryId: 'cat-2',
    shortDescription:
      'A major Krishna temple in the coastal town of Dwarka, one of the Char Dham sites.',
    fullDescription:
      'Dwarkadhish Temple stands in the coastal town of Dwarka and is dedicated to Lord Krishna, worshipped here as the king of Dwarka. It is counted among the Char Dham pilgrimage sites and is one of the most important Hindu pilgrimage centres in Gujarat.',
    mainImage: 'destinations/dwarkadhish-temple.jpg',
    bestTimeToVisit: 'October to March. Janmashtami is a major festival here and draws large crowds.',
    latitude: 22.238, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 68.968,
    travelTips:
      'Dress modestly, and expect security checks and long queues during festivals. Check the official temple website for darshan timings.',
    historicalSignificance:
      'Dwarka is traditionally associated with Lord Krishna, who is said in Hindu tradition to have ruled from the city. The temple is counted among the four Char Dham pilgrimage sites, together with Badrinath, Puri and Rameswaram, and Dwarka is also regarded as one of the seven sacred cities of Hinduism. The present temple is centuries old, though tradition places the original shrine far earlier.',
    majorAttractions: [
      'The main temple, with its tall, intricately carved spire',
      'The Gomti Ghat, where the Gomti river meets the sea',
      'Rukmini Devi Temple in Dwarka',
      'Nageshwar Jyotirlinga and Bet Dwarka, both nearby',
    ],
    thingsToDo: [
      'Take part in the darshan and aarti, after checking the timings',
      'Walk down to the Gomti Ghat',
      'Visit Rukmini Devi Temple, Nageshwar Jyotirlinga or Bet Dwarka nearby',
    ],
  },
  {
    id: 'dest-12',
    name: 'Champaner-Pavagadh',
    slug: 'champaner-pavagadh',
    district: 'Panchmahal',
    categoryId: 'cat-1',
    shortDescription:
      'A UNESCO-listed archaeological park of hill fortifications, mosques and temples.',
    fullDescription:
      'The Champaner-Pavagadh Archaeological Park surrounds the hill of Pavagadh and the old city of Champaner, which was a capital of the Gujarat Sultanate in the 15th century. It brings together hill fortifications, palaces, mosques, step wells and temples, and it was inscribed as a UNESCO World Heritage Site in 2004.',
    mainImage: 'destinations/champaner-pavagadh.jpg',
    bestTimeToVisit: 'October to February, when the weather is cooler.',
    latitude: 22.485, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 73.535,
    travelTips:
      'Expect a lot of walking and climbing on uneven ground. Carry water, and check whether the ropeway to the hilltop is operating.',
    historicalSignificance:
      'Champaner became the capital of the Gujarat Sultanate in the late 15th century under Mahmud Begada, who developed it after capturing the hill fortress of Pavagadh. It is notable as a largely unchanged pre-Mughal Islamic city. The same area also holds ancient Hindu and Jain sites, including the Kalika Mata Temple on top of Pavagadh Hill.',
    majorAttractions: [
      'The Jama Masjid of Champaner, known for its carved stonework',
      'Hill fortifications, gateways and step wells',
      'Kalika Mata Temple at the top of Pavagadh Hill',
    ],
    thingsToDo: [
      "Walk through the old city's mosques, gateways and ruins",
      'Climb Pavagadh Hill, or use the ropeway if it is operating',
      'Visit the Kalika Mata Temple at the summit',
    ],
  },
  {
    id: 'dest-13',
    name: 'Modhera Sun Temple',
    slug: 'modhera-sun-temple',
    district: 'Mehsana',
    categoryId: 'cat-1',
    shortDescription:
      'An 11th-century temple to the Sun God, with a grand stepped tank in front.',
    fullDescription:
      'The Sun Temple at Modhera was built in the early 11th century during the Chaulukya dynasty and is dedicated to the Sun God, Surya. It is known for its intricate stone carving and for the large stepped tank, the Surya Kund, in front of the main shrine. A dance festival is held here each January.',
    mainImage: 'destinations/modhera-sun-temple.jpg',
    bestTimeToVisit: 'October to March. Mornings give the best light for photographs.',
    latitude: 23.583, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 72.133,
    travelTips:
      'There is little shade in the grounds, so bring sun protection and water. Check the current opening hours before you travel.',
    historicalSignificance:
      'The temple was built in the early 11th century under the Chaulukya (Solanki) dynasty and is dedicated to Surya, the Sun God. It is often said to be aligned so that the rising sun lights the inner shrine at the equinoxes. Each January the temple grounds host a classical dance festival.',
    majorAttractions: [
      'Surya Kund, the large stepped tank in front of the temple',
      'The carved assembly hall (sabha mandap)',
      'The main shrine hall (guda mandap)',
      'The annual Modhera Dance Festival in January',
    ],
    thingsToDo: [
      'Look closely at the carved pillars and panels in the assembly hall',
      'Walk around the Surya Kund, especially in the morning light',
      'Time your visit with the January dance festival',
      'Pair it with Rani ki Vav in Patan, which is also from the Chaulukya period',
    ],
  },
  {
    id: 'dest-14',
    name: 'Laxmi Vilas Palace',
    slug: 'laxmi-vilas-palace',
    district: 'Vadodara',
    categoryId: 'cat-1',
    shortDescription:
      'A grand Indo-Saracenic palace built for the Gaekwad rulers of Baroda.',
    fullDescription:
      'Laxmi Vilas Palace in Vadodara was built in the late 19th century for the Gaekwad rulers of Baroda, in the Indo-Saracenic style that blends Indian and European architecture. Set in large landscaped grounds, it remains the residence of the former royal family.',
    mainImage: 'destinations/laxmi-vilas-palace.jpg',
    bestTimeToVisit: 'October to March, when the weather is pleasant.',
    latitude: 22.293, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 73.192,
    travelTips:
      'Parts of the complex are still a private residence, so check the current visiting arrangements before you go.',
    historicalSignificance:
      'The palace was built for Maharaja Sayajirao Gaekwad III, a ruler of Baroda known for promoting education and reform, and was completed around 1890. It is often described as one of the largest private residences ever built. Its Indo-Saracenic design combines Indian, Islamic and European architectural styles.',
    majorAttractions: [
      'The palace architecture, with its domes, arches and towers',
      'The landscaped grounds',
      'Maharaja Fateh Singh Museum on the grounds, known for its art collection',
    ],
    thingsToDo: [
      'Admire the architecture from the grounds',
      'Visit the museum, after checking that it is open',
      "Explore Vadodara's other landmarks such as Sayaji Baug and the Baroda Museum",
    ],
    },
  {
    id: 'dest-15',
    name: 'Mandvi Beach',
    slug: 'mandvi-beach',
    district: 'Kutch',
    categoryId: 'cat-3',
    shortDescription:
      'A beach by the historic port town of Mandvi on the Gulf of Kutch.',
    fullDescription:
      'Mandvi Beach lies beside the historic port town of Mandvi on the Gulf of Kutch. The town is known for its traditional wooden shipbuilding yards, and the Vijay Vilas Palace is nearby, which makes the beach a good stop on a trip around Kutch.',
    mainImage: 'destinations/mandvi-beach.jpg',
    bestTimeToVisit: 'October to March, when the weather is cooler.',
    latitude: 22.83, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 69.35,
    travelTips:
      'Swimming conditions change with the tides and currents, so follow local advice and any warning signs.',
    historicalSignificance:
      'Mandvi was for centuries an important port and shipbuilding town in Kutch, and traditional wooden ships are still built by hand in its shipyards beside the river. The town is also home to Vijay Vilas Palace, a former royal summer palace built in the 20th century.',
    majorAttractions: [
      'Mandvi Beach and the Gulf of Kutch coastline',
      'The traditional wooden shipbuilding yards',
      'Vijay Vilas Palace, a former royal summer palace nearby',
      'Kranti Teerth, a memorial to Shyamji Krishna Varma',
    ],
    thingsToDo: [
      'Watch the sunset from the beach',
      'See how wooden ships are built at the shipyards',
      'Visit Vijay Vilas Palace, after checking opening arrangements',
    ],
  },
  {
    id: 'dest-16',
    name: 'Ahmedabad Heritage City',
    slug: 'ahmedabad-heritage-city',
    district: 'Ahmedabad',
    categoryId: 'cat-1',
    shortDescription:
      "India's first UNESCO World Heritage City, with a walled old town of pols and havelis.",
    fullDescription:
      "The historic walled city of Ahmedabad was founded in 1411 by Sultan Ahmed Shah and was inscribed as a UNESCO World Heritage City in 2017. It is known for its pols, the traditional clustered neighbourhoods, along with carved wooden havelis, mosques and temples that reflect the city's mixed heritage.",
    mainImage: 'destinations/ahmedabad-heritage-city.jpg',
    bestTimeToVisit: 'October to March, when walking around the old city is comfortable.',
    latitude: 23.02, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 72.58,
    travelTips:
      'A guided heritage walk is a good way to explore the old city. Wear comfortable shoes and dress modestly at religious sites.',
        historicalSignificance:
      "The walled city was founded in 1411 on the banks of the Sabarmati river by Sultan Ahmed Shah and grew into a major centre of trade and crafts. Its architecture blends Hindu, Jain and Islamic traditions, and its pols, the closely packed residential neighbourhoods with carved wooden havelis, are among its most distinctive features. In 2017 it became India's first city to be inscribed as a UNESCO World Heritage City.",
    majorAttractions: [
      'Bhadra Fort and the Teen Darwaza gateway',
      'Jama Masjid',
      "Sidi Saiyyed Mosque, famous for its carved stone lattice windows",
      'The pols, with their carved wooden havelis and bird-feeding towers',
      'Manek Chowk, a market that comes alive in the evening',
    ],
    thingsToDo: [
      'Join a guided heritage walk through the old city, after checking current arrangements',
      "Look closely at the stone lattice work at Sidi Saiyyed Mosque",
      'Explore the pols and their carved wooden doors and balconies',
      'Visit Sabarmati Ashram, associated with Mahatma Gandhi, elsewhere in the city',
    ],
  },
  {
    id: 'dest-17',
    name: 'Shatrunjaya Hill',
    slug: 'shatrunjaya-hill',
    district: 'Bhavnagar',
    categoryId: 'cat-2',
    shortDescription:
      'A sacred Jain pilgrimage hill near Palitana, crowned with hundreds of temples.',
    fullDescription:
      'Shatrunjaya Hill, near the town of Palitana, is one of the most sacred pilgrimage sites for Jains. Hundreds of marble temples are clustered along its ridges, and pilgrims and visitors reach them by climbing thousands of stone steps.',
    mainImage: 'destinations/shatrunjaya-hill.jpg',
    bestTimeToVisit: 'October to March. Start the climb early in the morning to avoid the heat.',
    latitude: 21.495, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 71.795,
    travelTips:
      'Carry water, wear comfortable footwear, and dress modestly. Rules about items such as leather apply at Jain temples, so check them locally.',
        historicalSignificance:
      'For Jains, Shatrunjaya is one of the holiest pilgrimage sites. According to Jain tradition, many monks attained liberation here, and Rishabhanatha, the first Tirthankara, is closely associated with the hill. The temples were built over many centuries, and many of the present structures date from later periods after earlier temples were damaged.',
    majorAttractions: [
      'Hundreds of marble temples along the ridges of the hill',
      'The main temple dedicated to Adinath (Rishabhanatha)',
      'Views over the surrounding plains from the top',
    ],
    thingsToDo: [
      'Climb the stone steps early in the morning, before it gets hot',
      'Look at the carved marble detail in the temple clusters',
      'Explore the town of Palitana at the foot of the hill',
    ],
  },
  {
    id: 'dest-18',
    name: 'Marine National Park',
    slug: 'marine-national-park',
    district: 'Jamnagar',
    categoryId: 'cat-4',
    shortDescription:
      'A protected area in the Gulf of Kutch with coral reefs, mangroves and islands.',
    fullDescription:
      'The Marine National Park lies in the Gulf of Kutch off the coast of Jamnagar and protects a coastal and marine environment of coral reefs, mangroves, mudflats and islands. It was the first marine national park in India.',
    mainImage: 'destinations/marine-national-park.jpg',
    bestTimeToVisit: 'Winter months, October to February. Tides strongly affect what can be seen.',
    latitude: 22.47, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 69.7,
    travelTips:
      'Visits, especially to the islands, usually need permission from the forest department. Check the rules and tide timings before you plan.',
        historicalSignificance:
      'The Gulf of Kutch has a rich coastal and marine environment, and the area was given legal protection in the early 1980s. The Marine National Park protects coral reefs, mangroves and tidal flats and is regarded as the first marine national park in India.',
    majorAttractions: [
      'Coral reefs and tidal mudflats',
      'Mangrove forests along the coast',
      'Islands such as Pirotan and Narara within the park',
      'Coastal and migratory birds',
    ],
    thingsToDo: [
      'Look for marine life and birds on guided visits, where permitted',
      'Plan your visit around the tides, which strongly affect what can be seen',
      'Check with the forest department for permission and current arrangements',
    ],
  },
  {
    id: 'dest-19',
    name: 'Junagadh and Uparkot Fort',
    slug: 'junagadh-uparkot-fort',
    district: 'Junagadh',
    categoryId: 'cat-1',
    shortDescription:
      'An ancient hilltop fort in Junagadh with rock-cut caves and old stepwells.',
    fullDescription:
      'Uparkot Fort stands in the middle of the city of Junagadh and is one of the oldest forts in Gujarat. Inside its high walls are rock-cut Buddhist caves and ancient stepwells. The fort sits within a city that is also known for its mausoleums and for nearby Mount Girnar.',
    mainImage: 'destinations/junagadh-uparkot-fort.jpg',
    bestTimeToVisit: 'October to March, when the weather is cooler.',
    latitude: 21.526, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 70.466,
    travelTips:
      'Plan for plenty of walking on uneven stone. Carry water and wear sturdy shoes.',
        historicalSignificance:
      'Junagadh has been an important settlement for over two thousand years. Uparkot Fort is traditionally believed to date back to the Mauryan period, and the city holds rock edicts of the emperor Ashoka near the foot of Mount Girnar. Later, Junagadh was ruled by the Chudasama dynasty and then by the Nawabs, which left behind a rich mix of Buddhist, Hindu, Jain and Islamic heritage.',
    majorAttractions: [
      'The walls and gateways of Uparkot Fort',
      'The rock-cut Buddhist caves inside the fort',
      'The old stepwells, Adi Kadi Vav and Navghan Kuvo',
      "Ashoka's rock edicts near Mount Girnar",
      'Mahabat Maqbara, an ornate mausoleum in the city',
    ],
    thingsToDo: [
      'Walk along the fort walls and look down over the city',
      'Visit the caves and the stepwells inside and near the fort',
      "See Ashoka's rock edicts and the temples of Mount Girnar nearby",
    ],
  },
  {
    id: 'dest-20',
    name: 'Tithal Beach',
    slug: 'tithal-beach',
    district: 'Valsad',
    categoryId: 'cat-3',
    shortDescription:
      'A popular beach on the Valsad coast, known for its dark sand.',
    fullDescription:
      'Tithal Beach lies on the Arabian Sea coast near the city of Valsad. It is known for its dark sand and is a popular weekend spot for visitors from nearby towns.',
    mainImage: 'destinations/tithal-beach.jpg',
    bestTimeToVisit: 'October to February, when the weather is pleasant.',
    latitude: 20.59, // APPROXIMATE. MUST VERIFY on OpenStreetMap.
    longitude: 72.91,
    travelTips:
      'Currents can be strong, so follow warning signs and local advice before you swim.',
        historicalSignificance:
      'The Valsad coast is closely tied to the Parsi community. The Iranshah Atash Behram, the most sacred fire temple of the Parsis, is at nearby Udvada. Tithal itself is mainly a seaside spot for visitors from the surrounding towns and cities.',
    majorAttractions: [
      'The dark-sand beach and the Arabian Sea',
      'Temples near the beachfront',
      'Snack stalls along the promenade',
      'Udvada, the Parsi pilgrimage village nearby',
    ],
    thingsToDo: [
      'Take an evening walk and watch the sunset',
      'Try the local snacks from the stalls along the promenade',
      'Visit Udvada nearby. Note that entry to the fire temple is restricted to Parsis',
    ],
  },
]