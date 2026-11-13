import type { BlogPost } from '../types/blogPost'

// TEMPORARY seed data. It moves to supabase/seed.sql in Phase 3.
// TODO: verify every statement before publishing.
export const blogPostSeed: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Best Places to Visit in Gujarat',
    slug: 'best-places-to-visit-in-gujarat',
    excerpt:
      'From a white salt desert and the home of the Asiatic lion to ancient stepwells and sacred temples, here is where to begin in Gujarat.',
    coverImage: 'destinations/rann-of-kutch.jpg',
    publishedAt: '2026-11-12',
    status: 'published',
    content: `Gujarat packs an unusual range of landscapes and history into one state. Here are some of the best places to start, grouped by the kind of trip you want.

## For history and heritage

- Rani ki Vav, Patan: an 11th-century stepwell with finely carved sculptures, and a UNESCO World Heritage Site.
- Ahmedabad's old city: a walled city of pols, carved wooden havelis and mosques, also a UNESCO World Heritage City.
- Champaner-Pavagadh: an archaeological park of hill fortifications, mosques and temples near Vadodara.
- Dholavira: the remains of a Harappan city in Kutch.

## For faith and pilgrimage

- Somnath Temple: a Shiva temple on the Arabian Sea coast, counted among the twelve Jyotirlingas.
- Dwarkadhish Temple: a major Krishna temple in the coastal town of Dwarka.
- Shatrunjaya Hill: a sacred Jain pilgrimage hill near Palitana, crowned with hundreds of temples.

## For wildlife and nature

- Gir National Park: the last natural home of the Asiatic lion.
- Velavadar Blackbuck National Park: a grassland park known for its blackbuck.
- Saputara: a cool hill station in the Sahyadri range, green and misty in the monsoon.
- Rann of Kutch: a vast white salt desert, best seen in the winter months.

## For the coast and landmarks

- Mandvi Beach: a beach beside the historic port town of Mandvi in Kutch.
- Tithal Beach: a popular beach on the Valsad coast.
- Statue of Unity: a 182-metre statue of Sardar Vallabhbhai Patel above the Narmada river.

## Plan your trip

Use the Destinations page to search and filter all of these places by category and district. Each destination page lists the best time to visit, so check it before you plan.`,
  },
  {
    id: 'post-2',
    title: 'When to Visit Gujarat: A Seasonal Guide',
    slug: 'when-to-visit-gujarat',
    excerpt:
      'Winter, summer and the monsoon each show a different side of Gujarat. Here is what each season is best for.',
    coverImage: 'destinations/zarwani-waterfall.jpg',
    publishedAt: '2026-11-10',
    status: 'published',
    content: `Gujarat has three main travel seasons, and the best time to visit depends on where you are going.

## Winter (November to February)

Winter is the most popular season. The weather is cooler and drier across most of the state, which makes sightseeing comfortable. It is the best time for the Rann of Kutch, which is dry and white after the monsoon, and the Rann Utsav festival is held in these months. Heritage sites such as Rani ki Vav, Modhera Sun Temple and Dholavira are also easier to explore in the cooler weather.

Wildlife parks such as Gir and Velavadar are best visited in the cooler months, though opening dates vary, so check before you plan. In mid-January, Uttarayan fills the skies with kites.

## Summer (March to June)

Summer is hot across much of Gujarat, especially inland and in Kutch, so it is the quietest season for most sightseeing. If you travel, plan outdoor visits for early morning or late afternoon and carry plenty of water. A hill station such as Saputara is a better choice than the plains.

## Monsoon (July to September)

The monsoon turns parts of Gujarat green. It is a good time for Saputara and the forested Dang, and for waterfalls such as Zarwani and the Polo Forest, which are at their best during and just after the rains.

Roads and paths can be slippery, some wildlife parks close, and the Rann of Kutch is flooded, so it is not the season for the white desert.

## Planning tips

- Check the best time to visit on each destination page before you book.
- Carry rain gear in the monsoon, sun protection in summer and a light layer for cool winter evenings.
- Opening dates, permits and access change, so confirm them locally before you travel.`,
  },

    {
    id: 'post-3',
    title: 'Weekend Getaways in Gujarat',
    slug: 'weekend-getaways-in-gujarat',
    excerpt:
      'Short on time? These places work well for a weekend, from a hill station to a heritage day trip.',
    coverImage: 'destinations/saputara.jpg',
    publishedAt: '2026-11-08',
    status: 'published',
    content: `You do not need a long holiday to see Gujarat. These ideas suit a weekend, and each is easy to combine with nearby places. Travel times depend on where you start, so check them before you go.

## A hill station break: Saputara

Saputara, in the Dang district, is a well-known hill station. It is cooler than the plains and has a lake, viewpoints such as Sunset Point and Echo Point, and nearby waterfalls that are at their best in the monsoon. Visit between July and September for greenery, or between October and February for cooler weather.

## A heritage day trip: Patan and Modhera

Rani ki Vav in Patan and the Sun Temple at Modhera were both built under the Chaulukya dynasty in the 11th century, and they are often visited together. Start with the stepwell and its carved panels, then see the Sun Temple and its stepped tank. Mornings give the best light. Many visitors treat this as a day trip from Ahmedabad.

## A forest escape: Polo Forest

Polo Forest, near Vijaynagar in the Sabarkantha district, hides centuries-old Jain and Hindu temples among dense trees along the Harnav river. It suits a quiet walk and photography, especially after the monsoon, between July and October. Wear sturdy shoes and check local conditions before you go.

## A coastal weekend: Mandvi or Tithal

In Kutch, Mandvi Beach sits beside a historic port town where wooden ships are still built by hand, and Vijay Vilas Palace is nearby. In south Gujarat, Tithal Beach on the Valsad coast is a popular weekend spot with dark sand. Currents can be strong at both, so follow warning signs before you swim.

## Tips for a short trip

- Pick one region rather than trying to cover the whole state.
- Check opening times, permits and road conditions before you leave.
- Start early, as many sights are most pleasant in the morning.`,
  },
  {
    id: 'post-4',
    title: "Gujarat's Cultural Festivals",
    slug: 'gujarat-cultural-festivals',
    excerpt:
      'From nine nights of garba to a sky full of kites, a guide to the festivals that shape the Gujarati calendar.',
    coverImage: 'culture/festival-navratri-garba.jpg',
    publishedAt: '2026-11-06',
    status: 'published',
    content: `Festivals are one of the best reasons to plan a trip to Gujarat. Many follow the lunar calendar, so their dates change every year. Check the current dates before you book.

## Navratri

Navratri, the nine-night festival, usually falls in September or October. It is celebrated across Gujarat with garba and dandiya raas, in which people dance in circles late into the night. Cities and villages alike host events, and many people wear traditional clothes.

## Uttarayan

Uttarayan, celebrated in mid-January, fills the skies with kites. Families spend the day on rooftops, and Ahmedabad hosts an International Kite Festival. Traditional foods such as undhiyu and chikki are closely associated with the day.

## Rann Utsav

In the cooler months, the Rann Utsav brings music, crafts and food to the white desert of Kutch. It is a good way to combine a visit to the Rann with local culture. Check the official announcements for the current dates and arrangements.

## Modhera Dance Festival

Each January, the grounds of the Sun Temple at Modhera host a festival of classical dance. The setting, in front of the 11th-century temple and its stepped tank, is a large part of the appeal.

## Janmashtami at Dwarka

Janmashtami, the birthday of Lord Krishna, is a major festival at Dwarkadhish Temple in Dwarka. It draws large crowds, so expect long queues and plan well ahead.

## Diwali and the Gujarati New Year

Diwali is celebrated widely across the state, and the Gujarati New Year, known as Bestu Varas, follows it. Markets, homes and temples are decorated with lights.

## Planning around festivals

- Festival dates change every year, so confirm them before booking.
- Book travel and stays early, as popular festivals fill up quickly.
- Expect crowds, and dress respectfully at religious events.
- Check official announcements for the Rann Utsav and the Modhera Dance Festival.`,
  },
  {
    id: 'post-5',
    title: 'Historical Places in Gujarat',
    slug: 'historical-places-in-gujarat',
    excerpt:
      "A guide to Gujarat's heritage, from a Harappan city to stepwells, Sultanate-era monuments and royal palaces.",
    coverImage: 'destinations/champaner-pavagadh.jpg',
    publishedAt: '2026-11-04',
    status: 'published',
    content: `Gujarat's past is layered, and you can travel through it roughly in order. Here is a route through the main periods, with places to see for each.

## The ancient world

Dholavira, in Kutch, holds the remains of a Harappan city that was occupied for well over a thousand years. It is known for its planned layout and its water reservoirs, and was added to the UNESCO World Heritage List in 2021. Junagadh has been an important settlement for over two thousand years, and Ashoka's rock edicts stand near the foot of Mount Girnar.

## Temples and stepwells of the Chaulukya period

In the 11th century, the Chaulukya (Solanki) dynasty built some of Gujarat's most refined monuments. Rani ki Vav in Patan is an elaborate stepwell with hundreds of carved sculptures. The Sun Temple at Modhera is known for its carved halls and its large stepped tank. Somnath is also ancient, though the present temple was completed in 1951.

## Sultanate-era cities

Ahmedabad was founded in 1411 by Sultan Ahmed Shah. Its old city has Bhadra Fort, the Teen Darwaza gateway, Jama Masjid and the Sidi Saiyyed Mosque, famous for its carved stone lattice windows. Champaner-Pavagadh, a UNESCO World Heritage Site, was a capital of the Gujarat Sultanate in the late 15th century.

## Royal Gujarat

Laxmi Vilas Palace in Vadodara was built for the Gaekwad rulers of Baroda and mixes Indian, Islamic and European styles. Junagadh was ruled by the Nawabs, and the city keeps ornate buildings such as Mahabat Maqbara.

## Sacred hills

Shatrunjaya Hill near Palitana is one of the most important Jain pilgrimage sites, with hundreds of temples along its ridges. On Pavagadh Hill, a temple of Kalika Mata sits at the summit.

## Tips for heritage travel

- Visit between October and March, when the weather is cooler.
- Go in the morning for softer light and fewer crowds.
- Many sites involve walking and steps, so wear comfortable shoes.
- A guided walk is a good way to understand Ahmedabad's old city.`,
  },
  {
    id: 'post-6',
    title: 'Food and Local Experiences in Gujarat',
    slug: 'food-and-local-experiences-in-gujarat',
    excerpt:
      'A first taste of Gujarat: the thali, the snacks, the sweets and the experiences that make a trip memorable.',
    coverImage: 'culture/gujarati-thali.jpg',
    publishedAt: '2026-11-02',
    status: 'published',
    content: `Gujarati food is a good reason to travel on its own. Here is where to begin, along with a few local experiences worth planning around.

## The Gujarati thali

Gujarati cuisine is largely vegetarian and is known for balancing sweet, salty and spicy flavours. A traditional thali brings many dishes together on one plate, usually with breads, rice, lentils, vegetables, savoury snacks and a sweet.

## Snacks and street food

- Dhokla and khaman: soft, steamed savoury cakes made from fermented batter.
- Thepla and khakhra: flatbreads that travel well, popular as snacks.
- Fafda with jalebi: a crisp savoury snack paired with a sweet, a favourite breakfast across the state.
- Kutchi dabeli: a spiced potato snack in a bun, said to have originated in Mandvi in Kutch.
- Undhiyu: a mixed-vegetable dish associated with winter and Uttarayan.

## Sweets and drinks

Look for shrikhand, a sweetened strained-yogurt dessert, and mohanthal, a traditional gram-flour sweet. Chaas, a spiced buttermilk, is a common drink with meals.

## Crafts to look for

Kutch is known for embroidery and mirror work, and for block-printed textiles. Bandhani tie-dye is found across the state, and the town of Patan is known for patola silk weaving.

## Experiences worth planning around

- Take a heritage walk through the old city of Ahmedabad.
- Visit during the Rann Utsav for music, crafts and food in the white desert.
- Go on a guided safari in Gir National Park.
- Watch wooden ships being built at the shipyards in Mandvi.

## Practical tips

- Vegetarian options are widely available, and many restaurants serve only vegetarian food.
- Alcohol is restricted in much of Gujarat, so check the current rules before you travel.
- With street food, choose busy stalls and drink bottled water.`,
  },
]