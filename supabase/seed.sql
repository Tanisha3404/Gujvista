-- Seed data for destinations

-- Categories
insert into public.categories (name, slug, description, image, sort_order)
values
  ('Historical & Heritage', 'historical-heritage', 'Stepwells, palaces and monuments that tell Gujarat''s story.', 'destinations/rani-ki-vav.jpg', 0),
  ('Religious Destinations', 'religious', 'Temples and sacred sites across the state.', 'destinations/somnath-temple.jpg', 1),
  ('Beaches', 'beaches', 'Sandy shores along the Arabian Sea coast.', 'hero/hero-beach.jpg', 2),
  ('Wildlife', 'wildlife', 'National parks and sanctuaries with remarkable animals.', 'destinations/gir-national-park.jpg', 3),
  ('Nature & Hill Stations', 'nature-hill-stations', 'Hills, forests, waterfalls and wide open landscapes.', 'destinations/saputara.jpg', 4),
  ('Cultural Experiences', 'cultural-experiences', 'Festivals, crafts, food and living traditions.', 'destinations/rann-of-kutch.jpg', 5)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  sort_order = excluded.sort_order;

-- Destinations
insert into public.destinations (
  name, slug, district, category_id, short_description, full_description,
  main_image, best_time_to_visit, latitude, longitude, travel_tips,
  historical_significance, major_attractions, things_to_do, is_featured, is_hidden_gem,
  sort_order
)
values
  ('Statue of Unity', 'statue-of-unity', 'Narmada', (select id from public.categories where slug = 'historical-heritage'), 'A 182-metre statue of Sardar Vallabhbhai Patel rising above the Narmada river.', 'The Statue of Unity stands near Kevadia in the Narmada district and honours Sardar Vallabhbhai Patel, a leader of India''s independence movement and the country''s first Deputy Prime Minister. At 182 metres it is the tallest statue in the world, and it overlooks the Narmada river and the Sardar Sarovar Dam.', 'destinations/statue-of-unity.jpg', 'October to March, when the weather is cooler.', 21.838, 73.719, 'Check the official website for current opening hours and visiting arrangements before you travel. Wear comfortable walking shoes and carry water.', 'The statue honours Sardar Vallabhbhai Patel, who played a central role in bringing India''s princely states together after independence and is often remembered as the ''Iron Man of India''. It was inaugurated in October 2018 on the occasion of his birth anniversary.', array['The statue itself, with a viewing gallery', 'The Narmada river and the Sardar Sarovar Dam nearby', 'Gardens and other visitor attractions around the Kevadia area']::text[], array['See the statue up close and enjoy the view of the Narmada from the viewing gallery', 'Look out over the Sardar Sarovar Dam from nearby', 'Walk through the landscaped gardens around the site']::text[], true, false, 0),
  ('Rann of Kutch', 'rann-of-kutch', 'Kutch', (select id from public.categories where slug = 'nature-hill-stations'), 'A vast white salt desert stretching to the horizon, known for its winter festival.', 'The Rann of Kutch is a large seasonal salt marsh in the Kutch district that dries into a glittering white plain after the monsoon. Visitors come for its wide, open landscape, its sunsets, and the Rann Utsav, a winter cultural festival with local music, crafts and food.', 'destinations/rann-of-kutch.jpg', 'November to February. The Rann is flooded during the monsoon.', 23.83, 69.68, 'Some areas close to the international border may need a permit, so check the current rules locally before you go. Carry sun protection and plenty of water, as there is little shade.', 'The Great Rann of Kutch is one of the largest salt deserts in the world. It floods during the monsoon and dries into a white salt crust afterwards, and it has shaped life in Kutch for generations. The region is known for its embroidery, block printing and other handicrafts, and for the communities that live around the Rann.', array['The white salt flats near Dhordo', 'Rann Utsav, the winter cultural festival', 'Kala Dungar, a hilltop viewpoint with views over the Rann']::text[], array['Watch the sun set over the white salt flats', 'Attend the Rann Utsav if you visit in winter', 'Look for local handicrafts such as embroidery and block-printed textiles']::text[], true, false, 1),
  ('Somnath Temple', 'somnath-temple', 'Gir Somnath', (select id from public.categories where slug = 'religious'), 'A Shiva temple on the Arabian Sea coast, counted among the twelve Jyotirlingas.', 'Somnath Temple stands at Prabhas Patan on the Arabian Sea coast and is revered as one of the twelve Jyotirlinga shrines of Lord Shiva. The temple has been destroyed and rebuilt several times over the centuries. The present structure, built in the Chaulukya style, was completed in 1951.', 'destinations/somnath-temple.jpg', 'October to March. Early mornings and evenings are especially pleasant by the sea.', 20.888, 70.401, 'Dress modestly and expect security checks at the entrance. Check the official temple website for aarti timings.', 'Somnath is often regarded as the first of the twelve Jyotirlinga shrines of Lord Shiva. The temple at Prabhas Patan has been damaged and rebuilt several times over the centuries, and the present temple was completed in 1951. For many devotees it stands as a symbol of resilience.', array['The main Somnath Temple, built in the Chaulukya style', 'The seashore beside the temple', 'Triveni Sangam, where rivers meet near the sea']::text[], array['Attend the aarti if your timing allows', 'Walk along the seashore next to the temple', 'Visit the Triveni Sangam nearby']::text[], true, false, 2),
  ('Gir National Park', 'gir-national-park', 'Gir Somnath', (select id from public.categories where slug = 'wildlife'), 'The last natural home of the Asiatic lion, with dry forest and guided safaris.', 'Gir National Park and Wildlife Sanctuary, around Sasan Gir, is the only place in the wild where Asiatic lions live. Its dry deciduous forest is also home to leopards, deer, crocodiles and many bird species, and guided jeep safaris are the main way to see it.', 'destinations/gir-national-park.jpg', 'December to March. The park is usually closed during the monsoon months, so check dates before you plan.', 21.12, 70.8, 'Safaris usually need to be booked in advance through official channels, so check the current booking rules before you travel.', 'Gir is the last natural home of the Asiatic lion. The species once ranged across a much wider area but was reduced to a very small number, and protection and conservation efforts, with the involvement of local communities such as the Maldhari herders, have helped the population recover.', array['Asiatic lions in their natural habitat', 'Leopards, deer and many bird species', 'Kamleshwar Dam, a large reservoir inside the forest', 'Devalia Safari Park near Sasan Gir']::text[], array['Take a guided jeep safari through the forest', 'Visit the Devalia Safari Park', 'Go birdwatching around the park']::text[], true, false, 3),
  ('Rani ki Vav', 'rani-ki-vav', 'Patan', (select id from public.categories where slug = 'historical-heritage'), 'An 11th-century stepwell with finely carved panels, a UNESCO World Heritage Site.', 'Rani ki Vav is an elaborate stepwell at Patan on the banks of the Saraswati river, built in the 11th century. Its walls and pillars carry hundreds of carved sculptures, many depicting Vishnu in his avatars. It was inscribed as a UNESCO World Heritage Site in 2014.', 'destinations/rani-ki-vav.jpg', 'October to March. Mornings give the best light for the carvings.', 23.859, 72.102, 'Wear comfortable footwear, as there are many steps. Carry water and sun protection.', 'Rani ki Vav was built in the 11th century during the Chaulukya (Solanki) dynasty and is traditionally said to have been commissioned by Queen Udayamati in memory of her husband, King Bhimdev I. It was later buried under silt from the Saraswati river and was excavated in the 20th century. It is designed as an inverted temple, honouring the sacredness of water.', array['Seven levels of stairs with carved pillars and pavilions', 'Hundreds of sculptures, many showing Vishnu''s avatars', 'The deep well shaft at the western end']::text[], array['Walk down the levels and look closely at the carved panels', 'Visit in the morning for softer light for photographs', 'Explore the town of Patan, known for patola silk weaving']::text[], true, false, 4),
  ('Saputara', 'saputara', 'Dang', (select id from public.categories where slug = 'nature-hill-stations'), 'A cool hill station in the Sahyadri range, green and misty during the monsoon.', 'Saputara is a hill station in the Dang district, set in the Sahyadri range close to the Maharashtra border. It is known for its viewpoints, a lake, forested hills and nearby waterfalls that are at their best in the monsoon.', 'destinations/saputara.jpg', 'July to September for monsoon greenery, or October to February for cooler weather.', 20.567, 73.75, 'Roads can be slippery and visibility low in heavy monsoon rain. Carry rain gear and drive carefully.', 'Saputara is said to mean ''abode of serpents'', and a serpent is worshipped locally. It lies in the Dang district, which is home to tribal communities and is known for the Dang Darbar festival, held around Holi.', array['Saputara Lake', 'Viewpoints such as Sunset Point and Echo Point', 'Gira Falls, a waterfall in the area']::text[], array['Watch the sunset from a viewpoint', 'Go boating on Saputara Lake', 'Visit Gira Falls during or just after the monsoon']::text[], true, false, 5),
  ('Polo Forest', 'polo-forest', 'Sabarkantha', (select id from public.categories where slug = 'nature-hill-stations'), 'A quiet forest near Vijaynagar, hiding centuries-old Jain and Hindu temples.', 'Polo Forest lies near Vijaynagar in the Sabarkantha district, along the Harnav river. Its dense woodland shelters clusters of centuries-old Jain and Hindu temples, which makes it a favourite for walking, photography and quiet getaways, especially after the monsoon.', 'destinations/polo-forest.jpg', 'July to October, when the forest is green after the rains.', 23.7, 73.3, 'Wear sturdy walking shoes, as paths can be uneven and slippery after rain. Carry water and check local conditions before you go.', 'The forest holds the ruins of an old settlement and several clusters of Jain and Hindu temples, believed to date from roughly the 10th to the 15th centuries. The ruins, set among trees beside the Harnav river, are among the main reasons visitors come.', array['Clusters of Jain and Hindu temples hidden among the trees', 'The Harnav river and dam', 'Sharneshwar Mahadev Temple']::text[], array['Walk or trek among the ruins and temple clusters', 'Photograph the forest and temples after the monsoon', 'Check whether the annual Polo Festival is on during your visit']::text[], false, true, 6),
  ('Zarwani Waterfall', 'zarwani-waterfall', 'Narmada', (select id from public.categories where slug = 'nature-hill-stations'), 'A forest waterfall in the Narmada district that comes alive in the monsoon.', 'Zarwani Waterfall lies in the forested hills of the Narmada district. It is best seen during and just after the monsoon, when the water is flowing and the surrounding forest is at its greenest.', 'destinations/zarwani-waterfall.jpg', 'July to October, during and just after the monsoon.', 21.7, 73.6, 'Rocks and paths near the water can be very slippery. Carry rain gear and take care, especially after heavy rain.', 'Zarwani lies in a forested part of the Narmada district, an area that is home to tribal communities and is better known for its natural scenery than for historical monuments. The waterfall is a seasonal attraction, at its fullest during and after the monsoon.', array['The waterfall itself, strongest in and after the monsoon', 'The surrounding forest and hills', 'Other sights elsewhere in the Narmada district, such as the Statue of Unity']::text[], array['Visit during or just after the monsoon, when the water is flowing', 'Enjoy the forest scenery and take photographs', 'Combine the trip with the Statue of Unity, also in the Narmada district']::text[], false, true, 7),
  ('Dholavira', 'dholavira', 'Kutch', (select id from public.categories where slug = 'historical-heritage'), 'The remains of a Harappan city in the Rann of Kutch, a UNESCO World Heritage Site.', 'Dholavira is an archaeological site on Khadir island in the Rann of Kutch, holding the remains of a Harappan (Indus Valley) city. It was inscribed as a UNESCO World Heritage Site in 2021 and is known for its planned layout and its sophisticated system of water conservation.', 'destinations/dholavira.jpg', 'November to February, when the weather is cooler and drier.', 23.887, 70.215, 'There is little shade, so carry sun protection and plenty of water. The area is remote, so check access and local conditions before you travel.', 'Dholavira was a major city of the Harappan (Indus Valley) civilisation and was occupied for well over a thousand years, roughly between 3000 and 1500 BCE. It is remarkable for its planned layout and for its large reservoirs and water channels, built in a dry landscape. It was discovered in the late 1960s and added to the UNESCO World Heritage List in 2021.', array['The ruins of the citadel, middle town and lower town', 'The large reservoirs and water channels', 'The site museum, with finds from the excavations', 'The Fossil Park nearby']::text[], array['Walk through the excavated ruins and see how the city was planned', 'Visit the site museum', 'Combine the trip with the Rann of Kutch']::text[], false, true, 8),
  ('Velavadar Blackbuck National Park', 'velavadar-blackbuck-national-park', 'Bhavnagar', (select id from public.categories where slug = 'wildlife'), 'A grassland park known for its blackbuck, one of India''s fastest antelopes.', 'Velavadar Blackbuck National Park in the Bhavnagar district protects one of India''s largest stretches of tropical grassland and is best known for its blackbuck antelope. The park is also home to wolves, and large numbers of harriers roost here in the winter.', 'destinations/velavadar-blackbuck-national-park.jpg', 'October to March. The park is generally closed during the monsoon, so check opening dates.', 22, 72, 'Visit early in the morning or late in the afternoon, when animals are most active. Check current entry and safari rules before you travel.', 'The grassland at Velavadar was once a royal reserve of the rulers of Bhavnagar and was protected as a national park in the 1970s. It is one of the few places in India where a large area of tropical grassland survives, and it is closely tied to the recovery of the blackbuck.', array['Large herds of blackbuck on the open grassland', 'Indian wolves, which live in the park', 'Birds such as the lesser florican, and winter roosts of harriers']::text[], array['Take a jeep safari early in the morning or late in the afternoon', 'Look for blackbuck, wolves and grassland birds', 'Visit in winter, when the harriers gather to roost']::text[], false, true, 9),
  ('Dwarkadhish Temple', 'dwarkadhish-temple', 'Devbhoomi Dwarka', (select id from public.categories where slug = 'religious'), 'A major Krishna temple in the coastal town of Dwarka, one of the Char Dham sites.', 'Dwarkadhish Temple stands in the coastal town of Dwarka and is dedicated to Lord Krishna, worshipped here as the king of Dwarka. It is counted among the Char Dham pilgrimage sites and is one of the most important Hindu pilgrimage centres in Gujarat.', 'destinations/dwarkadhish-temple.jpg', 'October to March. Janmashtami is a major festival here and draws large crowds.', 22.238, 68.968, 'Dress modestly, and expect security checks and long queues during festivals. Check the official temple website for darshan timings.', 'Dwarka is traditionally associated with Lord Krishna, who is said in Hindu tradition to have ruled from the city. The temple is counted among the four Char Dham pilgrimage sites, together with Badrinath, Puri and Rameswaram, and Dwarka is also regarded as one of the seven sacred cities of Hinduism. The present temple is centuries old, though tradition places the original shrine far earlier.', array['The main temple, with its tall, intricately carved spire', 'The Gomti Ghat, where the Gomti river meets the sea', 'Rukmini Devi Temple in Dwarka', 'Nageshwar Jyotirlinga and Bet Dwarka, both nearby']::text[], array['Take part in the darshan and aarti, after checking the timings', 'Walk down to the Gomti Ghat', 'Visit Rukmini Devi Temple, Nageshwar Jyotirlinga or Bet Dwarka nearby']::text[], false, false, 10),
  ('Champaner-Pavagadh', 'champaner-pavagadh', 'Panchmahal', (select id from public.categories where slug = 'historical-heritage'), 'A UNESCO-listed archaeological park of hill fortifications, mosques and temples.', 'The Champaner-Pavagadh Archaeological Park surrounds the hill of Pavagadh and the old city of Champaner, which was a capital of the Gujarat Sultanate in the 15th century. It brings together hill fortifications, palaces, mosques, step wells and temples, and it was inscribed as a UNESCO World Heritage Site in 2004.', 'destinations/champaner-pavagadh.jpg', 'October to February, when the weather is cooler.', 22.485, 73.535, 'Expect a lot of walking and climbing on uneven ground. Carry water, and check whether the ropeway to the hilltop is operating.', 'Champaner became the capital of the Gujarat Sultanate in the late 15th century under Mahmud Begada, who developed it after capturing the hill fortress of Pavagadh. It is notable as a largely unchanged pre-Mughal Islamic city. The same area also holds ancient Hindu and Jain sites, including the Kalika Mata Temple on top of Pavagadh Hill.', array['The Jama Masjid of Champaner, known for its carved stonework', 'Hill fortifications, gateways and step wells', 'Kalika Mata Temple at the top of Pavagadh Hill']::text[], array['Walk through the old city''s mosques, gateways and ruins', 'Climb Pavagadh Hill, or use the ropeway if it is operating', 'Visit the Kalika Mata Temple at the summit']::text[], false, false, 11),
  ('Modhera Sun Temple', 'modhera-sun-temple', 'Mehsana', (select id from public.categories where slug = 'historical-heritage'), 'An 11th-century temple to the Sun God, with a grand stepped tank in front.', 'The Sun Temple at Modhera was built in the early 11th century during the Chaulukya dynasty and is dedicated to the Sun God, Surya. It is known for its intricate stone carving and for the large stepped tank, the Surya Kund, in front of the main shrine. A dance festival is held here each January.', 'destinations/modhera-sun-temple.jpg', 'October to March. Mornings give the best light for photographs.', 23.583, 72.133, 'There is little shade in the grounds, so bring sun protection and water. Check the current opening hours before you travel.', 'The temple was built in the early 11th century under the Chaulukya (Solanki) dynasty and is dedicated to Surya, the Sun God. It is often said to be aligned so that the rising sun lights the inner shrine at the equinoxes. Each January the temple grounds host a classical dance festival.', array['Surya Kund, the large stepped tank in front of the temple', 'The carved assembly hall (sabha mandap)', 'The main shrine hall (guda mandap)', 'The annual Modhera Dance Festival in January']::text[], array['Look closely at the carved pillars and panels in the assembly hall', 'Walk around the Surya Kund, especially in the morning light', 'Time your visit with the January dance festival', 'Pair it with Rani ki Vav in Patan, which is also from the Chaulukya period']::text[], false, false, 12),
  ('Laxmi Vilas Palace', 'laxmi-vilas-palace', 'Vadodara', (select id from public.categories where slug = 'historical-heritage'), 'A grand Indo-Saracenic palace built for the Gaekwad rulers of Baroda.', 'Laxmi Vilas Palace in Vadodara was built in the late 19th century for the Gaekwad rulers of Baroda, in the Indo-Saracenic style that blends Indian and European architecture. Set in large landscaped grounds, it remains the residence of the former royal family.', 'destinations/laxmi-vilas-palace.jpg', 'October to March, when the weather is pleasant.', 22.293, 73.192, 'Parts of the complex are still a private residence, so check the current visiting arrangements before you go.', 'The palace was built for Maharaja Sayajirao Gaekwad III, a ruler of Baroda known for promoting education and reform, and was completed around 1890. It is often described as one of the largest private residences ever built. Its Indo-Saracenic design combines Indian, Islamic and European architectural styles.', array['The palace architecture, with its domes, arches and towers', 'The landscaped grounds', 'Maharaja Fateh Singh Museum on the grounds, known for its art collection']::text[], array['Admire the architecture from the grounds', 'Visit the museum, after checking that it is open', 'Explore Vadodara''s other landmarks such as Sayaji Baug and the Baroda Museum']::text[], false, false, 13),
  ('Mandvi Beach', 'mandvi-beach', 'Kutch', (select id from public.categories where slug = 'beaches'), 'A beach by the historic port town of Mandvi on the Gulf of Kutch.', 'Mandvi Beach lies beside the historic port town of Mandvi on the Gulf of Kutch. The town is known for its traditional wooden shipbuilding yards, and the Vijay Vilas Palace is nearby, which makes the beach a good stop on a trip around Kutch.', 'destinations/mandvi-beach.jpg', 'October to March, when the weather is cooler.', 22.83, 69.35, 'Swimming conditions change with the tides and currents, so follow local advice and any warning signs.', 'Mandvi was for centuries an important port and shipbuilding town in Kutch, and traditional wooden ships are still built by hand in its shipyards beside the river. The town is also home to Vijay Vilas Palace, a former royal summer palace built in the 20th century.', array['Mandvi Beach and the Gulf of Kutch coastline', 'The traditional wooden shipbuilding yards', 'Vijay Vilas Palace, a former royal summer palace nearby', 'Kranti Teerth, a memorial to Shyamji Krishna Varma']::text[], array['Watch the sunset from the beach', 'See how wooden ships are built at the shipyards', 'Visit Vijay Vilas Palace, after checking opening arrangements']::text[], false, false, 14),
  ('Ahmedabad Heritage City', 'ahmedabad-heritage-city', 'Ahmedabad', (select id from public.categories where slug = 'historical-heritage'), 'India''s first UNESCO World Heritage City, with a walled old town of pols and havelis.', 'The historic walled city of Ahmedabad was founded in 1411 by Sultan Ahmed Shah and was inscribed as a UNESCO World Heritage City in 2017. It is known for its pols, the traditional clustered neighbourhoods, along with carved wooden havelis, mosques and temples that reflect the city''s mixed heritage.', 'destinations/ahmedabad-heritage-city.jpg', 'October to March, when walking around the old city is comfortable.', 23.02, 72.58, 'A guided heritage walk is a good way to explore the old city. Wear comfortable shoes and dress modestly at religious sites.', 'The walled city was founded in 1411 on the banks of the Sabarmati river by Sultan Ahmed Shah and grew into a major centre of trade and crafts. Its architecture blends Hindu, Jain and Islamic traditions, and its pols, the closely packed residential neighbourhoods with carved wooden havelis, are among its most distinctive features. In 2017 it became India''s first city to be inscribed as a UNESCO World Heritage City.', array['Bhadra Fort and the Teen Darwaza gateway', 'Jama Masjid', 'Sidi Saiyyed Mosque, famous for its carved stone lattice windows', 'The pols, with their carved wooden havelis and bird-feeding towers', 'Manek Chowk, a market that comes alive in the evening']::text[], array['Join a guided heritage walk through the old city, after checking current arrangements', 'Look closely at the stone lattice work at Sidi Saiyyed Mosque', 'Explore the pols and their carved wooden doors and balconies', 'Visit Sabarmati Ashram, associated with Mahatma Gandhi, elsewhere in the city']::text[], false, false, 15),
  ('Shatrunjaya Hill', 'shatrunjaya-hill', 'Bhavnagar', (select id from public.categories where slug = 'religious'), 'A sacred Jain pilgrimage hill near Palitana, crowned with hundreds of temples.', 'Shatrunjaya Hill, near the town of Palitana, is one of the most sacred pilgrimage sites for Jains. Hundreds of marble temples are clustered along its ridges, and pilgrims and visitors reach them by climbing thousands of stone steps.', 'destinations/shatrunjaya-hill.jpg', 'October to March. Start the climb early in the morning to avoid the heat.', 21.495, 71.795, 'Carry water, wear comfortable footwear, and dress modestly. Rules about items such as leather apply at Jain temples, so check them locally.', 'For Jains, Shatrunjaya is one of the holiest pilgrimage sites. According to Jain tradition, many monks attained liberation here, and Rishabhanatha, the first Tirthankara, is closely associated with the hill. The temples were built over many centuries, and many of the present structures date from later periods after earlier temples were damaged.', array['Hundreds of marble temples along the ridges of the hill', 'The main temple dedicated to Adinath (Rishabhanatha)', 'Views over the surrounding plains from the top']::text[], array['Climb the stone steps early in the morning, before it gets hot', 'Look at the carved marble detail in the temple clusters', 'Explore the town of Palitana at the foot of the hill']::text[], false, false, 16),
  ('Marine National Park', 'marine-national-park', 'Jamnagar', (select id from public.categories where slug = 'wildlife'), 'A protected area in the Gulf of Kutch with coral reefs, mangroves and islands.', 'The Marine National Park lies in the Gulf of Kutch off the coast of Jamnagar and protects a coastal and marine environment of coral reefs, mangroves, mudflats and islands. It was the first marine national park in India.', 'destinations/marine-national-park.jpg', 'Winter months, October to February. Tides strongly affect what can be seen.', 22.47, 69.7, 'Visits, especially to the islands, usually need permission from the forest department. Check the rules and tide timings before you plan.', 'The Gulf of Kutch has a rich coastal and marine environment, and the area was given legal protection in the early 1980s. The Marine National Park protects coral reefs, mangroves and tidal flats and is regarded as the first marine national park in India.', array['Coral reefs and tidal mudflats', 'Mangrove forests along the coast', 'Islands such as Pirotan and Narara within the park', 'Coastal and migratory birds']::text[], array['Look for marine life and birds on guided visits, where permitted', 'Plan your visit around the tides, which strongly affect what can be seen', 'Check with the forest department for permission and current arrangements']::text[], false, false, 17),
  ('Junagadh and Uparkot Fort', 'junagadh-uparkot-fort', 'Junagadh', (select id from public.categories where slug = 'historical-heritage'), 'An ancient hilltop fort in Junagadh with rock-cut caves and old stepwells.', 'Uparkot Fort stands in the middle of the city of Junagadh and is one of the oldest forts in Gujarat. Inside its high walls are rock-cut Buddhist caves and ancient stepwells. The fort sits within a city that is also known for its mausoleums and for nearby Mount Girnar.', 'destinations/junagadh-uparkot-fort.jpg', 'October to March, when the weather is cooler.', 21.526, 70.466, 'Plan for plenty of walking on uneven stone. Carry water and wear sturdy shoes.', 'Junagadh has been an important settlement for over two thousand years. Uparkot Fort is traditionally believed to date back to the Mauryan period, and the city holds rock edicts of the emperor Ashoka near the foot of Mount Girnar. Later, Junagadh was ruled by the Chudasama dynasty and then by the Nawabs, which left behind a rich mix of Buddhist, Hindu, Jain and Islamic heritage.', array['The walls and gateways of Uparkot Fort', 'The rock-cut Buddhist caves inside the fort', 'The old stepwells, Adi Kadi Vav and Navghan Kuvo', 'Ashoka''s rock edicts near Mount Girnar', 'Mahabat Maqbara, an ornate mausoleum in the city']::text[], array['Walk along the fort walls and look down over the city', 'Visit the caves and the stepwells inside and near the fort', 'See Ashoka''s rock edicts and the temples of Mount Girnar nearby']::text[], false, false, 18),
  ('Tithal Beach', 'tithal-beach', 'Valsad', (select id from public.categories where slug = 'beaches'), 'A popular beach on the Valsad coast, known for its dark sand.', 'Tithal Beach lies on the Arabian Sea coast near the city of Valsad. It is known for its dark sand and is a popular weekend spot for visitors from nearby towns.', 'destinations/tithal-beach.jpg', 'October to February, when the weather is pleasant.', 20.59, 72.91, 'Currents can be strong, so follow warning signs and local advice before you swim.', 'The Valsad coast is closely tied to the Parsi community. The Iranshah Atash Behram, the most sacred fire temple of the Parsis, is at nearby Udvada. Tithal itself is mainly a seaside spot for visitors from the surrounding towns and cities.', array['The dark-sand beach and the Arabian Sea', 'Temples near the beachfront', 'Snack stalls along the promenade', 'Udvada, the Parsi pilgrimage village nearby']::text[], array['Take an evening walk and watch the sunset', 'Try the local snacks from the stalls along the promenade', 'Visit Udvada nearby. Note that entry to the fire temple is restricted to Parsis']::text[], false, false, 19)
on conflict (slug) do update set
  name = excluded.name,
  district = excluded.district,
  category_id = excluded.category_id,
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  main_image = excluded.main_image,
  best_time_to_visit = excluded.best_time_to_visit,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  travel_tips = excluded.travel_tips,
  historical_significance = excluded.historical_significance,
  major_attractions = excluded.major_attractions,
  things_to_do = excluded.things_to_do,
  is_featured = excluded.is_featured,
  is_hidden_gem = excluded.is_hidden_gem,
  sort_order = excluded.sort_order;

-- Travel guides
insert into public.blog_posts (title, slug, excerpt, content, cover_image, published_at, status)
values
  ('Best Places to Visit in Gujarat', 'best-places-to-visit-in-gujarat', 'From a white salt desert and the home of the Asiatic lion to ancient stepwells and sacred temples, here is where to begin in Gujarat.', 'Gujarat packs an unusual range of landscapes and history into one state. Here are some of the best places to start, grouped by the kind of trip you want.

## For history and heritage

- Rani ki Vav, Patan: an 11th-century stepwell with finely carved sculptures, and a UNESCO World Heritage Site.
- Ahmedabad''s old city: a walled city of pols, carved wooden havelis and mosques, also a UNESCO World Heritage City.
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

Use the Destinations page to search and filter all of these places by category and district. Each destination page lists the best time to visit, so check it before you plan.', 'destinations/rann-of-kutch.jpg', '2026-11-12T00:00:00Z'::timestamptz, 'published'),
  ('When to Visit Gujarat: A Seasonal Guide', 'when-to-visit-gujarat', 'Winter, summer and the monsoon each show a different side of Gujarat. Here is what each season is best for.', 'Gujarat has three main travel seasons, and the best time to visit depends on where you are going.

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
- Opening dates, permits and access change, so confirm them locally before you travel.', 'destinations/zarwani-waterfall.jpg', '2026-11-10T00:00:00Z'::timestamptz, 'published'),
  ('Weekend Getaways in Gujarat', 'weekend-getaways-in-gujarat', 'Short on time? These places work well for a weekend, from a hill station to a heritage day trip.', 'You do not need a long holiday to see Gujarat. These ideas suit a weekend, and each is easy to combine with nearby places. Travel times depend on where you start, so check them before you go.

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
- Start early, as many sights are most pleasant in the morning.', 'destinations/saputara.jpg', '2026-11-08T00:00:00Z'::timestamptz, 'published'),
  ('Gujarat''s Cultural Festivals', 'gujarat-cultural-festivals', 'From nine nights of garba to a sky full of kites, a guide to the festivals that shape the Gujarati calendar.', 'Festivals are one of the best reasons to plan a trip to Gujarat. Many follow the lunar calendar, so their dates change every year. Check the current dates before you book.

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
- Check official announcements for the Rann Utsav and the Modhera Dance Festival.', 'culture/festival-navratri-garba.jpg', '2026-11-06T00:00:00Z'::timestamptz, 'published'),
  ('Historical Places in Gujarat', 'historical-places-in-gujarat', 'A guide to Gujarat''s heritage, from a Harappan city to stepwells, Sultanate-era monuments and royal palaces.', 'Gujarat''s past is layered, and you can travel through it roughly in order. Here is a route through the main periods, with places to see for each.

## The ancient world

Dholavira, in Kutch, holds the remains of a Harappan city that was occupied for well over a thousand years. It is known for its planned layout and its water reservoirs, and was added to the UNESCO World Heritage List in 2021. Junagadh has been an important settlement for over two thousand years, and Ashoka''s rock edicts stand near the foot of Mount Girnar.

## Temples and stepwells of the Chaulukya period

In the 11th century, the Chaulukya (Solanki) dynasty built some of Gujarat''s most refined monuments. Rani ki Vav in Patan is an elaborate stepwell with hundreds of carved sculptures. The Sun Temple at Modhera is known for its carved halls and its large stepped tank. Somnath is also ancient, though the present temple was completed in 1951.

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
- A guided walk is a good way to understand Ahmedabad''s old city.', 'destinations/champaner-pavagadh.jpg', '2026-11-04T00:00:00Z'::timestamptz, 'published'),
  ('Food and Local Experiences in Gujarat', 'food-and-local-experiences-in-gujarat', 'A first taste of Gujarat: the thali, the snacks, the sweets and the experiences that make a trip memorable.', 'Gujarati food is a good reason to travel on its own. Here is where to begin, along with a few local experiences worth planning around.

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
- With street food, choose busy stalls and drink bottled water.', 'culture/gujarati-thali.jpg', '2026-11-02T00:00:00Z'::timestamptz, 'published')
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_image = excluded.cover_image,
  published_at = excluded.published_at,
  status = excluded.status;
