"use client";

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import GeminiChat from '../../components/GeminiChat';


interface MediaItem {
  name: string;
  imageLink: string;
  description: string;
}

interface StateInfo {
  name: string;
  description: string;
  history: string;
  population: string;
  area: string;
  density: string;
  capital: string;
  region: string;
  coordinates: string;
  gdp: string;
  literacyRate: string;
  sexRatio: string;
  languages: string[];
  culture: string;
  artForms: MediaItem[];
  heritageSites: MediaItem[];
  food: MediaItem[];
  dances: MediaItem[];
  famousPlaces: MediaItem[];
  festivals: MediaItem[];
  traditionalDress: MediaItem[];
}

const stateData: Record<string, StateInfo> = {
  kerala: {
    name: "Kerala",
    description: `Known as “God’s Own Country,” Kerala is celebrated for its serene backwaters, lush hills, and a living tradition of Ayurveda and dance.`,
    history: `Kerala’s recorded history begins with the Chera dynasty (3rd century BCE), whose maritime trade links reached Rome and China. Over centuries, it absorbed Arab, Portuguese, Dutch, and British influences. Post-independence, Kerala led India in literacy and public health reforms, becoming a human-development model.`,
    population: "36 million (2025 est.)",
    area: "38,863 km²",
    density: "893 people/km²",
    capital: "Thiruvananthapuram",
    region: "South India",
    coordinates: "8.5241° N, 76.9366° E",
    gdp: "$110 billion (2023 est.)",
    literacyRate: "96.2%",
    sexRatio: "1084 ♀ per 1000 ♂",
    languages: ["Malayalam", "English"],
    culture: `Kerala’s culture blends Dravidian, Vedic, and maritime influences. It emphasizes communal harmony, art patronage, Ayurvedic wellness, and a matrilineal tradition in certain communities.`,
    artForms: [
      {
        name: "Mural Paintings",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/41/Cochin_mural_painting.jpg",
        description:
          "Vibrant temple murals depicting Hindu epics, painted on walls with natural pigments.",
      },
      {
        name: "Wood Carving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ef/Temple_wood_carving_kerala.jpg",
        description:
          "Intricate woodwork on temple pillars showcasing floral and mythological motifs.",
      },
      {
        name: "Coir Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Coir_products.jpg",
        description:
          "Traditional craft of rope and mat making from coconut husk fibers.",
      },
    ],
    heritageSites: [
      {
        name: "Western Ghats (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wayanad_trek_Western_Ghats.jpg",
        description:
          "Biodiversity hotspot along Kerala’s eastern border with endemic species.",
      },
      {
        name: "Trivandrum Monuments",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Padmanabhaswamy_Temple.jpg",
        description:
          "18th-century Dravidian-style temples with exquisite stone carvings.",
      },
      {
        name: "Cheraman Juma Mosque",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/25/Cheraman_Juma_Masjid.jpg",
        description:
          "Believed to be India’s oldest mosque from the 7th century.",
      },
    ],
    food: [
      {
        name: "Puttu & Kadala Curry",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5b/Puttu_with_Kadala.JPG",
        description: "Steamed rice cake served with spicy chickpea curry.",
      },
      {
        name: "Appam & Stew",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5a/Appam_and_stew.jpg",
        description: "Rice pancake paired with coconut milk vegetable stew.",
      },
      {
        name: "Sadya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/60/Kerala_Sadya_Feast.jpg",
        description:
          "Banana-leaf banquet of rice, curries, pickles, and desserts.",
      },
    ],
    dances: [
      {
        name: "Kathakali",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Kathakali_Krishna.jpg",
        description:
          "Mask-and-paint dance drama narrating mythological stories.",
      },
      {
        name: "Mohiniyattam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mohiniyattam5.JPG",
        description: "Graceful solo dance with swaying movements.",
      },
      {
        name: "Theyyam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/67/Theyyam_northern_kerala.jpg",
        description: "Ritualistic performance where dancers embody deities.",
      },
    ],
    famousPlaces: [
      {
        name: "Alleppey Backwaters",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/Alleppey_Backwaters.jpg",
        description: "Houseboat cruises through tranquil canals and lagoons.",
      },
      {
        name: "Munnar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/df/Munnar_Hills.jpg",
        description: "Hill station famed for sprawling tea plantations.",
      },
      {
        name: "Padmanabhaswamy Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Padmanabhaswamy_Temple.jpg",
        description: "Ancient Vishnu temple with gold-covered sanctum.",
      },
    ],
    festivals: [
      {
        name: "Onam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kerala_Onam_Sadya.jpg",
        description:
          "Harvest festival featuring boat races, tiger dances, and flower carpets.",
      },
      {
        name: "Thrissur Pooram",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8b/Thrissur_Pooram_Festival.jpg",
        description:
          "Elephant procession and percussion ensembles at temple grounds.",
      },
      {
        name: "Pulikali",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/85/Pulikali_Performance.jpg",
        description: "Colorful tiger dance performed during Onam.",
      },
    ],
    traditionalDress: [
      {
        name: "Mundu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mundu_Traditional_Dress.jpg",
        description: "White wraparound garment with colored border.",
      },
      {
        name: "Kasavu Saree",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dd/Kasavu_Saree.jpg",
        description: "Cream saree with gold zari border.",
      },
    ],
  },
  "tamil-nadu": {
    name: "Tamil Nadu",
    description: `Land of ancient Dravidian culture, Tamil Nadu is famed for its towering temple gopurams, classical dance, and spicy Chettinad cuisine.`,
    history: `Tamil Nadu’s history stretches back to the Sangam period (3rd century BCE), dominated by the Chera, Chola and Pandya dynasties. Their monumental temple architecture and maritime trade shaped South Indian civilization. The Vijayanagara Empire and Nayak rulers continued this legacy until British annexation in the 18th century. Since independence, Tamil Nadu has been a leader in industry, education, and the arts.`,
    population: "78 million (2025 est.)",
    area: "130,058 km²",
    density: "600 people/km²",
    capital: "Chennai",
    region: "South India",
    coordinates: "13.0827° N, 80.2707° E",
    gdp: "$260 billion (2023 est.)",
    literacyRate: "80.3%",
    sexRatio: "996 ♀ per 1000 ♂",
    languages: ["Tamil", "English"],
    culture: `Home to classical Bharatanatyam dance, Carnatic music, and a rich tradition of temple festivals and Tamil literature stretching over two millennia.`,
    artForms: [
      {
        name: "Bharatanatyam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bharatanatyam_Performance.jpg",
        description:
          "One of India’s oldest classical dances, known for precise footwork and expressive hand gestures.",
      },
      {
        name: "Tanjore Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/28/Tanjore_painting.jpg",
        description:
          "Lustrous South Indian canvas paintings with gold foil and gem inlays.",
      },
      {
        name: "Kolam Art",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Kolam_designs.jpg",
        description:
          "Intricate rice‐flour patterns drawn at every doorstep at dawn to welcome prosperity.",
      },
    ],
    heritageSites: [
      {
        name: "Meenakshi Amman Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Meenakshi_Amman_Temple.jpg",
        description:
          "Madurai’s 17th‑century twin‑sanctum temple, famed for its colorful gopurams.",
      },
      {
        name: "Brihadeeswarar Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/01/Brihadeeswarar_Temple.jpg",
        description:
          "UNESCO‑listed 11th‑century Shiva temple built by Raja Raja Chola I in Thanjavur.",
      },
      {
        name: "Mahabalipuram",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/01/Mahabalipuram_temple.jpg",
        description:
          "Open‑air sea‑shore temple complex with rock‑cut caves and the Shore Temple.",
      },
    ],
    food: [
      {
        name: "Dosa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Masala_dosa.jpg",
        description:
          "Crispy fermented rice‑lentil crepe, often stuffed with spiced potatoes.",
      },
      {
        name: "Idli Sambar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/17/Idli_sambar.jpg",
        description:
          "Soft steamed rice cakes served with tangy lentil‑vegetable stew.",
      },
      {
        name: "Chettinad Chicken",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6e/Chettinad_Chicken.jpg",
        description:
          "A fiery chicken curry from the Chettinad region, spiced with black pepper and fennel.",
      },
    ],
    dances: [
      {
        name: "Bharatanatyam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bharatanatyam_Performance.jpg",
        description:
          "Temple dance characterized by geometric poses and facial storytelling.",
      },
      {
        name: "Karagattam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Karakattam.jpg",
        description:
          "Folk balancing dance using decorated water pots on the head.",
      },
      {
        name: "Kavadi Attam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Kavadi_Prayer.jpg",
        description:
          "A devotional dance performed by Murugan devotees bearing ornate “kavadi.”",
      },
    ],
    famousPlaces: [
      {
        name: "Marina Beach",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f6/Marina_Beach_Chennai.jpg",
        description:
          "One of the world’s longest urban beaches, stretching 13 km along Chennai’s coast.",
      },
      {
        name: "Ooty Hills",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/93/Ooty_Hill_Station.jpg",
        description:
          "Scenic hill station in the Nilgiris, famous for tea gardens and cool climate.",
      },
      {
        name: "Rameswaram",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/74/Rameshwaram_temple.jpg",
        description:
          "Island town with the ancient Ramanathaswamy Temple and sacred Agni Teertham beach.",
      },
    ],
    festivals: [
      {
        name: "Pongal",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Pongal_Dish.jpg",
        description:
          "Four‑day harvest festival thanking the sun god, celebrated with sweet rice dishes.",
      },
      {
        name: "Karthigai Deepam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d9/Karthigai_Deepam.jpg",
        description:
          "Festival of lights in November, with oil lamps lit at homes and temples.",
      },
      {
        name: "Chithirai Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/54/Chithirai_Festival.jpg",
        description:
          "Madurai’s two‑week April festival celebrating the Meenakshi–Sundareshwarar divine wedding.",
      },
    ],
    traditionalDress: [
      {
        name: "Veshti (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/90/Veshti_Traditional.jpg",
        description:
          "Cotton wraparound garment, often paired with an angavastram shawl.",
      },
      {
        name: "Kanchipuram Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/24/Kanchipuram_Saree.jpg",
        description:
          "Rich silk saree woven in Kanchipuram, famed for its gold zari motifs.",
      },
    ],
  },
  karnataka: {
    name: "Karnataka",
    description: `Land of lush coffee plantations, ancient ruins, and the Silicon Valley of India—Bengaluru.`,
    history: `Karnataka’s story spans the powerful Hoysalas (11th–14th c.) and the Vijayanagara Empire (14th–17th c.), whose splendid capital Hampi still stands. The region later came under Mysore’s Wodeyar dynasty and Tipu Sultan before joining the Indian Union in 1947. Today it’s a high‑tech hub and guardian of rich classical traditions.`,
    population: "70 million (2025 est.)",
    area: "191,791 km²",
    density: "365 people/km²",
    capital: "Bengaluru",
    region: "South India",
    coordinates: "12.9716° N, 77.5946° E",
    gdp: "$220 billion (2023 est.)",
    literacyRate: "75.4%",
    sexRatio: "973 ♀ per 1000 ♂",
    languages: ["Kannada", "English"],
    culture: `Karnataka weaves together Dravidian temple architecture, Carnatic music, and a vibrant folk heritage alongside a booming IT industry.`,
    artForms: [
      {
        name: "Yakshagana",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Yakshagana_Performance.jpg",
        description:
          "A night‑long folk theatre with elaborate makeup, music, and dance, depicting mythological tales.",
      },
      {
        name: "Dollu Kunitha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dollu_Kunitha.jpg",
        description:
          "A vigorous drum dance performed by men, traditionally in worship of local deities.",
      },
      {
        name: "Mysore Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Mysore_Painting.jpg",
        description:
          "Delicate classical paintings characterized by muted colors and gold leaf embellishments.",
      },
    ],
    heritageSites: [
      {
        name: "Hampi (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Hampi_Vijaya_Vittala_Temple.jpg",
        description:
          "Remains of the Vijayanagara Empire’s capital, with striking stone chariots and temples.",
      },
      {
        name: "Mysore Palace",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Mysore_Palace_Front_view.jpg",
        description:
          "The Wodeyar royal family’s ornate residence, famed for its Dasara illumination.",
      },
      {
        name: "Coorg (Kodagu)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coorg_scenery.jpg",
        description:
          "Mist‑clad hills and coffee estates, home to Kodava culture and natural springs.",
      },
    ],
    food: [
      {
        name: "Ragi Mudde",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3d/Ragi_mudde.jpg",
        description:
          "Nutritious millet balls typically served with spicy sambar or curry.",
      },
      {
        name: "Bisi Bele Bath",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/BisiBeleBath.jpg",
        description:
          "A hearty one‑pot dish of rice, lentils, vegetables and special spices.",
      },
      {
        name: "Mysore Pak",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Mysore_Pak.jpg",
        description:
          "Decadent gram flour fudge soaked in ghee, invented in Mysore’s royal kitchens.",
      },
    ],
    dances: [
      {
        name: "Yakshagana",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Yakshagana_Performance.jpg",
        description:
          "Fusion of dance, music, and dialogue in mythological storytelling.",
      },
      {
        name: "Dollu Kunitha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dollu_Kunitha.jpg",
        description:
          "Energetic drum beating and synchronized movements by men.",
      },
      {
        name: "Veeragase",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Veeragase_Karnataka.jpg",
        description:
          "A valorous dance dedicated to the fierce deity Nandi, with vibrant scarves and swords.",
      },
    ],
    famousPlaces: [
      {
        name: "Hampi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Hampi_Vijaya_Vittala_Temple.jpg",
        description:
          "Epic ruins set among giant boulders, reflecting a lost golden age.",
      },
      {
        name: "Mysore Palace",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Mysore_Palace_Front_view.jpg",
        description: "Icon of Indo‑Saracenic architecture and royal heritage.",
      },
      {
        name: "Coorg",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coorg_scenery.jpg",
        description:
          "Known as the “Scotland of India” for its rolling hills and misty valleys.",
      },
    ],
    festivals: [
      {
        name: "Dasara (Mysore)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Mysore_Dasara.jpg",
        description: "Ten‑day royal celebration with a grand elephant parade.",
      },
      {
        name: "Ugadi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ugadi_Festival.jpg",
        description:
          "Kannada New Year marked by festive food and cultural performances.",
      },
      {
        name: "Karaga",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Karaga_Bangalore.jpg",
        description:
          "Ancient folk festival honoring Draupadi, featuring a torch‑bearing procession.",
      },
    ],
    traditionalDress: [
      {
        name: "Panche (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Panche_Karnataka.jpg",
        description:
          "Traditional cotton wrap worn at the waist, often with a shirt.",
      },
      {
        name: "Ilkal Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Ilkal_Saree.jpg",
        description:
          "Handloom saree known for its distinctive red and white pallu.",
      },
    ],
  },
  maharashtra: {
    name: "Maharashtra",
    description: `Home to India’s financial capital Mumbai, Maharashtra boasts a vibrant film industry (Bollywood), historic cave temples, and the hill forts of the Maratha empire.`,
    history: `Maharashtra was the cradle of the Maratha Empire under Shivaji (17th century) and later a key region under Peshwas. Ancient Buddhist rock‑cut caves at Ajanta and Ellora date to 2nd century BCE. It became a British presidency, and post‑independence has emerged as one of India’s richest, most industrialized states.`,
    population: "124 million (2025 est.)",
    area: "307,713 km²",
    density: "403 people/km²",
    capital: "Mumbai",
    region: "West India",
    coordinates: "19.0760° N, 72.8777° E",
    gdp: "$400 billion (2023 est.)",
    literacyRate: "82.3%",
    sexRatio: "929 ♀ per 1000 ♂",
    languages: ["Marathi", "Hindi", "English"],
    culture: `A blend of Maratha valor and cosmopolitan urban culture, known for Lavani folk dance, Ganeshotsav street festivals, and a rich literary tradition in Marathi.`,
    artForms: [
      {
        name: "Lavani",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e2/Lavani_dance.jpg",
        description:
          "A fast‑paced folk dance with powerful rhythms, traditionally performed by women.",
      },
      {
        name: "Warli Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/27/Warli_art.jpg",
        description:
          "Tribal art from North Maharashtra using white pigment on earthen backgrounds.",
      },
      {
        name: "Pithora Art",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9b/Pithora_painting.jpg",
        description:
          "Ritual paintings by the Rathwa tribe, depicting deities and daily life.",
      },
    ],
    heritageSites: [
      {
        name: "Ajanta Caves (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/22/Ajanta_Caves.jpg",
        description:
          "2nd -century BCE Buddhist cave temples with exquisite frescoes.",
      },
      {
        name: "Ellora Caves (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/09/Ellora_Caves.jpg",
        description:
          "34 rock‑cut temples of Buddhist, Hindu, and Jain faiths dating 6th–10th centuries CE.",
      },
      {
        name: "Shaniwar Wada",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f6/Shaniwar_Wada.jpg",
        description:
          "18th‑century Maratha fortification in Pune, symbol of Peshwa rule.",
      },
    ],
    food: [
      {
        name: "Vada Pav",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ea/Vada_Pav.jpg",
        description:
          "Spicy potato fritter sandwiched in a bun, Mumbai’s iconic street food.",
      },
      {
        name: "Misal Pav",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Misal_Pav.jpg",
        description:
          "Hot sprouted bean curry served with bread rolls and farsan. ",
      },
      {
        name: "Puran Poli",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fb/Puran_Poli.jpg",
        description: "Sweet flatbread stuffed with lentil and jaggery mixture.",
      },
    ],
    dances: [
      {
        name: "Lavani",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e2/Lavani_dance.jpg",
        description:
          "Sensual, rhythm‑driven folk dance accompanied by dholki drums.",
      },
      {
        name: "Koli Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/17/Koli_Dance.jpg",
        description:
          "Fisherfolk dance mimicking boat movements, popular at Ganesh festivals.",
      },
      {
        name: "Lezim",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Lezim.jpg",
        description:
          "Energetic martial‑style dance with small rhythmic cymbals.",
      },
    ],
    famousPlaces: [
      {
        name: "Gateway of India",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/09/Gateway_of_India.jpg",
        description:
          "1930s basalt arch built to commemorate King George V’s visit.",
      },
      {
        name: "Marine Drive",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Marine_Drive.jpg",
        description:
          "Sweeping seaside boulevard known as the “Queen’s Necklace” at night.",
      },
      {
        name: "Elephanta Caves",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/28/Elephanta_Cave.jpg",
        description:
          "7th‑century rock‑cut Hindu cave temples on an island near Mumbai.",
      },
    ],
    festivals: [
      {
        name: "Ganesh Chaturthi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Ganesh_Chaturthi_Mumbai.jpg",
        description:
          "10‑day festival with public processions, marking Lord Ganesha’s birthday.",
      },
      {
        name: "Gudi Padwa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/75/Gudi_Padwa.jpg",
        description:
          "Maharashtrian New Year celebrated with decorated poles (gudi) outside homes.",
      },
      {
        name: "Diwali",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b6/Diwali_Lamps.jpg",
        description:
          "Festival of lights celebrated statewide with lamps, fireworks, and sweets.",
      },
    ],
    traditionalDress: [
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Maharashtra_Dhoti.jpg",
        description:
          "White dhoti and kurta combination, often with a Gandhi cap.",
      },
      {
        name: "Nauvari Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Nauvari_Saree.jpg",
        description:
          "Nine‑yard sari draped in a trouser style for ease of movement.",
      },
    ],
  },
  gujarat: {
    name: "Gujarat",
    description: `Land of vibrant Navratri dances, the Gir lions, and the stark white salt flats of the Rann of Kutch.`,
    history: `Gujarat was home to the ancient Indus Valley Civilization’s port city of Lothal (2500 BCE) and later the cradle of Mahatma Gandhi’s independence movement. From Sultanate rule in the 15th century to Mughal governors and Maratha chieftains, it became a British presidency before joining India in 1947.`,
    population: "71 million (2025 est.)",
    area: "196,024 km²",
    density: "362 people/km²",
    capital: "Gandhinagar",
    region: "West India",
    coordinates: "23.2156° N, 72.6369° E",
    gdp: "$200 billion (2023 est.)",
    literacyRate: "78.0%",
    sexRatio: "918 ♀ per 1000 ♂",
    languages: ["Gujarati", "Hindi", "English"],
    culture: `A tapestry of Jain heritage, folk traditions, and progressive commerce—Gujarat excels in entrepreneurship, handicrafts, and festive dance.`,
    artForms: [
      {
        name: "Bandhani Textiles",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bandhani.jpg",
        description:
          "Tie‑dye fabric in intricate patterns, produced in Kutch and Saurashtra.",
      },
      {
        name: "Patola Silk",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1b/Patola_Saree.jpg",
        description:
          "Double‑ikat woven silk sarees from Patan, prized for their geometric motifs.",
      },
      {
        name: "Mud Art (Pithora)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fc/Pithora.jpg",
        description:
          "Tribal wall paintings using natural pigments, celebrating local deities.",
      },
    ],
    heritageSites: [
      {
        name: "Rann of Kutch",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f9/Rann_of_Kutch.jpg",
        description:
          "Vast white salt desert that floods in the monsoon, famous for the Rann Utsav festival.",
      },
      {
        name: "Gir National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/Gir_National_Park_Lion.jpg",
        description:
          "Last refuge of the Asiatic lion, with guided safari tours.",
      },
      {
        name: "Somnath Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Somnath_Temple.jpg",
        description:
          "Ancient Shiva temple on the Arabian Sea coast, rebuilt multiple times since antiquity.",
      },
    ],
    food: [
      {
        name: "Dhokla",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Khaman_Dhokla.jpg",
        description:
          "Steamed gram‑based savory cake, often served with chutney.",
      },
      {
        name: "Undhiyu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/71/Undhiyu_Gujarati_dish.jpg",
        description:
          "Mixed vegetable stew cooked upside‑down in an earthen pot, a winter specialty.",
      },
      {
        name: "Fafda & Jalebi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b6/Fafda_Jalebi.jpg",
        description:
          "Crispy gram flour sticks paired with sweet spiral jalebis for a balanced snack.",
      },
    ],
    dances: [
      {
        name: "Garba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f1/Garba_Gujarat.jpg",
        description:
          "Circle dance around a centrally‑lit lamp, performed during Navratri.",
      },
      {
        name: "Dandiya Raas",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/27/Dandiya_Raas.jpg",
        description:
          "Energetic stick dance symbolizing Shiva and Shakti’s battle, also a Navratri staple.",
      },
      {
        name: "Bhavai",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Bhavai_dance.jpg",
        description:
          "Acrobatic folk performance where dancers balance pots on their heads.",
      },
    ],
    famousPlaces: [
      {
        name: "Statue of Unity",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/Statue_of_Unity.jpg",
        description:
          "180 m statue of Sardar Vallabhbhai Patel, the world’s tallest sculpture.",
      },
      {
        name: "Champaner-Pavagadh",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6b/Champaner_Pavagadh.jpg",
        description:
          "UNESCO site with a fortified city and hilltop temple complex.",
      },
      {
        name: "Saputara",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Saputara.jpg",
        description:
          "Hill station in the Sahyadri range, known for lake boating and tribal culture.",
      },
    ],
    festivals: [
      {
        name: "Navratri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fc/Navratri_Garba.jpg",
        description:
          "Nine‑night festival of dance, worshipping the goddess Amba.",
      },
      {
        name: "Uttarayan",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Uttarayan_Kite.jpg",
        description:
          "International Kite Festival celebrated on 14 January, marking winter’s end.",
      },
      {
        name: "Rann Utsav",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Rann_Utsav.jpg",
        description:
          "Cultural festival in the Rann of Kutch with crafts, music, and camel rides.",
      },
    ],
    traditionalDress: [
      {
        name: "Kediyu & Chorno (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/54/Kediyu_Chorno.jpg",
        description:
          "Embroidered short jacket (kediyu) and wide trousers (chorno).",
      },
      {
        name: "Chaniya Choli (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/Chaniya_Choli.jpg",
        description:
          "Colorful flared skirt (chaniya), blouse (choli) and mirror‑work dupatta.",
      },
    ],
  },
  rajasthan: {
    name: "Rajasthan",
    description: `The Land of Kings—Rajasthan dazzles with its desert forts, colorful festivals, and storied warrior traditions.`,
    history: `From the Rajput kingdoms of the 7th century to Mughal alliances and British vassalage, Rajasthan’s hilltop forts at Amber, Chittorgarh, and Jaisalmer stand testament to a legacy of valor. Post-independence, it unified 22 princely states into India’s largest state by area.`,
    population: "82 million (2025 est.)",
    area: "342,239 km²",
    density: "240 people/km²",
    capital: "Jaipur",
    region: "North India",
    coordinates: "26.9124° N, 75.7873° E",
    gdp: "$60 billion (2023 est.)",
    literacyRate: "66.1%",
    sexRatio: "928 ♀ per 1000 ♂",
    languages: ["Hindi", "Rajasthani", "English"],
    culture: `Rajasthan’s vibrant culture shines in its folk music (Maand, Panihari), vivid turbans, and the heroic tales of Rajput valor preserved in oral epics.`,
    artForms: [
      {
        name: "Pichwai Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/33/Pichwai_art.jpg",
        description:
          "Elaborate miniature paintings on cloth depicting Krishna’s life, produced around Nathdwara.",
      },
      {
        name: "Blue Pottery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/Blue_pottery_Rajasthan.jpg",
        description:
          "Glazed ceramic ware made with quartz and imported by the Mughals, popular in Jaipur.",
      },
      {
        name: "Block Printing",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f0/Rajasthan_block_print.jpg",
        description:
          "Traditional hand‑carved wooden blocks used to print vibrant patterns on textiles.",
      },
    ],
    heritageSites: [
      {
        name: "Amber Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/10/Amber_Fort.jpg",
        description:
          "Hilltop fort-palace overlooking the Maota Lake, built by Raja Man Singh in the 16th century.",
      },
      {
        name: "Jaisalmer Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/79/Jaisalmer_Fort.jpg",
        description:
          "“Golden Fort” rising from the Thar Desert, home to ancient Jain temples.",
      },
      {
        name: "City Palace, Udaipur",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/City_Palace_Udaipur.jpg",
        description:
          "Ornate palace complex on Lake Pichola, blending Rajput and Mughal architectural styles.",
      },
    ],
    food: [
      {
        name: "Dal Baati Churma",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9d/Dal_Baati_Churma.jpg",
        description:
          "Hard wheat rolls (baati) served with spiced lentils (dal) and sweet crushed wheat (churma).",
      },
      {
        name: "Gatte ki Sabzi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Gatte_ki_sabzi.jpg",
        description: "Gram flour dumplings cooked in a tangy yogurt gravy.",
      },
      {
        name: "Ker Sangri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a5/Ker_Sangri.jpg",
        description:
          "Desert berry and bean stir-fry, unique to the Thar region.",
      },
    ],
    dances: [
      {
        name: "Ghoomar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Ghoomar_dance.jpg",
        description:
          "Graceful spinning dance performed by women in flowing gowns (ghagra).",
      },
      {
        name: "Kalbeliya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Kalbeliya_Dance.jpg",
        description:
          "Snake-charming community dance with fluid, swaying movements.",
      },
      {
        name: "Chari Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Chari_dance_Rajasthan.jpg",
        description:
          "Women balance decorated brass pitchers (chari) on their heads while dancing.",
      },
    ],
    famousPlaces: [
      {
        name: "Thar Desert",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Thar_Desert.jpg",
        description:
          "Vast arid expanse with camel safaris and sand dunes near Jaisalmer.",
      },
      {
        name: "Lake Palace (Jag Niwas)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/02/Lake_Palace_Udaipur.jpg",
        description:
          "White marble palace floating on Lake Pichola, now a luxury hotel.",
      },
      {
        name: "Pushkar Lake",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/95/Pushkar_Panorama.jpg",
        description:
          "Sacred lake ringed by 52 ghats, site of the annual camel fair.",
      },
    ],
    festivals: [
      {
        name: "Pushkar Camel Fair",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d9/Pushkar_Camel_Fair.jpg",
        description:
          "Annual livestock trading fair with folk performances in November.",
      },
      {
        name: "Desert Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/78/Jaisalmer_Desert_Festival.jpg",
        description:
          "Three-day cultural extravaganza with folk music, dances, and camel races.",
      },
      {
        name: "Teej",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/Teej_celebration.jpg",
        description:
          "Monsoon festival celebrating marital bliss, with swings and songs.",
      },
    ],
    traditionalDress: [
      {
        name: "Angrakha & Dhoti (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3a/Angrakha_Dhoti_Rajasthan.jpg",
        description: "Overlap tunic (angrakha) paired with draped dhoti.",
      },
      {
        name: "Ghagra Choli (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ghagra_Choli_Rajasthan.jpg",
        description:
          "Embroidered skirt (ghagra) and blouse (choli) with mirror work.",
      },
    ],
  },
  "west-bengal": {
    name: "West Bengal",
    description: `Land of literature, art, sweets, and grand Durga Puja celebrations alongside the Sunderbans mangrove delta.`,
    history: `West Bengal’s heritage stretches from the Mauryan and Gupta empires to the Pala and Sena dynasties, later the seat of British Bengal Presidency. It was the center of the Bengal Renaissance in the 19th century and key to India’s independence movement.`,
    population: "101 million (2025 est.)",
    area: "88,752 km²",
    density: "1,139 people/km²",
    capital: "Kolkata",
    region: "East India",
    coordinates: "22.5726° N, 88.3639° E",
    gdp: "$150 billion (2023 est.)",
    literacyRate: "76.3%",
    sexRatio: "947 ♀ per 1000 ♂",
    languages: ["Bengali", "Hindi", "English"],
    culture: `Home of Rabindra Sangeet, Baul mystic minstrels, and a storied film and literary tradition in Bengali.`,
    artForms: [
      {
        name: "Kalighat Paintings",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/cf/Kalighat_painting.jpg",
        description:
          "19th‑century folk art from Kolkata with bold brushwork and social themes.",
      },
      {
        name: "Terracotta Temple Reliefs",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Terracotta_temple_Kalna.jpg",
        description:
          "Intricate baked‑clay panels on temples in Bishnupur region.",
      },
      {
        name: "Kantha Embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Kantha_sari.jpg",
        description:
          "Recycled‑cotton quilts and saris decorated with running‑stitch motifs.",
      },
    ],
    heritageSites: [
      {
        name: "Sundarbans National Park (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fe/Sundarbans.jpg",
        description:
          "The world’s largest mangrove forest, home to the royal Bengal tiger.",
      },
      {
        name: "Victoria Memorial",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e6/Victoria_Memorial_Kolkata.jpg",
        description:
          "White marble monument built in memory of Queen Victoria, now a museum.",
      },
      {
        name: "Darjeeling Himalayan Railway (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Darjeeling_himalayan_railway.jpg",
        description:
          "“Toy train” steam railway climbing the foothills of the Himalayas.",
      },
    ],
    food: [
      {
        name: "Shorshe Ilish",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3e/Shorshe_Ilish.jpg",
        description: "Hilsa fish cooked in a pungent mustard gravy.",
      },
      {
        name: "Luchi & Aloo Dum",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d7/Luchi_Aloo_Dum.jpg",
        description: "Deep‑fried flatbreads served with spiced potato curry.",
      },
      {
        name: "Mishti Doi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/59/Mishti_Doi.jpg",
        description: "Caramelized earthen yogurt, a Bengali sweet staple.",
      },
    ],
    dances: [
      {
        name: "Chhau",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Chhau_Dance.jpg",
        description: "Mask‑based martial folk dance from Purulia district.",
      },
      {
        name: "Baul",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c3/Baul_Singer.jpg",
        description:
          "Mystic minstrels who sing devotional songs with ektara accompaniment.",
      },
      {
        name: "Rabindra Nritya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b9/Rabindra_Nritya.jpg",
        description:
          "Interpretive dance dramas set to Tagore’s music and poetry.",
      },
    ],
    famousPlaces: [
      {
        name: "Howrah Bridge",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Howrah_Bridge.jpg",
        description:
          "Iconic cantilever bridge spanning the Hooghly River in Kolkata.",
      },
      {
        name: "Victoria Memorial",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e6/Victoria_Memorial_Kolkata.jpg",
        description: "Grand colonial monument set in lush gardens.",
      },
      {
        name: "Darjeeling",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Darjeeling.jpg",
        description:
          "Hill station famed for tea plantations and panoramic Himalayan views.",
      },
    ],
    festivals: [
      {
        name: "Durga Puja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/01/Durga_Puja_Kolkata.jpg",
        description:
          "Five‑day autumn festival with towering idols and city‑wide celebrations.",
      },
      {
        name: "Poila Boishakh",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a6/Poila_Boishakh.jpg",
        description:
          "Bengali New Year celebrated with fairs, music, and new clothes.",
      },
      {
        name: "Rath Yatra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Rath_Yatra_Kolkata.jpg",
        description:
          "Chariot festival of Jagannath celebrated in Midnapore region.",
      },
    ],
    traditionalDress: [
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Bengali_Dhoti_Kurta.jpg",
        description:
          "Traditional dhoti paired with a kurtа and topor during festivities.",
      },
      {
        name: "Tant Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/13/Tant_Saree.jpg",
        description:
          "Lightweight cotton saree with broad borders, ideal for the humid climate.",
      },
    ],
  },
  "uttar-pradesh": {
    name: "Uttar Pradesh",
    description: `India’s most populous state, Uttar Pradesh is the spiritual heartland—home to Varanasi’s ghats, the Taj Mahal, and a rich tapestry of Mughal and Hindu heritage.`,
    history: `UP’s history spans the Mauryan Empire (capital at Patliputra), the Gupta Golden Age, and the Mughal era with Agra as its seat. It later formed part of the British United Provinces. Post-independence, it has remained a political and cultural powerhouse.`,
    population: "240 million (2025 est.)",
    area: "243,286 km²",
    density: "986 people/km²",
    capital: "Lucknow",
    region: "North India",
    coordinates: "26.8467° N, 80.9462° E",
    gdp: "$220 billion (2023 est.)",
    literacyRate: "67.7%",
    sexRatio: "912 ♀ per 1000 ♂",
    languages: ["Hindi", "Urdu", "English"],
    culture: `A cradle of Hindustani classical music and Kathak dance, UP hosts the Kumbh Mela in Allahabad and the vibrant saree traditions of Banaras.`,
    artForms: [
      {
        name: "Kathak",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ed/Kathak_dancer.jpg",
        description:
          "Classical dance of North India, known for intricate footwork and spins, developed in the Mughal courts.",
      },
      {
        name: "Banarasi Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e4/Banarasi_Saree.jpg",
        description:
          "Luxurious silk saris from Varanasi, woven with fine gold and silver brocade.",
      },
      {
        name: "Chikankari Embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7e/Chikankari_garment.jpg",
        description:
          "Delicate white-on-white hand embroidery, originating in Lucknow.",
      },
    ],
    heritageSites: [
      {
        name: "Taj Mahal (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Taj_Mahal_Main_View.jpg",
        description:
          "17th‑century marble mausoleum built by Shah Jahan in memory of Mumtaz Mahal.",
      },
      {
        name: "Varanasi Ghats",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Assi_Ghat_Varanasi.jpg",
        description:
          "Steps leading to the Ganges, where pilgrims perform rituals and boat rides at dawn.",
      },
      {
        name: "Agra Fort (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fb/Red_Fort_Agra.jpg",
        description:
          "Red‑sandstone fortress and UNESCO site, once the main residence of the Mughal emperors.",
      },
    ],
    food: [
      {
        name: "Tunday Kabab",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Tunday_Kabab.jpg",
        description:
          "Soft spiced mince‑kebabs from Lucknow, famous for their secret masala blend.",
      },
      {
        name: "Bedhai & Aloo Sabzi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d7/Bedhai_Aloo.jpg",
        description:
          "Deep‑fried bread (bedhai) served with spicy potato curry, a popular breakfast in Varanasi.",
      },
      {
        name: "Agra Petha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/bb/Agra_Petha.jpg",
        description:
          "Crystalized ash gourd sweet, often flavored with saffron or cardamom.",
      },
    ],
    dances: [
      {
        name: "Kathak",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ed/Kathak_dancer.jpg",
        description:
          "Court dance of the Mughals, telling stories through expressive gestures and footwork.",
      },
      {
        name: "Raslila",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/11/Raslila_Performance.jpg",
        description:
          "Dramatic enactment of Krishna’s life, popular in Braj region around Mathura and Vrindavan.",
      },
      {
        name: "Ram Leela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Ramlila_Kanpur.jpg",
        description:
          "Street‑theatre performances of the Ramayana, staged across the state during autumn.",
      },
    ],
    famousPlaces: [
      {
        name: "Lucknow",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/Imambara_Lucknow.jpg",
        description:
          "City of Nawabs, acclaimed for its Imambaras, Chaikhanas, and refined culture.",
      },
      {
        name: "Mathura & Vrindavan",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Krishna_temple_Mathura.jpg",
        description:
          "Twin holy towns on the Yamuna, birth‑place of Krishna and pilgrimage sites.",
      },
      {
        name: "Fatehpur Sikri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/13/Fatehpur_Sikri_Buland_Darwaza.jpg",
        description:
          "UNESCO city of red stone palaces and mosques built by Akbar as his capital.",
      },
    ],
    festivals: [
      {
        name: "Kumbh Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2a/Kumbh_mela_2013.jpg",
        description:
          "Largest religious gathering on Earth, held every 12 years at Allahabad (Prayagraj).",
      },
      {
        name: "Holi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Holi_Celebration.jpg",
        description:
          "Festival of colors celebrated in Braj region with vibrant zeal.",
      },
      {
        name: "Ram Leela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Ramlila_Kanpur.jpg",
        description:
          "Epic enactment of Ramayana, culminating in Vijayadashami (Dussehra) fireworks.",
      },
    ],
    traditionalDress: [
      {
        name: "Kurta Pyjama (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/bf/Kurta_Pyjama.jpg",
        description:
          "Comfortable cotton kurta and pyjama, often worn with a Nehru jacket.",
      },
      {
        name: "Banarasi Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e4/Banarasi_Saree.jpg",
        description:
          "Rich silk saree from Varanasi, known for its intricate brocades and zari work.",
      },
    ],
  },
  uttarakhand: {
    name: "Uttarakhand",
    description: `Called the “Land of the Gods,” Uttarakhand is famed for its alpine meadows, sacred Himalayan shrines, and biodiversity hotspots.`,
    history: `Carved out of Uttar Pradesh in 2000, Uttarakhand encompasses the ancient kingdoms of Garhwal and Kumaon. Home to Hindu pilgrimage sites like Badrinath and Kedarnath, it has long been a crossroads of spirituality and mountain culture.`,
    population: "11 million (2025 est.)",
    area: "53,483 km²",
    density: "206 people/km²",
    capital: "Dehradun",
    region: "North India",
    coordinates: "30.3165° N, 78.0322° E",
    gdp: "$35 billion (2023 est.)",
    literacyRate: "78.8%",
    sexRatio: "963 ♀ per 1000 ♂",
    languages: ["Hindi", "Garhwali", "Kumaoni", "English"],
    culture: `A blend of Kumaoni and Garhwali traditions, Uttarakhand celebrates folk music, mountain festivals, and a strong ethos of Himalayan stewardship.`,
    artForms: [
      {
        name: "Pahari Miniature Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nainital_painting.jpg",
        description:
          "Delicate 17th–19th c. paintings from the Garhwal/Kumaon hills, often illustrating local legends.",
      },
      {
        name: "Wood Carving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/56/Himalayan_woodwork.jpg",
        description:
          "Intricate carvings on deodar and walnut wood used in temples and traditional homes.",
      },
      {
        name: "Wool Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Himalayan_wool_cloth.jpg",
        description:
          "Handloom shawls and rugs woven from Himalayan sheep wool.",
      },
    ],
    heritageSites: [
      {
        name: "Jim Corbett National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9f/Corbett_Tiger.jpg",
        description:
          "India’s oldest national park, established in 1936 to protect the Bengal tiger.",
      },
      {
        name: "Valley of Flowers (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2a/Valley_of_Flowers.jpg",
        description:
          "Alpine valley of endemic flora and cascading streams in Garhwal Himalayas.",
      },
      {
        name: "Haridwar Ghats",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Haridwar_Ghat.jpg",
        description:
          "Series of riverfront steps where pilgrims gather for the Ganga Aarti at dusk.",
      },
    ],
    food: [
      {
        name: "Aloo ke Gutke",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Aloo_ke_Gutke.jpg",
        description: "Spicy stir‑fried potatoes, a Kumaoni breakfast staple.",
      },
      {
        name: "Bal Mithai",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3d/Bal_Mithai.jpg",
        description:
          "Brown sugary fudge balls coated in sugar beads, unique to Kumaon region.",
      },
      {
        name: "Kafuli",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Kafuli.jpg",
        description:
          "Spinach and fenugreek-based stew, slow‑cooked with mild spices.",
      },
    ],
    dances: [
      {
        name: "Chholiya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4a/Chholiya_dance.jpg",
        description:
          "Ritual sword dance performed to bless weddings in Kumaon.",
      },
      {
        name: "Auli Folk Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8d/Auli_dance.jpg",
        description:
          "Graceful dance of Garhwal shepherds celebrating mountain life.",
      },
      {
        name: "Jhoda Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Jhoda_dance.jpg",
        description:
          "Energetic stick dance from the Shauka tribal communities.",
      },
    ],
    famousPlaces: [
      {
        name: "Nainital",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Nainital_Lake.jpg",
        description:
          "Hill station built around a crescent‑shaped lake at 2,084 m altitude.",
      },
      {
        name: "Badrinath Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Badrinath_Temple.jpg",
        description:
          "One of Char Dham pilgrimage sites, dedicated to Lord Vishnu in the high Himalayas.",
      },
      {
        name: "Kedarnath",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kedarnath_Temple.jpg",
        description:
          "Ancient Shiva temple located above the Mandakini River at 3,583 m.",
      },
    ],
    festivals: [
      {
        name: "Kumbh Mela (Haridwar)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Haridwar_Kumbh.jpg",
        description:
          "Massive pilgrimage taking place every 12 years on the Ganges banks.",
      },
      {
        name: "Nanda Devi Raj Jat",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c7/Nanda_Devi_Raj_Jat.jpg",
        description:
          "Quadrennial procession honoring goddess Nanda Devi across the Himalayas.",
      },
      {
        name: "Ganga Dussehra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/29/Ganga_Dussehra_Celebration.jpg",
        description:
          "Celebration of the Ganges descent, marked by boat processions and Aarti.",
      },
    ],
    traditionalDress: [
      {
        name: "Pahari Pichhila",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8e/Pahari_Pichhila.jpg",
        description:
          "Garhwali women’s ankle‑length woolen gown, often embroidered.",
      },
      {
        name: "Achkan and Churidaar (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/20/Achkan_churidar.jpg",
        description:
          "Knee‑length coat with tight‑fitting trousers, worn with a woolen shawl.",
      },
    ],
  },
  "andhra-pradesh": {
    name: "Andhra Pradesh",
    description: `Land of the Telugu people, Andhra Pradesh is renowned for its ancient temples, spicy cuisine, and the classical dance form Kuchipudi.`,
    history: `The region’s history dates to the Satavahana dynasty (2nd c. BCE–3rd c. CE) and later the Eastern Chalukyas and Vijayanagara Empire, whose capital at Vijayanagaram influenced South Indian culture. Post-independence, Andhra Pradesh was the first state formed on a linguistic basis in 1953.`,
    population: "54 million (2025 est.)",
    area: "162,975 km²",
    density: "331 people/km²",
    capital: "Amaravati (de facto), Hyderabad (shared until 2024)",
    region: "South India",
    coordinates: "15.9129° N, 79.7400° E",
    gdp: "$135 billion (2023 est.)",
    literacyRate: "66.4%",
    sexRatio: "992 ♀ per 1000 ♂",
    languages: ["Telugu", "Urdu", "English"],
    culture: `A blend of Dravidian temple arts and coastal maritime traditions, Andhra Pradesh excels in Carnatic music, Kuchipudi dance, and a rich literary heritage in Telugu.`,
    artForms: [
      {
        name: "Kuchipudi Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/37/Kuchipudi_Dancer.jpg",
        description:
          "A graceful classical dance form combining drama, music, and intricate footwork, originating in the village of Kuchipudi.",
      },
      {
        name: "Etikoppaka Toys",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d8/Etikoppaka_toys.jpg",
        description:
          "Colorful lacquered wooden toys handcrafted in Etikoppaka, using natural dyes.",
      },
      {
        name: "Mangalagiri Saree",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f0/Mangalagiri_saree.jpg",
        description:
          "Hand‑woven cotton sarees from Mangalagiri, noted for their durability and simple but elegant borders.",
      },
    ],
    heritageSites: [
      {
        name: "Tirupati Balaji Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f6/Tirumala_Temple_AP.jpg",
        description:
          "One of the world’s most visited Hindu pilgrimage sites, dedicated to Lord Venkateswara.",
      },
      {
        name: "Lepakshi Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/25/Lepakshi_Nandi.jpg",
        description:
          "16th‑century Vijayanagara temple famous for its hanging pillar and monolithic Nandi statue.",
      },
      {
        name: "Amarapura Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5b/Amarapura_Fort.jpg",
        description:
          "Historic capital of the Satavahanas with extensive archaeological remains.",
      },
    ],
    food: [
      {
        name: "Pulihora",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Pulihora.jpg",
        description:
          "Tamarind‑rice dish flavored with curry leaves, peanuts, and chillies, often called “tamarind rice.”",
      },
      {
        name: "Gongura Pachadi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Gongura_Chutney_AP.jpg",
        description:
          "Tangy chutney made from sorrel leaves, a quintessential Andhra delicacy.",
      },
      {
        name: "Kodi Kura",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/68/Kodi_Kura.jpg",
        description:
          "Spicy chicken curry with native Andhra masalas, typically served with rice or rotis.",
      },
    ],
    dances: [
      {
        name: "Kuchipudi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/37/Kuchipudi_Dancer.jpg",
        description:
          "Devotional dance‑drama featuring both group and solo performances.",
      },
      {
        name: "Kolattam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/17/Kolattam.jpg",
        description:
          "Stick dance performed during festivals, involving rhythmic striking of sticks in time with songs.",
      },
      {
        name: "Kummi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6c/Kummi_dance.jpg",
        description:
          "Simple folk dance by women in circles, clapping hands to musical rhythms.",
      },
    ],
    famousPlaces: [
      {
        name: "Vijayawada Kanaka Durga Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e7/Kanaka_Durga_Temple.jpg",
        description:
          "Hilltop shrine dedicated to Goddess Durga, perched on Indrakeeladri Hill.",
      },
      {
        name: "Rajahmundry Godavari Bridge",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/ad/Rajahmundry_bridge.jpg",
        description:
          "One of the longest road‑cum‑rail bridges in India, spanning the Godavari River.",
      },
      {
        name: "Araku Valley",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/97/Araku_Valley.jpg",
        description:
          "Scenic hill station known for coffee plantations and tribal arts.",
      },
    ],
    festivals: [
      {
        name: "Ugadi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Ugadi_Celebration.jpg",
        description:
          "Telugu New Year festival marked by fresh mango leaves and neem flower chutney.",
      },
      {
        name: "Makar Sankranti",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Sankranti_Bonfire_AP.jpg",
        description:
          "Harvest festival featuring kite flying and sesame seeds sweets.",
      },
      {
        name: "Vijaya Dashami",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fd/Durga_Puja.jpg",
        description:
          "Puppet shows and processions celebrating the triumph of good over evil.",
      },
    ],
    traditionalDress: [
      {
        name: "Panche & Shirt (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ef/Panche_Kattu.jpg",
        description:
          "Traditional wrap for men, paired with simple cotton shirts.",
      },
      {
        name: "Pochampally Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fc/Pochampally_Saree.jpg",
        description: "Ikat‑pattern silk saree woven in the Pochampally region.",
      },
    ],
  },
  "arunachal-pradesh": {
    name: "Arunachal Pradesh",
    description: `Known as the “Land of the Dawn-Lit Mountains,” Arunachal Pradesh is celebrated for its stunning Himalayan scenery, over 26 distinct tribal cultures, and pristine rivers.`,
    history: `Arunachal Pradesh’s indigenous tribes trace their roots back millennia, with cultural exchanges along ancient trade routes to Tibet and Assam. It became a Union Territory in 1972 and full statehood in 1987, while remaining one of India’s most ethnically diverse regions.`,
    population: "1.8 million (2025 est.)",
    area: "83,743 km²",
    density: "22 people/km²",
    capital: "Itanagar",
    region: "North East India",
    coordinates: "28.2170° N, 94.7278° E",
    gdp: "$8 billion (2023 est.)",
    literacyRate: "65.4%",
    sexRatio: "938 ♀ per 1000 ♂",
    languages: ["English", "Hindi", "Tribal languages"],
    culture: `A mosaic of tribal traditions—Nocte, Adi, Nyshi, Galo and many more—Arunachal blends folk music, colorful festivals, and distinctive handicrafts.`,
    artForms: [
      {
        name: "Tribal Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Shingka_AP.jpg",
        description:
          "Handwoven textiles in vibrant patterns produced by tribes like the Adi and Apatani.",
      },
      {
        name: "Bamboo Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/db/Apong_Rice_Beer.jpg",
        description:
          "Intricate baskets, furniture and utensils made from locally sourced bamboo.",
      },
      {
        name: "Mask Carving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ponung_Dance.jpg",
        description:
          "Wooden ritual masks carved for tribal ceremonies and dances.",
      },
    ],
    heritageSites: [
      {
        name: "Tawang Monastery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fb/Tawang_Monastery.jpg",
        description:
          "One of the world’s highest Buddhist monasteries, founded in 1680 at 3,000 m altitude.",
      },
      {
        name: "Ziro Valley (UNESCO Tentative)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/Ziro_Valley.jpg",
        description:
          "Famous for rice fields, pine forests, and the Apatani cultural landscape.",
      },
      {
        name: "Sela Pass",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6c/Sela_Pass.jpg",
        description:
          "High mountain pass at 4,170 m offering panoramic snow‑clad peaks and lakes.",
      },
    ],
    food: [
      {
        name: "Thukpa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f6/Thukpa_Arunachal.jpg",
        description:
          "Hearty noodle soup with vegetables, herbs, and occasional yak meat.",
      },
      {
        name: "Apong (Rice Beer)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/db/Apong_Rice_Beer.jpg",
        description:
          "Fermented rice beverage brewed by various tribes for festivals and rituals.",
      },
      {
        name: "Galho",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Assamese_Dhoti_Kurta.jpg",
        description:
          "One‑pot rice and vegetable khichdi, seasoned with local herbs.",
      },
    ],
    dances: [
      {
        name: "Ponung",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ponung_Dance.jpg",
        description:
          "Graceful harvest dance performed by the Apatani tribe during spring festivals.",
      },
      {
        name: "Reh",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/Gale_AP.jpg",
        description:
          "Hornbill Festival dance of the Wancho tribe featuring headgear with horns.",
      },
      {
        name: "Boju",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/64/Solung_Festival_AP.jpg",
        description:
          "Festival dance of the Bugun tribe invoking gods for a bountiful harvest.",
      },
    ],
    famousPlaces: [
      {
        name: "Namdapha National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/29/Namdapha.jpg",
        description:
          "India’s largest protected area of eastern Himalaya, home to unique fauna like snow leopard.",
      },
      {
        name: "Kamlang Wildlife Sanctuary",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Kamlang.jpg",
        description:
          "Biodiverse sanctuary in Changlang district protecting rare mammals and orchids.",
      },
      {
        name: "Parashuram Kund",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Kamakhya_Temple_Guwahati.jpg",
        description:
          "Pilgrim site on the Lohit River known for a legend of Lord Parashurama’s penance.",
      },
    ],
    festivals: [
      {
        name: "Losar Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/11/Losar_AP.jpg",
        description:
          "Tibetan New Year celebrated by Monpa and Sherdukpen communities in February.",
      },
      {
        name: "Solung",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/64/Solung_Festival_AP.jpg",
        description:
          "A four‑day festival of the Adi tribe in September, offering prayers for prosperity.",
      },
      {
        name: "Mopin",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/22/Mopin_Galo.jpg",
        description:
          "Spring harvest festival of the Galo tribe, featuring rice beer and mask dances.",
      },
    ],
    traditionalDress: [
      {
        name: "Gale",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/Gale_AP.jpg",
        description:
          "Men’s shawl-like garment with bold tribal motifs, worn during festivals.",
      },
      {
        name: "Shing-ka",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Shingka_AP.jpg",
        description:
          "Women’s traditional dress—a long wrap‑around garment secured with a belt.",
      },
    ],
  },
  assam: {
    name: "Assam",
    description: `Famous for its emerald tea gardens, mighty Brahmaputra River, and the one‑horned rhinoceros of Kaziranga.`,
    history: `Assam was the seat of the Ahom dynasty (1228–1826), which successfully resisted Mughal expansion. Earlier, the Kamarupa kingdoms flourished here from the 4th century CE. It became a British province in 1838 and joined the Indian Union in 1947.`,
    population: "36 million (2025 est.)",
    area: "78,438 km²",
    density: "460 people/km²",
    capital: "Dispur",
    region: "North East India",
    coordinates: "26.1445° N, 91.7362° E",
    gdp: "$40 billion (2023 est.)",
    literacyRate: "73.2%",
    sexRatio: "958 ♀ per 1000 ♂",
    languages: ["Assamese", "Bodo", "Bengali", "English"],
    culture: `A vibrant mix of tribal and plains cultures, Assam is known for Bihu music and dance, rich silk weaving, and a culinary palette featuring freshwater fish.`,
    artForms: [
      {
        name: "Sualkuchi Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9d/Sualkuchi_sari.jpg",
        description:
          "Fine Muga and Pat silk sarees woven in the “Manchester of Assam,” Sualkuchi.",
      },
      {
        name: "Jaapi & Mask Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Assam_jaapi.jpg",
        description:
          "Traditional conical hats and theatrical masks hand‑crafted from cane and bamboo.",
      },
      {
        name: "Xorai Metalware",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d6/Xorai_silverware.jpg",
        description:
          "Brass trays and offering vessels used in ceremonies, known as xorai.",
      },
    ],
    heritageSites: [
      {
        name: "Kaziranga National Park (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kaziranga_Rhino.jpg",
        description:
          "World heritage site renowned for its population of Indian one‑horned rhinoceros.",
      },
      {
        name: "Majuli Island",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/26/Majuli_Island.jpg",
        description:
          "Largest river island in the world, a center for Vaishnavite satras (monastic institutions).",
      },
      {
        name: "Kamakhya Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Kamakhya_Temple_Guwahati.jpg",
        description:
          "Ancient Shaktipeeth atop Nilachal Hill in Guwahati, famed for its annual Ambubachi Mela.",
      },
    ],
    food: [
      {
        name: "Masor Tenga",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/55/Masor_Tenga.jpg",
        description:
          "Light, tangy fish curry flavored with tomatoes or elephant apple.",
      },
      {
        name: "Duck Curry (Khorikat)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Assamese_duck_curry.jpg",
        description:
          "Roasted bamboo shoot duck curry, a Ahom‑inspired delicacy.",
      },
      {
        name: "Pitha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Assamese_Pitha.jpg",
        description:
          "Rice‑flour cakes, both sweet and savory, steamed or fried during Bihu.",
      },
    ],
    dances: [
      {
        name: "Bihu Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bihu_Dance.jpg",
        description:
          "Energetic folk dance performed during the Rongali Bihu harvest festival.",
      },
      {
        name: "Bagurumba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Rongali_Bihu.jpg",
        description:
          "Graceful dance of the Bodo tribe, featuring rhythmic footwork and hand gestures.",
      },
      {
        name: "Deodhani",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9a/Deodhani_dance.jpg",
        description:
          "Ritualistic sword dance invoking goddess Kamakhya in the Barpeta region.",
      },
    ],
    famousPlaces: [
      {
        name: "Kamakhya Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Kamakhya_Temple_Guwahati.jpg",
        description: "Key Shakti pilgrimage site overlooking the Brahmaputra.",
      },
      {
        name: "Kaziranga",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kaziranga_Rhino.jpg",
        description:
          "Iconic wildlife reserve for rhinos, wild elephants, and tigers.",
      },
      {
        name: "Umananda Island",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/Umananda_Temple.jpg",
        description:
          "Tiny river island in Guwahati with an ancient Shiva temple.",
      },
    ],
    festivals: [
      {
        name: "Rongali Bihu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/79/Bihu_festival.jpg",
        description:
          "Spring harvest festival marked by dance, music, and feasting.",
      },
      {
        name: "Ambubachi Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a5/Ambubachi_Mela.jpg",
        description: "Tantric fertility festival at Kamakhya Temple in June.",
      },
      {
        name: "Bhogali Bihu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3c/Bhogali_Bihu.jpg",
        description:
          "Feast‑centered festival in January, also called Magh Bihu.",
      },
    ],
    traditionalDress: [
      {
        name: "Mekhela Sador (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c0/Mekhela_Sador.jpg",
        description:
          "Two‑piece garment with a skirt (mekhela) and a draped top (sador).",
      },
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Assamese_Dhoti_Kurta.jpg",
        description:
          "Traditional dhoti paired with kurta, often accessorized with gamocha.",
      },
    ],
  },
  bihar: {
    name: "Bihar",
    description: `A land of ancient universities and spiritual heritage, Bihar is famed for Bodh Gaya’s Mahabodhi Temple and the folk traditions of its riverside villages.`,
    history: `Bihar was the heart of the Magadha Empire under emperors like Ashoka (3rd century BCE) and later the seat of the Mauryan and Gupta Golden Age. It was a center for Buddhist and Jain learning before centuries of medieval and colonial rule.`,
    population: "128 million (2025 est.)",
    area: "94,163 km²",
    density: "1,360 people/km²",
    capital: "Patna",
    region: "East India",
    coordinates: "25.5941° N, 85.1376° E",
    gdp: "$80 billion (2023 est.)",
    literacyRate: "63.8%",
    sexRatio: "918 ♀ per 1000 ♂",
    languages: ["Hindi", "Maithili", "Bhojpuri", "English"],
    culture: `Bihar’s cultural tapestry includes the ancient university at Nalanda, vibrant folk music (Vajeh, Jat-Jatin), and river‑bank festivals along the Ganges.`,
    artForms: [
      {
        name: "Madhubani Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5b/Nalanda_Ruins.jpg",
        description:
          "Folk art using natural dyes, featuring geometric patterns and mythological themes.",
      },
      {
        name: "Manjusha Art",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/23/Manjusha_art.jpg",
        description:
          "Box‑shaped scroll paintings depicting local legends, used during Bishahari festival.",
      },
      {
        name: "Sikki Grass Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Sikki_art.jpg",
        description:
          "Hand‑woven decorative items made from golden grass, typical of Vaishali region.",
      },
    ],
    heritageSites: [
      {
        name: "Mahabodhi Temple (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/48/Mahabodhi_Temple_Bodhgaya.jpg",
        description:
          "5th‑century BCE Buddhist pilgrimage site where Buddha attained enlightenment.",
      },
      {
        name: "Nalanda University Ruins (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5b/Nalanda_Ruins.jpg",
        description:
          "Archaeological remains of one of the world’s oldest residential universities (5th–12th c.).",
      },
      {
        name: "Vishnupad Temple, Gaya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Vishnupad_Temple_Gaya.jpg",
        description:
          "Ancient Hindu shrine built around a footprint of Lord Vishnu.",
      },
    ],
    food: [
      {
        name: "Litti Chokha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Litti_Chokha_Bihar.jpg",
        description:
          "Roasted whole wheat balls served with mashed spiced vegetables.",
      },
      {
        name: "Thekua",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/23/Thekua.jpg",
        description:
          "Deep‑fried sweet made from wheat flour, jaggery, and fennel seeds.",
      },
      {
        name: "Khaja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Khaja_Bihar.jpg",
        description:
          "Layered pastry soaked in sugar syrup, a specialty of Silao.",
      },
    ],
    dances: [
      {
        name: "Jat-Jatin",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/Jat-Jatin_Bihar_Dance.jpg",
        description:
          "Folk dance performed by couples to rhythmic songs, depicting rural life.",
      },
      {
        name: "Bidesia",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/Bidesia_play.jpg",
        description:
          "Folk theatre form combining music, song, and dance to address social themes.",
      },
      {
        name: "Kajri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Bihar_Kajri.jpg",
        description:
          "Monsoon‑season folk music and accompanying simple dance steps.",
      },
    ],
    famousPlaces: [
      {
        name: "Patna Sahib",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Harmandir_Sahib_Patna.jpg",
        description:
          "Sikh pilgrimage site marking Guru Gobind Singh’s birthplace.",
      },
      {
        name: "Golghar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8d/Golghar_Patna.jpg",
        description:
          "Granary built in 1786 with a unique beehive design, overlooking the Ganges.",
      },
      {
        name: "Bodh Gaya",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/48/Mahabodhi_Temple_Bodhgaya.jpg",
        description:
          "World‑renowned Buddhist pilgrimage town anchored by the Mahabodhi Temple.",
      },
    ],
    festivals: [
      {
        name: "Chhath Puja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Chhath_Puja_Bihar.jpg",
        description:
          "Four‑day Vedic festival paying homage to the Sun god on the Ganges’ banks.",
      },
      {
        name: "Sonepur Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e2/Sonepur_Cattle_Fair.jpg",
        description:
          "Asia’s largest cattle fair held annually near Patna in November.",
      },
      {
        name: "Makar Sankranti",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b8/Pongal_Bihar.jpg",
        description:
          "Harvest festival featuring kite flying, feasts, and river rituals.",
      },
    ],
    traditionalDress: [
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Bihari_Kurta_Dhoti.jpg",
        description:
          "White cotton dhoti paired with a kurta, often worn on festivals and ceremonies.",
      },
      {
        name: "Tussar Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tussar_Silk_Saree.jpg",
        description:
          "Handloom saree woven from tussar silk, known for its texture and natural golden sheen.",
      },
    ],
  },
  chhattisgarh: {
    name: "Chhattisgarh",
    description: `Land of lush forests, majestic waterfalls, and a vibrant tribal legacy, Chhattisgarh is rich in natural beauty and indigenous culture.`,
    history: `Established as a separate state in 2000, Chhattisgarh has a history of ancient Satavahana and Kalachuri kingdoms, followed by Maratha rule and British administration. Its tribal communities have preserved unique customs for centuries.`,
    population: "32 million (2025 est.)",
    area: "135,192 km²",
    density: "236 people/km²",
    capital: "Raipur",
    region: "Central India",
    coordinates: "21.2514° N, 81.6296° E",
    gdp: "$35 billion (2023 est.)",
    literacyRate: "71.0%",
    sexRatio: "991 ♀ per 1000 ♂",
    languages: ["Hindi", "Chhattisgarhi"],
    culture: `Chhattisgarh celebrates tribal festivals in Bastar, crafts like Dokra metalwork, and folk music and dances tied to agricultural cycles.`,
    artForms: [
      {
        name: "Bastar Dhokra Art",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d0/Chana_Samosa.jpg",
        description:
          "Ancient lost‑wax metal casting technique crafting small bronze sculptures.",
      },
      {
        name: "Cheriyal Scroll Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Faraa_Dish.jpg",
        description:
          "Vibrant narrative cloth paintings depicting local myths, unique to the Cheriyal region.",
      },
      {
        name: "Gond Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Barnawapara_Wildlife.jpg",
        description:
          "Intricate tribal art using dots and lines to form wildlife and nature motifs.",
      },
    ],
    heritageSites: [
      {
        name: "Chitrakote Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Chitrakote_Falls.jpg",
        description:
          "Dubbed “India’s Niagara,” these horseshoe‑shaped falls cascade 29 m over basalt rocks.",
      },
      {
        name: "Barnawapara Wildlife Sanctuary",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Barnawapara_Wildlife.jpg",
        description:
          "Protected area home to deer, wild boar, and abundant birdlife.",
      },
      {
        name: "Danteshwari Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Danteshwari_Temple.jpg",
        description:
          "Ancient Shakti temple in Dantewada, one of the 52 Shakti Peethas of India.",
      },
    ],
    food: [
      {
        name: "Chila",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d0/Aamat_Chhattisgarh.jpg",
        description:
          "Savory chickpea flour pancake, often served with chutney.",
      },
      {
        name: "Aamat",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Aamat_Chhattisgarh.jpg",
        description:
          "Traditional soup made with mixed vegetables and lentils, flavored with local spices.",
      },
      {
        name: "Faraa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Faraa_Dish.jpg",
        description:
          "Steamed rice dumplings wrapped in banana leaves, typically eaten during festivals.",
      },
    ],
    dances: [
      {
        name: "Panthi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/45/Panthi_Dance_CG.jpg",
        description:
          "Tribute dance performed by Satnami community to honor Guru Ghasidas.",
      },
      {
        name: "Raut Nacha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Raut_Nacha.jpg",
        description:
          "Cowherd dance performed during Diwali, featuring rhythmic drumming.",
      },
      {
        name: "Suwa Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Chhattisgarh_Suwa_Dance.jpg",
        description:
          "Folk dance invoking the goddess Suwa, performed by women with songs and hand movements.",
      },
    ],
    famousPlaces: [
      {
        name: "Chitrakote Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Chitrakote_Falls.jpg",
        description:
          "Breathtaking waterfall on the Indravati River, widest in India during monsoon.",
      },
      {
        name: "Barnawapara Sanctuary",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Barnawapara_Wildlife.jpg",
        description:
          "Lush deciduous forest sanctuary ideal for wildlife safaris.",
      },
      {
        name: "Sirpur Heritage Site",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sirpur_rocks.jpg",
        description:
          "Archaeological complex with Buddhist, Hindu and Jain temples dating to the 5th–8th centuries.",
      },
    ],
    festivals: [
      {
        name: "Bastar Dussehra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/63/Bastar_Dussehra.jpg",
        description:
          "Unique 75‑day tribal festival honoring Goddess Danteshwari and community rituals.",
      },
      {
        name: "Hareli",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/79/Hareli_Festival.jpg",
        description:
          "Agricultural festival where tools and bulls are worshipped for a good harvest.",
      },
      {
        name: "Madai Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/Madai_festival.jpg",
        description:
          "Weekly temple fair rotating among various tribal hamlets, featuring folk performances.",
      },
    ],
    traditionalDress: [
      {
        name: "Lugda & Rajnigandha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Lugda_Chhattisgarh.jpg",
        description:
          "Women’s sari drape tied at the waist with a sash, often in vibrant prints.",
      },
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dhoti_Chhattisgarh.jpg",
        description:
          "Cotton dhoti and kurta, paired with a gamcha cloth scarf.",
      },
    ],
  },
  goa: {
    name: "Goa",
    description: `India’s smallest state on the western coast, Goa blends Portuguese heritage, sun‑drenched beaches, and a vibrant seafood cuisine.`,
    history: `Goa was a Portuguese colony from 1510 until 1961, when it was annexed into India. Its unique fusion architecture, churches, and convents reflect over four centuries of Lusitanian influence alongside indigenous Konkani traditions.`,
    population: "2 million (2025 est.)",
    area: "3,702 km²",
    density: "541 people/km²",
    capital: "Panaji",
    region: "West India",
    coordinates: "15.2993° N, 74.1240° E",
    gdp: "$15 billion (2023 est.)",
    literacyRate: "88.7%",
    sexRatio: "973 ♀ per 1000 ♂",
    languages: ["Konkani", "Marathi", "English", "Portuguese (heritage)"],
    culture: `Goa’s culture is a vibrant melange of Konkani folklore, Catholic festivals, and Goan Catholic music alongside Hindu temple rituals.`,
    artForms: [
      {
        name: "Azulejos Tiles",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Basilica_of_Bom_Jesus_Goa.jpg",
        description:
          "Hand‑painted ceramic tiles brought by the Portuguese, adorning churches and mansions.",
      },
      {
        name: "Goan Carnival Music",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Goa_Carnival.jpg",
        description:
          "Brass‑band tunes and sunglasses‑clad dancers parading vibrant floats during Carnival.",
      },
      {
        name: "Konkani Song",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Pano_Bhaju_Goa.jpg",
        description:
          "Folk ballads sung in Konkani, celebrating daily life and legends.",
      },
    ],
    heritageSites: [
      {
        name: "Basilica of Bom Jesus (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Basilica_of_Bom_Jesus_Goa.jpg",
        description:
          "Late 16th‑century church housing the relics of St. Francis Xavier.",
      },
      {
        name: "Se Cathedral",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Se_Cathedral_Goa.jpg",
        description:
          "One of Asia’s largest churches, built to commemorate the Portuguese victory over the Sultan of Bijapur.",
      },
      {
        name: "Fort Aguada",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Fort_Aguada_Goa.jpg",
        description:
          "17th‑century Portuguese fort and lighthouse overlooking the Arabian Sea.",
      },
    ],
    food: [
      {
        name: "Goan Fish Curry",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f4/Goan_Fish_Curry.jpg",
        description:
          "Tangy coconut‑based curry with freshly caught fish and kokum.",
      },
      {
        name: "Prawn Balchão",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b0/Prawn_Balchao.jpg",
        description:
          "Spicy, tangy pickle curry of shrimp, chilies, and vinegar.",
      },
      {
        name: "Bebinca",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f0/Bebinca.jpg",
        description:
          "Traditional multi‑layered egg‑and‑coconut dessert baked to golden perfection.",
      },
    ],
    dances: [
      {
        name: "Fugdi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Fugdi_Dance_Goa.jpg",
        description:
          "Spirited circle dance performed by women during Ganeshotsav and other festivities.",
      },
      {
        name: "Corridinho",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Corridinho_Dance.jpg",
        description:
          "Portuguese partner dance with quick steps and turns in couples.",
      },
      {
        name: "Dhalo",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Goan_Dhalo.jpg",
        description:
          "Women’s ritual dance performed during the full moon, featuring rhythmic clapping and steps.",
      },
    ],
    famousPlaces: [
      {
        name: "Calangute Beach",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b9/Calangute_Beach_Goa.jpg",
        description:
          "Busiest goa beach with water sports, shacks, and nightlife.",
      },
      {
        name: "Dudhsagar Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Dudhsagar_Falls_Goa.jpg",
        description:
          "Four‑tiered waterfall plunging through the Western Ghats at 310 m height.",
      },
      {
        name: "Spice Plantations",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Goa_Spice_Plantation.jpg",
        description:
          "Guided tours through cardamom, pepper, and cashew groves with traditional seated lunch.",
      },
    ],
    festivals: [
      {
        name: "Goa Carnival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Goa_Carnival.jpg",
        description:
          "Four‑day street carnival before Lent, featuring parades, music, and dance.",
      },
      {
        name: "Shigmo",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Goa_Shigmo.jpg",
        description:
          "Goa’s spring festival celebrating harvest, with folk dances and floral decorations.",
      },
      {
        name: "Sao Joao",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Sao_Joao_Festival.jpg",
        description:
          "Feast of St. John the Baptist on June 24, where participants jump into wells and streams.",
      },
    ],
    traditionalDress: [
      {
        name: "Pano Bhaju (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Pano_Bhaju_Goa.jpg",
        description:
          "Two‑piece dress with a wrap‑around skirt and matching blouse, often in bright colors.",
      },
      {
        name: "Lungi & Shirt (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e2/Goan_Men_Lungi.jpg",
        description:
          "Checkered or plain cotton lungi paired with a simple shirt or kurta.",
      },
    ],
  },
  haryana: {
    name: "Haryana",
    description: `The cradle of India’s green revolution, Haryana wraps Delhi to its south and is renowned for its robust agricultural output and spirited folk heritage.`,
    history: `Haryana’s soil once bore the Indus‑Sarasvati civilization; later ruled by Mauryas, Guptas, and Mughals. It became a separate state from Punjab in 1966, pioneering agricultural reforms that transformed India into a food‑grain surplus nation.`,
    population: "30 million (2025 est.)",
    area: "44,212 km²",
    density: "678 people/km²",
    capital: "Chandigarh",
    region: "North India",
    coordinates: "29.0588° N, 76.0856° E",
    gdp: "$100 billion (2023 est.)",
    literacyRate: "75.5%",
    sexRatio: "879 ♀ per 1000 ♂",
    languages: ["Hindi", "Punjabi", "Haryanvi", "English"],
    culture: `Haryana’s folk roots show in its vibrant “Saang” theater, energetic “Ghoomar” dances, and rustic fairs celebrating harvest cycles.`,
    artForms: [
      {
        name: "Phulkari Embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/98/Phulkari.jpg",
        description:
          "Embroidered shawls with bright floral motifs, origin in Rohtak–Karnal region.",
      },
      {
        name: "Saang Folk Theater",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f3/Saang.jpg",
        description:
          "Musical‑drama form depicting mythological and social themes with dance.",
      },
      {
        name: "Gharana Music",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8d/Haryana_Folk.jpg",
        description:
          "Distinctive folk ballads and ragas sung in rural village gatherings.",
      },
    ],
    heritageSites: [
      {
        name: "Kurukshetra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/43/Kurukshetra.jpg",
        description:
          "Mythic battlefield of the Mahabharata with numerous temples and lakes.",
      },
      {
        name: "Kingdom of Ahir Forts",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/09/Hansi_Fort.jpg",
        description:
          "Medieval forts at Hansi and Asigarh reflecting early Rajput architecture.",
      },
      {
        name: "Pinjore Gardens",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pinjore_Garden.jpg",
        description:
          "18th‑century Mughal‑style terraced garden with fountains and pavilions.",
      },
    ],
    food: [
      {
        name: "Bajra Khichdi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bajra_Khichdi.jpg",
        description:
          "Millet and lentil one‑pot cooked with ghee and spices, winter staple.",
      },
      {
        name: "Makke ki Roti & Sarson ka Saag",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/25/Makke_Roti_Saag.jpg",
        description:
          "Corn flatbread with mustard greens curry, popular during Lohri.",
      },
      {
        name: "Chaas",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Chaas_Glass.jpg",
        description: "Spiced buttermilk drink served chilled at meals.",
      },
    ],
    dances: [
      {
        name: "Ghoomar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Ghoomar_dance.jpg",
        description:
          "Circle‑dance originally from Rajasthan, popular in eastern Haryana.",
      },
      {
        name: "Phag Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6e/Phag_Dance.jpg",
        description: "Spring festival dance performed with sticks and singing.",
      },
      {
        name: "Saang Performance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f3/Saang.jpg",
        description: "Dramatic enactment with song, acting, and minimal props.",
      },
    ],
    famousPlaces: [
      {
        name: "Kurukshetra Panorama & Science Centre",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Kurukshetra_Panorama.jpg",
        description:
          "Multimedia exhibits on the Mahabharata and science demonstrations.",
      },
      {
        name: "Sultanpur National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/Sultanpur_Park.jpg",
        description:
          "Important bird sanctuary attracting migratory species in winter.",
      },
      {
        name: "Morni Hills",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/61/Morni_Hills.jpg",
        description:
          "Scenic hill station with twin lakes and trekking opportunities.",
      },
    ],
    festivals: [
      {
        name: "Surajkund Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/11/Surajkund_Mela.jpg",
        description:
          "Annual crafts fair and cultural fest drawing artisans nationwide.",
      },
      {
        name: "Lohri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Lohri.jpg",
        description:
          "Winter solstice celebration with bonfires, folk songs, and dance.",
      },
      {
        name: "Braj Mahotsav",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Braj_Festival.jpg",
        description:
          "Ten-day Ramlila and cultural performance festival held yearly.",
      },
    ],
    traditionalDress: [
      {
        name: "Kurta Pajama (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Indian_Kurta_Pajama.jpg",
        description:
          "Long tunic and pajama trousers, often worn with a waistcoat.",
      },
      {
        name: "Salwar Kameez (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9d/Salwar_Kameez.jpg",
        description:
          "Classic ensemble of tunic, pants, and dupatta in vibrant prints.",
      },
    ],
  },
  "himachal-pradesh": {
    name: "Himachal Pradesh",
    description: `Nestled in the Western Himalayas, Himachal Pradesh is famed for its snow‑capped peaks, lush valleys, and centuries‑old temples and monasteries.`,
    history: `Once ruled by small hill kingdoms like the Kullu and Mandi princely states, Himachal came under British stewardship in the 19th century before becoming a full Indian state in 1971. Its strategic mountain passes have long connected India to Tibet.`,
    population: "7.5 million (2025 est.)",
    area: "55,673 km²",
    density: "135 people/km²",
    capital: "Shimla",
    region: "North India",
    coordinates: "31.1048° N, 77.1734° E",
    gdp: "$25 billion (2023 est.)",
    literacyRate: "83.8%",
    sexRatio: "972 ♀ per 1000 ♂",
    languages: ["Hindi", "Pahari dialects", "English"],
    culture: `Himachal’s culture blends Himalayan tribal customs with Pahari folk music, vibrant festivals like Kullu Dussehra, and Buddhist pilgrimages in the Lahaul‑Spiti region.`,
    artForms: [
      {
        name: "Kullu Shawl Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2a/Kullu_shawl.jpg",
        description:
          "Hand‑loomed woolen shawls with intricate geometric patterns, dyed with natural colors.",
      },
      {
        name: "Chamba Rumal Embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chamba_rumal.jpg",
        description:
          "Fine needlework on handkerchiefs depicting mythological scenes in delicate satin stitch.",
      },
      {
        name: "Buddhist Thangka Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Thangka_Himachal.jpg",
        description:
          "Religious scroll paintings in monasteries of Lahaul and Spiti, illustrating Buddhist deities.",
      },
    ],
    heritageSites: [
      {
        name: "Kangra Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9c/Kangra_Fort.jpg",
        description:
          "Ancient Himalayan fort overlooking the Ravi River, held by various dynasties since 4th century BCE.",
      },
      {
        name: "Bharmour Chaurasi Temples",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Bharmour_temple.jpg",
        description:
          "Cluster of 84 early medieval temples dedicated to Shiva and Vishnu in the Chaurasi complex.",
      },
      {
        name: "Key Monastery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/Key_Monastery.jpg",
        description:
          "11th‑century Tibetan Buddhist monastery perched at 4,166 m in Spiti Valley.",
      },
    ],
    food: [
      {
        name: "Tudkiya Bhat",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/31/Tudkiya_bhat.jpg",
        description:
          "Aromatic rice dish cooked with yogurt, lentils, and spices, typical of Kangra cuisine.",
      },
      {
        name: "Chha Gosht",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/13/Chha_gosht.jpg",
        description:
          "Lamb cooked in gram flour and yogurt gravy, flavored with local herbs.",
      },
      {
        name: "Babru",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Babru.jpg",
        description:
          "Fried bread stuffed with spiced black gram paste, similar to kachori.",
      },
    ],
    dances: [
      {
        name: "Nati",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Nati_dance.jpg",
        description:
          "Energetic folk dance of Kullu region, performed in a circle to live folk songs.",
      },
      {
        name: "Losar Festival Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Losar_dance.jpg",
        description:
          "Ritual dances during the Tibetan New Year in tribal Bhutia communities of Spiti.",
      },
      {
        name: "Lahauli Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Lahauli_dance.jpg",
        description:
          "Group dance of Lahaul valley celebrating seasonal harvests with rhythmic footwork.",
      },
    ],
    famousPlaces: [
      {
        name: "Rohtang Pass",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Rohtang_Pass.jpg",
        description:
          "High mountain pass at 3,978 m offering panoramic views of glaciers and peaks.",
      },
      {
        name: "Shimla Ridge",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/57/Shimla_Ridge.jpg",
        description:
          "Open‐air promenade in the heart of Shimla, with colonial architecture and panoramic vistas.",
      },
      {
        name: "Great Himalayan National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/GHNP.jpg",
        description:
          "UNESCO World Heritage site protecting Himalayan flora and fauna from 1,500 to 6,000 m.",
      },
    ],
    festivals: [
      {
        name: "Kullu Dussehra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2a/Kullu_Dussehra.jpg",
        description:
          "Seven‑day festival in October celebrating the victory of good over evil, famed for its procession of deities.",
      },
      {
        name: "Minjar Mela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Minjar_Mela.jpg",
        description:
          "Harvest festival in Chamba marking the sowing of paddy, with folk performances and fairs.",
      },
      {
        name: "Phulaich Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/dd/Phulaich.jpg",
        description:
          "Goddess Hadimba’s floral festival in Manali where villagers offer flowers and sweets.",
      },
    ],
    traditionalDress: [
      {
        name: "Chola & Chhoga (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0f/Himachal_women.jpg",
        description:
          "Woolen skirt (chola) and flared jacket (chhoga), often in bright red and black.",
      },
      {
        name: "Bakkhu & Kulla (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Himachal_men.jpg",
        description:
          "Thick woolen coat (bakkhu) and cap (kulla) worn in the high hills for warmth.",
      },
    ],
  },
  jharkhand: {
    name: "Jharkhand",
    description: `A land of dense forests, rolling hills, and waterfalls, Jharkhand is rich in mineral wealth and tribal heritage.`,
    history: `Carved out of Bihar in 2000, Jharkhand’s region was home to the ancient Chota Nagpur Plateau and ruled by Nagvanshi and later Maratha chieftains. It played a key role in tribal uprisings against colonial exploitation.`,
    population: "39 million (2025 est.)",
    area: "79,714 km²",
    density: "487 people/km²",
    capital: "Ranchi",
    region: "East India",
    coordinates: "23.3441° N, 85.3096° E",
    gdp: "$45 billion (2023 est.)",
    literacyRate: "67.6%",
    sexRatio: "948 ♀ per 1000 ♂",
    languages: ["Hindi", "Santali", "Odia", "English"],
    culture: `Jharkhand’s tribal communities—Santhal, Mundari, Ho—celebrate unique music, dance, and crafts revolving around nature and harvest cycles.`,
    artForms: [
      {
        name: "Sohrai Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/40/Sohrai_Art.jpg",
        description:
          "Vibrant mural art in cattle barns painted by women during post-harvest festivals.",
      },
      {
        name: "Tusu Songs",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tusu_songs.jpg",
        description:
          "Folk songs of rural harvest festivals, sung by women gathering to celebrate.",
      },
      {
        name: "Dhobia Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chilka_Roti.jpg",
        description:
          "Handloom textile weaving practiced by Dhobi communities, producing coarse cotton fabrics.",
      },
    ],
    heritageSites: [
      {
        name: "Hundru Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Hundru_Falls_Jharkhand.jpg",
        description:
          "Magnificent 98 m waterfall on the Subarnarekha River amidst forested hills.",
      },
      {
        name: "Netarhat",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2b/Netarhat_Hills.jpg",
        description:
          "Hill station known as “Queen of Chotanagpur,” with panoramic sunrise views.",
      },
      {
        name: "Baidyanath Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/23/Baidhyanath_Dham.jpg",
        description:
          "One of the twelve Jyotirlinga shrines of Lord Shiva, attracting pilgrims during Shravan.",
      },
    ],
    food: [
      {
        name: "Thekua",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/23/Thekua.jpg",
        description:
          "Deep-fried sweet made of wheat flour, ghe, and jaggery, offered during Chhath Puja.",
      },
      {
        name: "Chilka Roti",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chilka_Roti.jpg",
        description: "Savory rice pancake, often eaten with chutney or greens.",
      },
      {
        name: "Handia",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fe/Handia_Rice_Beer.jpg",
        description:
          "Fermented rice beer brewed by tribal communities for celebrations.",
      },
    ],
    dances: [
      {
        name: "Chhau",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/24/Chhau_Jharkhand.jpg",
        description:
          "Masked martial dance telling epics, performed during regional festivals.",
      },
      {
        name: "Jhumar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e5/Jhumar_Dance.jpg",
        description:
          "Circular dance by Santhal tribes with synchronized footwork and singing.",
      },
      {
        name: "Karma Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Karma_Festival.jpg",
        description:
          "Ritual dance performed during the Karma festival in autumn.",
      },
    ],
    famousPlaces: [
      {
        name: "Ranchi Hill",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Ranchi_Hill.jpg",
        description:
          "Plateau overlooking the city, featuring Pahari Mandir and scenic views.",
      },
      {
        name: "Betla National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/db/Betla_Park.jpg",
        description:
          "One of India’s first national parks with tigers, elephants, and tribal villages.",
      },
      {
        name: "Rajrappa Temple",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7f/Rajrappa_Temple.jpg",
        description:
          "Shrine dedicated to Goddess Chhinnamasta at the confluence of rivers.",
      },
    ],
    festivals: [
      {
        name: "Sarhul",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3c/Sarhul_festival.jpg",
        description:
          "Spring festival of Hos celebrating the Sal tree flowering with dance and music.",
      },
      {
        name: "Karma",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Karma_Festival.jpg",
        description:
          "Autumn festival worshipping the Karam tree, with community feasts and dances.",
      },
      {
        name: "Tusu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tusu_Festival.jpg",
        description:
          "Harvest festival of rural communities, marked by overnight singing and dances.",
      },
    ],
    traditionalDress: [
      {
        name: "Panchi & Parhan (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/01/Panchi_Parhan.jpg",
        description:
          "Traditional wrap skirt and blouse, often in bright tribal prints.",
      },
      {
        name: "Kurta-Dhoti (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Jharkhand_Traditional_Men.jpg",
        description:
          "Simple cotton kurta with dhoti, sometimes accompanied by a tribal shawl.",
      },
    ],
  },
  "madhya-pradesh": {
    name: "Madhya Pradesh",
    description: `Often called the “Heart of India,” Madhya Pradesh boasts a tapestry of tribal cultures, ancient temples, and tiger‐filled forests at its core.`,
    history: `Cradle of the Mauryan and Gupta empires, Madhya Pradesh is home to the Buddhist Stupa of Sanchi (3rd c. BCE) and the medieval Chandela temples at Khajuraho (10th–11th c.). It was later ruled by Marathas and the British before state reorganization in 1956.`,
    population: "85 million (2025 est.)",
    area: "308,245 km²",
    density: "276 people/km²",
    capital: "Bhopal",
    region: "Central India",
    coordinates: "23.2599° N, 77.4126° E",
    gdp: "$90 billion (2023 est.)",
    literacyRate: "69.3%",
    sexRatio: "931 ♀ per 1000 ♂",
    languages: ["Hindi", "English"],
    culture: `A crossroads of North and South India, blending Hindi‐heartland folk with tribal traditions, classical temple music, and wildlife conservation ethos.`,
    artForms: [
      {
        name: "Bhimbetka Rock Paintings",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Khajuraho_Temple.jpg",
        description:
          "Prehistoric cave paintings dating back 30,000 years, depicting human and animal figures.",
      },
      {
        name: "Gond Paintings",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Gond_art.jpg",
        description:
          "Vibrant tribal art from the Gond community, using dots and fine lines to create nature motifs.",
      },
      {
        name: "Chanderi Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/55/Chanderi_Saree.jpg",
        description:
          "Delicate cotton‐silk sarees woven in Chanderi, known for gold and silver brocade.",
      },
    ],
    heritageSites: [
      {
        name: "Sanchi Stupa (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sanchi_Stupa.jpg",
        description:
          "One of the oldest stone structures in India, commissioned by Emperor Ashoka.",
      },
      {
        name: "Khajuraho Temples (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Khajuraho_Temple.jpg",
        description:
          "Medieval Hindu and Jain temples renowned for their erotic stone carvings.",
      },
      {
        name: "Bhimbetka Caves (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Bhimbetka_Rock_Shelters.jpg",
        description:
          "Rock shelters with prehistoric paintings and archaeological remains.",
      },
    ],
    food: [
      {
        name: "Poha & Jalebi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f1/Poha_Jalebi_Indore.jpg",
        description:
          "Flattened rice cooked with spices served alongside sweet jalebi, a favorite breakfast in Indore region.",
      },
      {
        name: "Dal Bafla",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/91/Dal_Bafla.jpg",
        description:
          "Baked wheat balls (bafla) dunked in ghee and served with spiced lentil soup.",
      },
      {
        name: "Bhutte Ka Kees",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/05/Bhutte_ka_Kees.jpg",
        description:
          "Grated corn cooked with milk, ghee, and spices—a specialty of the Indore region.",
      },
    ],
    dances: [
      {
        name: "Gaur Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Gaur_Dance.jpg",
        description:
          "Tribal drum dance performed by the Gond community during harvest festivals.",
      },
      {
        name: "Matki Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6e/Matki_Dance.jpg",
        description:
          "Women balance decorated pots on their heads while dancing in circles.",
      },
      {
        name: "Chitrakathi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Chitrakathi_art.jpg",
        description:
          "Visual storytelling through illustrated scrolls narrated by performers.",
      },
    ],
    famousPlaces: [
      {
        name: "Kanha National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f4/Kanha_National_Park.jpg",
        description:
          "Tiger reserve and inspiration for Kipling’s “Jungle Book,” home to barasingha deer.",
      },
      {
        name: "Bandhavgarh Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandhavgarh_Fort.jpg",
        description:
          "Ancient hill fort with stunning views and a diverse wildlife sanctuary below.",
      },
      {
        name: "Pachmarhi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/cc/Pachmarhi.jpg",
        description:
          "Only hill station in Madhya Pradesh, known for waterfalls, caves, and pine forests.",
      },
    ],
    festivals: [
      {
        name: "Tansen Music Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c3/Tansen_Festival.jpg",
        description:
          "Annual classical music festival in Gwalior celebrating the legacy of Miyan Tansen.",
      },
      {
        name: "Khajuraho Dance Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Khajuraho_Dance_Festival.jpg",
        description:
          "Week‐long festival of classical dances staged against the backdrop of Khajuraho temples.",
      },
      {
        name: "Diwali",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fd/Diwali_Lights.jpg",
        description:
          "Festival of lights celebrated across the state with lamps, fireworks, and sweets.",
      },
    ],
    traditionalDress: [
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Maharashtra_Dhoti.jpg",
        description:
          "Traditional white cotton dhoti and kurta, often paired with a Nehru jacket.",
      },
      {
        name: "Maheshwari Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/55/Maheshwari_Saree.jpg",
        description:
          "Handloom saree from Maheshwar, characterized by its soft cotton and silk blends.",
      },
    ],
  },
  punjab: {
    name: "Punjab",
    description: `Land of five rivers and the birthplace of Sikhism, Punjab is famed for its vibrant Bhangra dance, hearty cuisine, and historic Golden Temple in Amritsar.`,
    history: `Punjab’s history spans the ancient Indus Valley civilization, the reign of the Mauryas and Guptas, the establishment of Sikh Gurudwaras from the 15th century onward, and significant roles in the Mughal and British eras. It was bifurcated in 1966 to create Haryana and Himachal Pradesh.`,
    population: "30 million (2025 est.)",
    area: "50,362 km²",
    density: "595 people/km²",
    capital: "Chandigarh",
    region: "North India",
    coordinates: "31.1471° N, 75.3412° E",
    gdp: "$120 billion (2023 est.)",
    literacyRate: "75.8%",
    sexRatio: "895 ♀ per 1000 ♂",
    languages: ["Punjabi", "Hindi", "English"],
    culture: `Punjab’s culture is characterized by its robust folk music (Bhangra, Giddha), the langar tradition of communal meals in Sikh gurudwaras, and a proud agrarian ethos.`,
    artForms: [
      {
        name: "Phulkari Embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Phulkari_sari.jpg",
        description:
          "Colorful floral embroidery on shawls and dupattas, traditionally done by Punjabi women.",
      },
      {
        name: "Giddha Performance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Giddha.jpg",
        description:
          "Energetic women’s dance featuring rhythmic claps and folk verses called boliyan.",
      },
      {
        name: "Punjabi Folk Music",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Punjabi_folk_musicians.jpg",
        description:
          "Vocal and instrumental styles using dhol, tumbi, and chimta, often accompanying Bhangra.",
      },
    ],
    heritageSites: [
      {
        name: "Golden Temple (Harmandir Sahib)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/14/Golden_Temple_Amritsar.jpg",
        description:
          "The holiest Sikh gurudwara, clad in gold and set within the Amrit Sarovar tank.",
      },
      {
        name: "Jallianwala Bagh",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/82/Jallianwala_Bagh_Amritsar.jpg",
        description:
          "Public garden memorializing the 1919 massacre of unarmed Indian protesters by British troops.",
      },
      {
        name: "Wagah Border",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Wagah_Border_Ceremony.jpg",
        description:
          "Ceremonial military flag-lowering parade at the India–Pakistan border.",
      },
    ],
    food: [
      {
        name: "Makki di Roti & Sarson da Saag",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Makki_Roti_Saag.jpg",
        description:
          "Corn flatbread served with mustard-green curry, a classic Punjabi winter dish.",
      },
      {
        name: "Butter Chicken",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Butter_chicken.jpg",
        description:
          "Creamy tomato-based chicken curry originating from Delhi but popularized in Punjabi dhabas.",
      },
      {
        name: "Chole Bhature",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Chole_Bhature.jpg",
        description:
          "Spicy chickpea curry served with deep-fried bread, a favorite street-food combo.",
      },
    ],
    dances: [
      {
        name: "Bhangra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/52/Bhangra_Dance.jpg",
        description:
          "Vigorous harvest dance featuring high-energy jumps, kicks, and shoulder moves.",
      },
      {
        name: "Giddha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Giddha.jpg",
        description:
          "Female counterpart to Bhangra, marked by playful gestures and folk songs.",
      },
      {
        name: "Sammi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/20/Sammi_Dance.jpg",
        description:
          "Graceful women’s dance from the Sandalbar region, performed in circular formations.",
      },
    ],
    famousPlaces: [
      {
        name: "Amritsar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/14/Golden_Temple_Amritsar.jpg",
        description:
          "Spiritual center of Sikhism and home to the Golden Temple and vibrant bazaars.",
      },
      {
        name: "Chandigarh Rock Garden",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/69/Rock_Garden_Chandigarh.jpg",
        description:
          "Unique sculpture garden created from industrial debris and urban waste.",
      },
      {
        name: "Anandpur Sahib",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/06/Anandpur_Sahib_Gurudwara.jpg",
        description:
          "Historic gurudwara town where the Khalsa was founded by Guru Gobind Singh.",
      },
    ],
    festivals: [
      {
        name: "Vaisakhi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/17/Vaisakhi_Celebration.jpg",
        description:
          "Harvest festival marking the Punjabi New Year and founding of the Khalsa in 1699.",
      },
      {
        name: "Lohri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Lohri.jpg",
        description:
          "Winter solstice bonfire festival celebrating the end of winter and harvest.",
      },
      {
        name: "Hola Mohalla",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/67/Hola_Mohalla.jpg",
        description:
          "Sikh martial arts festival featuring mock battles, poetry, and kirtan, held in Anandpur Sahib.",
      },
    ],
    traditionalDress: [
      {
        name: "Kurta Pajama & Turban (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/95/Punjabi_turban.jpg",
        description:
          "Long kurta with loose pajama trousers, completed by a brightly colored turban.",
      },
      {
        name: "Salwar Kameez & Phulkari Dupatta (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/16/Salwar_Kameez_Phulkari.jpg",
        description:
          "Embroidered tunic and trouser set, paired with a floral-embroidered dupatta.",
      },
    ],
  },
  odisha: {
    name: "Odisha",
    description: `Land of ancient temples and coastal beauty, Odisha is celebrated for its classical Odissi dance, Pattachitra paintings, and the brackish waters of Chilika Lake.`,
    history: `Once the core of the ancient Kalinga kingdom—conquered by Ashoka in the 3rd century BCE—Odisha later flourished under the Eastern Ganga and Gajapati dynasties, whose monumental temples at Bhubaneswar, Puri, and Konark still stand as masterpieces of medieval Indian architecture.`,
    population: "46 million (2025 est.)",
    area: "155,707 km²",
    density: "295 people/km²",
    capital: "Bhubaneswar",
    region: "East India",
    coordinates: "20.2961° N, 85.8245° E",
    gdp: "$55 billion (2023 est.)",
    literacyRate: "72.9%",
    sexRatio: "979 ♀ per 1000 ♂",
    languages: ["Odia", "English", "Hindi"],
    culture: `A fusion of tribal traditions and classical heritage, Odisha is home to the Jagannath Rath Yatra, the annual Raja Parba celebrating womanhood, and a vibrant handloom and handicraft sector.`,
    artForms: [
      {
        name: "Pattachitra Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Pattachitra.jpg",
        description:
          "Intricate scroll paintings on cloth depicting mythological and folk themes, using natural dyes.",
      },
      {
        name: "Silver Filigree (Tarakasi)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/02/Silver_filigree.jpg",
        description:
          "Delicate silver wire jewelry and handicrafts, crafted primarily in Cuttack.",
      },
      {
        name: "Sand Art (Puri)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Puri_sand_art.jpg",
        description:
          "Elaborate temporary sculptures made on the beach using wet sand and water.",
      },
    ],
    heritageSites: [
      {
        name: "Konark Sun Temple (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/57/Konark_Sun_Temple.jpg",
        description:
          "13th‑century chariot‑shaped temple dedicated to the sun god, famed for its carved stone wheels.",
      },
      {
        name: "Jagannath Temple, Puri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/58/Jagannath_Temple_Puri.jpg",
        description:
          "One of India’s Char Dham pilgrimage sites, known for its annual Rath Yatra chariot festival.",
      },
      {
        name: "Lingaraja Temple, Bhubaneswar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lingaraj_Temple.jpg",
        description:
          "11th‑century Shiva temple, one of the oldest and largest in the state capital.",
      },
    ],
    food: [
      {
        name: "Dahi Pakhala",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/bf/Pakhala_Bhaat_Odisha.jpg",
        description:
          "Fermented rice served with yogurt, chilies, and fried mustard, a cooling summer staple.",
      },
      {
        name: "Chhena Poda",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Chhena_Poda.jpg",
        description:
          "Caramelized cheese dessert baked with sugar and nuts, literally “burnt cheese.”",
      },
      {
        name: "Dalma",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/46/Dalma_Odishan_Dish.jpg",
        description:
          "Lentils and seasonal vegetables cooked with coconut and mild spices, a classic home‑style curry.",
      },
    ],
    dances: [
      {
        name: "Odissi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Odissi_Dance_Performance.jpg",
        description:
          "One of India’s eight classical dance forms, known for its fluid torso movements and expressive gestures.",
      },
      {
        name: "Gotipua",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Gotipua_dance.jpg",
        description:
          "Traditional folk dance performed by young boys dressed as women, a precursor to Odissi.",
      },
      {
        name: "Chhau (Mayurbhanj)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Chhau_dance_odisha.jpg",
        description:
          "Masked martial dance combining martial movements and storytelling, performed during regional festivals.",
      },
    ],
    famousPlaces: [
      {
        name: "Chilika Lake",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Chilika_Lake_Odisha.jpg",
        description:
          "Asia’s largest brackish‑water lagoon, a birdwatcher’s paradise and wintering ground for migratory birds.",
      },
      {
        name: "Udayagiri & Khandagiri Caves",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Udayagiri_Caves.jpg",
        description:
          "Rock‑cut Jain monastic caves dating to the 2nd century BCE near Bhubaneswar.",
      },
      {
        name: "Ratnagiri Buddhist Ruins",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Ratnagiri_ruins.jpg",
        description:
          "Remains of a major Buddhist monastic complex from the 5th–13th centuries CE.",
      },
    ],
    festivals: [
      {
        name: "Rath Yatra",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Rath_Yatra_Puri.jpg",
        description:
          "Grand chariot festival in Puri drawing millions to pull the temple cars through the streets.",
      },
      {
        name: "Durga Puja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Odisha_Durga_Puja.jpg",
        description:
          "Celebration of the goddess Durga in October, marked by elaborate pandals and cultural programs.",
      },
      {
        name: "Raja Parba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Odisha_Raja.jpg",
        description:
          "Three‑day festival in June celebrating the fertility of the earth, observed by young women swinging on decorated swings.",
      },
    ],
    traditionalDress: [
      {
        name: "Sambalpuri Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/03/Sambalpuri_Saree.jpg",
        description:
          "Handwoven ikat cotton saree renowned for its geometric patterns and motifs.",
      },
      {
        name: "Kurta & Dhoti (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/91/Odia_Dress.jpg",
        description:
          "Traditional cotton dhoti paired with a kurta, often complemented by an angavastram shawl.",
      },
    ],
  },
  sikkim: {
    name: "Sikkim",
    description: `Nestled in the Himalayas, Sikkim is renowned for its snow‑capped peaks, Buddhist monasteries, and vibrant Lepcha and Bhutia cultures.`,
    history: `Originally ruled by Namgyal chogyals from the 17th century, Sikkim became a British protectorate in the 19th century and joined India as its 22nd state in 1975. It has preserved its unique Himalayan heritage and biodiversity since.`,
    population: "0.7 million (2025 est.)",
    area: "7,096 km²",
    density: "100 people/km²",
    capital: "Gangtok",
    region: "North East India",
    coordinates: "27.5330° N, 88.5122° E",
    gdp: "$6 billion (2023 est.)",
    literacyRate: "82.2%",
    sexRatio: "890 ♀ per 1000 ♂",
    languages: ["Nepali", "Bhutia", "Lepcha", "English"],
    culture: `A tapestry of Nepali, Tibetan, and indigenous Lepcha traditions, Sikkim celebrates masked dances, mountain festivals, and a deep reverence for nature.`,
    artForms: [
      {
        name: "Thangka Painting",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Thangka_Himachal.jpg",
        description:
          "Tibetan Buddhist scroll paintings, richly colored and used in monastery rituals.",
      },
      {
        name: "Namkhan Shawl Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/55/Namkhan_shawl.jpg",
        description:
          "Handwoven emerald‑green woolen shawls from Namchi, prized for their softness.",
      },
      {
        name: "Mask Carving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Maruni_Dance.jpg",
        description:
          "Intricately carved wood masks worn in monastic Cham dances.",
      },
    ],
    heritageSites: [
      {
        name: "Tsomgo Lake",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/de/Tsomgo_Lake.jpg",
        description:
          "Sacred glacial lake at 3,753 m, ringed by prayer flags and yak herds.",
      },
      {
        name: "Rumtek Monastery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Rumtek_Monastery.jpg",
        description:
          "Seat of the Karmapa lineage, rebuilt in traditional Tibetan style.",
      },
      {
        name: "Nathula Pass",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5b/Nathula_Pass_Sikkim.jpg",
        description:
          "Mountain pass on the India‑China border at 4,310 m, offering panoramic vistas.",
      },
    ],
    food: [
      {
        name: "Phagshapa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/37/Phagshapa_Sikkim.jpg",
        description:
          "Spicy pork strips cooked with radish and chillies, a local delicacy.",
      },
      {
        name: "Sel Roti",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sel_Roti.jpg",
        description:
          "Sweet ring‑shaped rice doughnut, crispy outside and soft inside.",
      },
      {
        name: "Gundruk Soup",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/28/Gundruk_Soup.jpg",
        description:
          "Fermented leafy green soup, tangy and nourishing in cold climates.",
      },
    ],
    dances: [
      {
        name: "Maruni Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Maruni_Dance.jpg",
        description:
          "Colorful folk dance performed at festivals, featuring spinning and footwork.",
      },
      {
        name: "Cham Mask Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ponung_Dance.jpg",
        description:
          "Monastic ritual dance with masked performers embodying deities.",
      },
      {
        name: "Tamang Selo",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/Tamang_Selo.jpg",
        description:
          "Lively group dance of the Tamang community to the beat of damphu drums.",
      },
    ],
    famousPlaces: [
      {
        name: "Kanchenjunga",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ed/Kangchenjunga.jpg",
        description:
          "World’s third‑highest peak, revered by locals as a guardian deity.",
      },
      {
        name: "Gangtok",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Aizawl_City.jpg",
        description:
          "State capital perched on hill slopes, known for its vibrant bazaars and views.",
      },
      {
        name: "Pemayangtse Monastery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4d/Pemayangtse_Monastery.jpg",
        description:
          "Historic Nyingma monastery built in the 17th century, overlooking lush valleys.",
      },
    ],
    festivals: [
      {
        name: "Losar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/29/Losar_Sikkim.jpg",
        description:
          "Tibetan New Year celebrated with masked dances, feasts, and family gatherings.",
      },
      {
        name: "Losoong",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/64/Wangala_Dance.jpg",
        description:
          "Bhutia harvest festival featuring fire‑walking and archery competitions.",
      },
      {
        name: "Saga Dawa",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Saga_Dawa.jpg",
        description:
          "Buddhist festival marking Buddha’s birth, enlightenment, and parinirvana with prayer and offerings.",
      },
    ],
    traditionalDress: [
      {
        name: "Bakhu (Men & Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/22/Bakhu_Sikkim.jpg",
        description:
          "Traditional ankle‑length coat with a silk belt, worn with colorful scarves.",
      },
      {
        name: "Tibetan Shoes",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Tibetan_shoes.jpg",
        description:
          "Handcrafted woolen or leather boots decorated with bright patterns.",
      },
    ],
  },
  manipur: {
    name: "Manipur",
    description: `Known as the “Jewel of India,” Manipur enchants with its classical dance, floating Loktak Lake, and vibrant tribal festivals.`,
    history: `Manipur’s recorded history dates to the 1st century CE with Meitei kings; it later withstood Burmese invasions and became a princely state under British India. It merged into India in 1949, preserving its unique cultural identity.`,
    population: "3.2 million (2025 est.)",
    area: "22,327 km²",
    density: "143 people/km²",
    capital: "Imphal",
    region: "North East India",
    coordinates: "24.8170° N, 93.9368° E",
    gdp: "$8 billion (2023 est.)",
    literacyRate: "76.9%",
    sexRatio: "976 ♀ per 1000 ♂",
    languages: ["Meitei (Manipuri)", "English"],
    culture: `A fusion of Vaishnavite Hindu traditions and tribal customs, Manipur is famous for its Ras Leela dance, polo origins, and Lai Haraoba ritual festivals.`,
    artForms: [
      {
        name: "Manipuri Ras Leela Paintings",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Manipuri_Ras_Leela.jpg",
        description:
          "Delicate scene paintings depicting episodes from Krishna’s life, rendered in soft colors.",
      },
      {
        name: "Phanek Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Phanek_Manipur.jpg",
        description:
          "Traditional wraparound skirt woven by Meitei women in bright geometric motifs.",
      },
      {
        name: "Lai Haraoba Masks",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/cd/Lai_Haraoba.jpg",
        description:
          "Handcrafted wooden masks used in the Lai Haraoba festival to celebrate local deities.",
      },
    ],
    heritageSites: [
      {
        name: "Kangla Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Kangla_Fort_Imphal.jpg",
        description:
          "Ancient royal palace of the Meitei kings, overlooking the Imphal River.",
      },
      {
        name: "Loktak Lake",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Loktak_Lake.jpg",
        description:
          "India’s largest freshwater lake, famous for phumdis (floating islands) and the Keibul Lamjao Sanctuary.",
      },
      {
        name: "Keibul Lamjao National Park",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Keibul_Lamjao.jpg",
        description:
          "World’s only floating national park, home to the endangered sangai deer.",
      },
    ],
    food: [
      {
        name: "Eromba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1b/Eromba_Manipur.jpg",
        description:
          "Spicy mash of boiled vegetables and fermented fish, seasoned with chilies.",
      },
      {
        name: "Ngari",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Ngari_Dish.jpg",
        description:
          "Salted, fermented fish used as a flavoring agent in many Manipuri dishes.",
      },
      {
        name: "Chak-hao Kheer",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d9/Purple_Rice_Kheer.jpg",
        description:
          "Sweet pudding made from black rice native to Manipur, cooked with milk and sugar.",
      },
    ],
    dances: [
      {
        name: "Manipuri Ras Leela",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Manipuri_Ras_Leela.jpg",
        description:
          "Graceful classical dance dramatizing divine love stories of Radha and Krishna.",
      },
      {
        name: "Khamba Thoibi Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/37/Khamba_Thoibi.jpg",
        description:
          "Folk duet celebrating the legendary love of Khamba and Thoibi, performed at Moirang.",
      },
      {
        name: "Lai Haraoba Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/cd/Lai_Haraoba.jpg",
        description:
          "Ritual dance invoking deities, featuring enactments of creation myths.",
      },
    ],
    famousPlaces: [
      {
        name: "Shirui Hills",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Shirui_Hills.jpg",
        description:
          "Home to the rare Shirui Lily, these hills offer trekking with panoramic views.",
      },
      {
        name: "Imphal War Cemetery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/43/Imphal_War_Cemetery.jpg",
        description:
          "Memorial to Allied soldiers who fell during the 1944 Battle of Imphal in WWII.",
      },
      {
        name: "Thangjing Hill",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/83/Thangjing_Hill.jpg",
        description:
          "Sacred hill near Moirang with ancient shrines and scenic vistas.",
      },
    ],
    festivals: [
      {
        name: "Yaoshang",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/41/Yaoshang_Manipur.jpg",
        description:
          "Six‑day spring festival coinciding with Holi, featuring sports, dance, and color play.",
      },
      {
        name: "Lai Haraoba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/cd/Lai_Haraoba.jpg",
        description:
          "Ritual festival honoring the sylvan deities, with dance, music, and feasting.",
      },
      {
        name: "Ningol Chakouba",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ningol_Chakouba.jpg",
        description:
          "Sister‑brother feast festival where married women are invited to their parental homes for a meal.",
      },
    ],
    traditionalDress: [
      {
        name: "Phanek (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Phanek_Manipur.jpg",
        description:
          "Handwoven wraparound skirt with distinctive geometric borders.",
      },
      {
        name: "Dhoti Kurta (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9b/Jama_Manipur.jpg",
        description:
          "Traditional white dhoti paired with a loose kurta or the ceremonial “Jama.”",
      },
    ],
  },
  meghalaya: {
    name: "Meghalaya",
    description: `Literally “Abode of Clouds,” Meghalaya charms with its living root bridges, mist‑shrouded hills, and matrilineal Khasi and Garo cultures.`,
    history: `Once part of the Khasi and Jaintia kingdoms, Meghalaya became a separate state in 1972. Its tribal communities have maintained unique traditions, clan systems, and festivals tied to the rhythms of the monsoon.`,
    population: "3.6 million (2025 est.)",
    area: "22,429 km²",
    density: "160 people/km²",
    capital: "Shillong",
    region: "North East India",
    coordinates: "25.5788° N, 91.8933° E",
    gdp: "$10 billion (2023 est.)",
    literacyRate: "75.5%",
    sexRatio: "989 ♀ per 1000 ♂",
    languages: ["Khasi", "Garo", "English"],
    culture: `Meghalaya’s matrilineal Khasi and Garo societies observe clan inheritance through women, celebrate vibrant monsoon festivals, and express their heritage through folk music with gongs and bamboo instruments.`,
    artForms: [
      {
        name: "Hand‑woven Textiles",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d7/Jadoh_Meghalaya.jpg",
        description:
          "Traditional Khasi and Garo shawls and cloths woven from cotton or jute in geometric patterns.",
      },
      {
        name: "Bamboo Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Living_Root_Bridge.jpg",
        description:
          "Intricate baskets, furniture, and musical instruments carved from locally grown bamboo.",
      },
      {
        name: "Cane Work",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/75/Cherrapunji.jpg",
        description:
          "Woven cane mats, trays, and hats made by Garo artisans, often dyed with natural plant extracts.",
      },
    ],
    heritageSites: [
      {
        name: "Living Root Bridges",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4b/Living_Root_Bridge.jpg",
        description:
          "Engineered Ficus elastica roots trained over centuries to form pedestrian bridges in Cherrapunji and Mawlynnong.",
      },
      {
        name: "Cherrapunji & Mawsynram",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/75/Cherrapunji.jpg",
        description:
          "Among the world’s wettest places, featuring lush waterfalls and cloud forests.",
      },
      {
        name: "Nohkalikai Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e6/Nohkalikai_Falls.jpg",
        description:
          "India’s highest plunge waterfall at 340 m, cascading into a deep pool below.",
      },
    ],
    food: [
      {
        name: "Jadoh",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d7/Jadoh_Meghalaya.jpg",
        description:
          "Red rice cooked with pork and local spices, a staple Khasi one‑pot meal.",
      },
      {
        name: "Dohneiiong",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/ef/Dohneiiong_Dish.jpg",
        description:
          "Pork cooked in sesame seed paste and black sesame oil, pungent and rich.",
      },
      {
        name: "Tungtap",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1f/Tungtap.jpg",
        description:
          "Fermented soybean cake, fried or curried and served with rice.",
      },
    ],
    dances: [
      {
        name: "Shad Suk Mynsiem",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Shad_Suk_Mynsiem.jpg",
        description:
          "“Dance of the Joyful Hearts,” performed during autumn harvest by Khasi women in a circle.",
      },
      {
        name: "Wangala",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/Wangala_Dance.jpg",
        description:
          "Garo “Hundred Drums” festival dance celebrating the harvest with rhythmic drumming.",
      },
      {
        name: "Behdienkhlam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Meghalaya_festival.jpg",
        description:
          "Jaintia cleansing festival with mock battles, bamboo pole races, and communal feasts.",
      },
    ],
    famousPlaces: [
      {
        name: "Shillong",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/01/Shillong_view.jpg",
        description:
          "“Scotland of the East,” known for its British‑era architecture, waterfalls, and music scene.",
      },
      {
        name: "Mawlynnong",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mawlynnong_village.jpg",
        description:
          "India’s “cleanest village,” noted for its skywalk and eco‑tourism initiatives.",
      },
      {
        name: "Elephant Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Elephant_Falls_Meghalaya.jpg",
        description:
          "Multi‑tiered waterfall close to Shillong, set amid dense pine and bamboo forests.",
      },
    ],
    festivals: [
      {
        name: "Behdeinkhlam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Meghalaya_festival.jpg",
        description:
          "Three‑day pre‑monsoon festival to chase away evil spirits and pray for health.",
      },
      {
        name: "Wangala",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/Wangala_Dance.jpg",
        description:
          "Harvest festival of the Garo tribe featuring drum ensembles and dances.",
      },
      {
        name: "Shad Suk Mynsiem",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Shad_Suk_Mynsiem.jpg",
        description:
          "Khasi thanksgiving festival with dance, music, and offerings of rice and vegetables.",
      },
    ],
    traditionalDress: [
      {
        name: "Jainsem (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Jainsem_Khasi.jpg",
        description:
          "Two‑piece dress with a blouse and ankle‑length skirt, worn during festivals.",
      },
      {
        name: "Jymphong (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/db/Jymphong_Khasi.jpg",
        description:
          "Black coat and trousers with a turban, traditionally worn by Khasi men during ceremonies.",
      },
    ],
  },
  mizoram: {
    name: "Mizoram",
    description: `A verdant hill state in Northeast India, Mizoram is known for its bamboo dance, rolling hills, and warm tribal hospitality.`,
    history: `Inhabited by the Mizo tribes since the 16th century, Mizoram came under British rule in the late 19th century and became India’s 23rd state in 1987 after decades of insurgency and peace accords.`,
    population: "1.3 million (2025 est.)",
    area: "21,081 km²",
    density: "62 people/km²",
    capital: "Aizawl",
    region: "North East India",
    coordinates: "23.7104° N, 92.7246° E",
    gdp: "$4 billion (2023 est.)",
    literacyRate: "91.3%",
    sexRatio: "975 ♀ per 1000 ♂",
    languages: ["Mizo", "English", "Hindi"],
    culture: `Mizo culture is centered on community festivals, rich oral traditions, and a love of music and dance, particularly during the Chapchar Kut and Mim Kut celebrations.`,
    artForms: [
      {
        name: "Bamboo Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/07/Cheraw_Dance_Mizoram.jpg",
        description:
          "Intricate baskets, furniture, and decorative items woven from locally grown bamboo.",
      },
      {
        name: "Handloom Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c0/Sawhchiar_Rice.jpg",
        description:
          "Traditional Mizo shawls and wraparounds spun from mulberry silk and cotton.",
      },
      {
        name: "Traditional Tattooing",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Mizo_Men.jpg",
        description:
          "Ritual facial and hand tattoos once common among Mizo warriors, now rare and ceremonial.",
      },
    ],
    heritageSites: [
      {
        name: "Vantawng Falls",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vantawng_Falls.jpg",
        description:
          "Mizoram’s tallest waterfall, plunging 228 m through the evergreen rainforest.",
      },
      {
        name: "Solomon’s Temple, Aizawl",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Aizawl_City.jpg",
        description:
          "Modern landmark church with panoramic city views, symbolizing Christianity’s influence.",
      },
      {
        name: "Dampa Tiger Reserve",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dampa_Wildlife.jpg",
        description:
          "Protected area home to clouded leopards, hoolock gibbons, and diverse birdlife.",
      },
    ],
    food: [
      {
        name: "Bai",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/Bai_Mizoram.jpg",
        description:
          "Mixed vegetable stew flavored with bamboo shoots and local herbs, served with rice.",
      },
      {
        name: "Sawhchiar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c0/Sawhchiar_Rice.jpg",
        description:
          "Rice cooked in bamboo with meat or fish, imparting a smoky flavor.",
      },
      {
        name: "Zu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Mizo_drink.jpg",
        description:
          "Fermented rice beer traditionally brewed for festivals and community gatherings.",
      },
    ],
    dances: [
      {
        name: "Cheraw (Bamboo Dance)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/07/Cheraw_Dance_Mizoram.jpg",
        description:
          "Performers dance between moving bamboo poles, showcasing agility and rhythm.",
      },
      {
        name: "Chheihlam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chapchar_Kut.jpg",
        description:
          "Harvest festival dance performed with rhythmic hand claps and folk songs.",
      },
      {
        name: "Khuallam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Mizo_Men.jpg",
        description:
          "Men’s sword dance, reenacting tribal martial traditions during festivals.",
      },
    ],
    famousPlaces: [
      {
        name: "Aizawl",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Aizawl_City.jpg",
        description:
          "Hilltop city with scenic ridges, markets, and colonial-era architecture.",
      },
      {
        name: "Lunglei",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lunglei_hills.jpg",
        description:
          "Southern town known for its panoramic hikes and the Kawmzawl Peak viewpoint.",
      },
      {
        name: "Phawngpui (Blue Mountain)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Phawngpui_National_Park.jpg",
        description:
          "State’s highest peak at 2,157 m, surrounded by rare orchids and rhododendrons.",
      },
    ],
    festivals: [
      {
        name: "Chapchar Kut",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b6/Chapchar_Kut.jpg",
        description:
          "Spring festival celebrating the clearing of bamboo forests, with dances and feasts.",
      },
      {
        name: "Mim Kut",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/18/Mim_Kut.jpg",
        description:
          "Autumn festival marking millet harvest, with communal meals and thanksgiving.",
      },
      {
        name: "Pawl Kut",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/25/Pawl_Kut.jpg",
        description:
          "Harvest festival in March, involving prayer, dances, and sharing of meals.",
      },
    ],
    traditionalDress: [
      {
        name: "Puanchei (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/Mizo_shawl.jpg",
        description:
          "Handwoven shawl worn over a blouse and skirt, featuring vibrant motifs.",
      },
      {
        name: "Mizo Shirt & Lungi (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Mizo_Men.jpg",
        description:
          "Simple cotton shirt paired with a patterned wraparound lungi for daily wear.",
      },
    ],
  },
  nagaland: {
    name: "Nagaland",
    description: `Land of vibrant tribes and the famed Hornbill Festival, Nagaland is perched in the northeastern hills, offering rich cultural diversity and dramatic landscapes.`,
    history: `Nagaland’s Naga tribes maintained autonomy through centuries; the British established it as a district in 1866. Post‑independence insurgencies led to its formation as India’s 16th state in 1963, with ongoing efforts to preserve tribal identities and peace.`,
    population: "2.3 million (2025 est.)",
    area: "16,579 km²",
    density: "139 people/km²",
    capital: "Kohima",
    region: "North East India",
    coordinates: "25.6743° N, 94.7073° E",
    gdp: "$6 billion (2023 est.)",
    literacyRate: "80.1%",
    sexRatio: "931 ♀ per 1000 ♂",
    languages: ["English", "Various Naga dialects"],
    culture: `Nagaland’s 16 major tribes each celebrate unique festivals, music, and crafts, with a strong oral tradition and community feasts called “Moatsu” and “Sekrenyi.”`,
    artForms: [
      {
        name: "Naga Wood Carving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d2/Naga_Warrior_Attire.jpg",
        description:
          "Intricate carvings on headhunting shields and ceremonial stools, reflecting animistic beliefs.",
      },
      {
        name: "Textile Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c2/Ao_Tribe_Nagaland.jpg",
        description:
          "Handwoven shawls and wraparounds with bold geometric patterns symbolic of each tribe.",
      },
      {
        name: "Hornbill Pottery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Nagaland_pottery.jpg",
        description:
          "Clay pots and jars fired in wood‑fired kilns, used in everyday and ceremonial contexts.",
      },
    ],
    heritageSites: [
      {
        name: "Kohima War Cemetery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/2d/Kohima_War_Cemetery.jpg",
        description:
          "Memorial cemetery honoring soldiers of the 2nd World War’s Battle of Kohima.",
      },
      {
        name: "Dzukou Valley",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/12/Dzukou_Valley.jpg",
        description:
          "Verdant alpine valley, famous for seasonal carpets of wildflowers and trekking routes.",
      },
      {
        name: "Japfu Peak",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/91/Japfu_Peak_Nagaland.jpg",
        description:
          "Second‑highest peak in Nagaland, offering panoramic sunrise views above the cloud line.",
      },
    ],
    food: [
      {
        name: "Smoked Pork with Bamboo Shoot",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/Naga_Smoked_Pork.jpg",
        description:
          "Smoky pork curry cooked with bamboo shoots and local chilies, staple of Naga cuisine.",
      },
      {
        name: "Axone (Fermented Soybean)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Axone_dish.jpg",
        description:
          "Strong‑flavored soybean paste used in stews and chutneys, prized for umami depth.",
      },
      {
        name: "Galho",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Assamese_Dhoti_Kurta.jpg",
        description:
          "One‑pot rice and vegetable porridge seasoned with garlic and ginger, comfort food across tribes.",
      },
    ],
    dances: [
      {
        name: "Chang Lo",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Chang_Lo_Nagaland.jpg",
        description:
          "Victory dance of the Ao tribe, featuring forward‑leaning steps and synchronized arm movements.",
      },
      {
        name: "War Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3a/Naga_war_dance.jpg",
        description:
          "Imposing warrior dance with spears and shields, reenacting historic battles.",
      },
      {
        name: "Tsüngrem Mong",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tsungrem_Mong.jpg",
        description:
          "Monpa tribe’s house‑warming dance, marked by circular formations and folk songs.",
      },
    ],
    famousPlaces: [
      {
        name: "Kohima",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Kohima_city.jpg",
        description:
          "Capital city perched on rolling hills, known for its WWII history and Hornbill Festival grounds.",
      },
      {
        name: "Mon District",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/17/Mon_Nagaland.jpg",
        description:
          "Home to the Konyak tribe, famous for headhunting history and terraced rice fields.",
      },
      {
        name: "Shilloi Lake",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Shilloi_Lake.jpg",
        description:
          "Sacred high‑altitude lake set against pine forests, believed to be home to spirits.",
      },
    ],
    festivals: [
      {
        name: "Hornbill Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Hornbill_Festival.jpg",
        description:
          "Ten‑day “Festival of Festivals” in December, showcasing tribal dances, crafts, and cuisine.",
      },
      {
        name: "Sekrenyi",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sekrenyi.jpg",
        description:
          "Phek tribe’s purification festival in February, involving rice‑beer feasts and bathing rituals.",
      },
      {
        name: "Moatsu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/97/Moatsu.jpg",
        description:
          "Ao tribe’s post‑harvest festival in May, marked by communal dances and feasts.",
      },
    ],
    traditionalDress: [
      {
        name: "Naga Warrior Attire",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d2/Naga_Warrior_Attire.jpg",
        description:
          "Colorful textiles, headgear with feathers, and bead‑adorned necklaces worn by male dancers.",
      },
      {
        name: "Ao Tribe Shawl & Skirt",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c2/Ao_Tribe_Nagaland.jpg",
        description:
          "Women’s wraparound skirt with red and black stripes, paired with complementary shawl.",
      },
    ],
  },
  tripura: {
    name: "Tripura",
    description: `Nestled between Bangladesh and the eastern Himalayas, Tripura is rich in tribal heritage, royal palaces, and lush forests.`,
    history: `Tripura was ruled for centuries by the Manikya dynasty, whose capital at Udaipur (now Rangamati) prospered under trade links to Bengal and Myanmar. It became a princely state under British suzerainty and acceded to India in 1949, retaining its unique tribal traditions.`,
    population: "4.1 million (2025 est.)",
    area: "10,491 km²",
    density: "391 people/km²",
    capital: "Agartala",
    region: "North East India",
    coordinates: "23.9408° N, 91.9882° E",
    gdp: "$10 billion (2023 est.)",
    literacyRate: "87.8%",
    sexRatio: "961 ♀ per 1000 ♂",
    languages: ["Bengali", "Kokborok", "English"],
    culture: `A tapestry of Tripuri, Bengali, and Reang cultures celebrated through folk music, vibrant festivals, and community feasts.`,
    artForms: [
      {
        name: "Bamboo and Cane Craft",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Mui_Borok_Tripura.jpg",
        description:
          "Hand‑woven baskets, mats, and trays made by tribal artisans using locally sourced bamboo and cane.",
      },
      {
        name: "Rignai & Risa Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Rignai_Dress.jpg",
        description:
          "Traditional Tripuri textile patterns woven into wraparound skirts (Rignai) and shawls (Risa).",
      },
      {
        name: "Terracotta Pottery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e3/Terracotta_Tripura.jpg",
        description:
          "Clay pots and figurines molded and fired in open kilns, often used in rituals.",
      },
    ],
    heritageSites: [
      {
        name: "Ujjayanta Palace",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Ujjayanta_Palace.jpg",
        description:
          "Early 20th‑century royal palace in Agartala, now a state museum with royal artifacts.",
      },
      {
        name: "Neermahal",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Neermahal_Palace_Tripura.jpg",
        description:
          "Palace‌ in the middle of Rudrasagar Lake, blending Hindu and Mughal architectural styles.",
      },
      {
        name: "Unakoti",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5a/Unakoti_Sculptures.jpg",
        description:
          "Ancient rock‑cut sculptures of Shiva and other deities carved into a hillside.",
      },
    ],
    food: [
      {
        name: "Mui Borok",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Mui_Borok_Tripura.jpg",
        description:
          "Smoked fish dish served with rice, flavored by bamboo shoot and local spices.",
      },
      {
        name: "Bamboo Shoot Curry",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tripura_bamboo_shoot_curry.jpg",
        description:
          "Tangy curry of fermented bamboo shoots cooked with lentils and aromatics.",
      },
      {
        name: "Gudok",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Tripura_gudok.jpg",
        description:
          "Stew of mixed vegetables and fish, fermented with rice and local herbs for depth of flavor.",
      },
    ],
    dances: [
      {
        name: "Hojagiri",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Hojagiri_Dance.jpg",
        description:
          "A balancing folk dance performed by young women on earthen pitchers, native to Reang community.",
      },
      {
        name: "Mamita Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/93/Mamita_Dance_Tripura.jpg",
        description:
          "Harvest dance of the Tripuri, celebrating the season with rhythmic footwork and songs.",
      },
      {
        name: "Garia Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Garia_Puja.jpg",
        description:
          "Devotional dance performed during Garia Puja, invoking blessings for prosperity.",
      },
    ],
    famousPlaces: [
      {
        name: "Sepahijala Sanctuary",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/93/Sepahijala_Tripura.jpg",
        description:
          "Wildlife reserve near Agartala, home to primates, bears, and a botanical garden.",
      },
      {
        name: "Jampui Hills",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Jampui_Hills.jpg",
        description:
          "Scenic hill station known for orange orchards and panoramic views of lush valleys.",
      },
      {
        name: "Pilak Archaeological Site",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/46/Pilak_Site.jpg",
        description:
          "Remains of ancient Buddhist and Hindu temples dating back to 8th–12th centuries CE.",
      },
    ],
    festivals: [
      {
        name: "Garia Puja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Garia_Puja.jpg",
        description:
          "Four‑day harvest festival worshipping the deity Garia, with offerings and folk performances.",
      },
      {
        name: "Kharchi Puja",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/78/Kharchi_Puja.jpg",
        description:
          "Weeklong tribal festival honoring 14 deities, marked by procession and communal feasts.",
      },
      {
        name: "Ker Festival",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/8/8b/Ker_Festival.jpg",
        description:
          "Flower festival of the Reang, celebrating the blooming of Ker flowers on Jampui Hills.",
      },
    ],
    traditionalDress: [
      {
        name: "Rignai (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Rignai_Dress.jpg",
        description:
          "Handwoven wraparound skirt in distinctive tribal patterns, worn with a matching blouse.",
      },
      {
        name: "Risa & Rikutu (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Risa_Men.jpg",
        description:
          "Shawl (Risa) and transversely wrapped cloth (Rikuti) paired with a shirt or jacket.",
      },
    ],
  },
  telangana: {
    name: "Telangana",
    description: `India’s youngest state, Telangana is renowned for its historic Golconda Fort, vibrant Kakatiya heritage in Warangal, and the city of pearls, Hyderabad.`,
    history: `Carved out of Andhra Pradesh in 2014, Telangana draws on the legacy of the Satavahanas, Kakatiyas (12th–14th c.) and Qutb Shahi sultans. Hyderabad’s Nizams left a rich Indo‑Persian architectural and culinary heritage, later integrating into the Indian Union in 1948.`,
    population: "39 million (2025 est.)",
    area: "112,077 km²",
    density: "348 people/km²",
    capital: "Hyderabad",
    region: "South India",
    coordinates: "17.3850° N, 78.4867° E",
    gdp: "$140 billion (2023 est.)",
    literacyRate: "72.8%",
    sexRatio: "988 ♀ per 1000 ♂",
    languages: ["Telugu", "Urdu", "English"],
    culture: `Telangana’s culture blends Telugu classical arts with Deccan sultanate influences, celebrating Bonalu, Bathukamma, and a thriving film and IT scene.`,
    artForms: [
      {
        name: "Perini Sivatandavam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/26/Perini_Shivatandavam.jpg",
        description:
          "“Dance of Warriors,” a vigorous solo dance revived from Kakatiya temple traditions to honor Shiva.",
      },
      {
        name: "Telia Rumal Weaving",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Telia_rumal.jpg",
        description:
          "Block‑printed cotton cloth with distinctive masala‑dyed motifs, originating in Pochampally.",
      },
      {
        name: "Banjara embroidery",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/3/3a/Banjara_embroidery.jpg",
        description:
          "Colorful tribal needlework on garments and accessories by the nomadic Banjara community.",
      },
    ],
    heritageSites: [
      {
        name: "Golconda Fort",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e4/Golconda_Fort.jpg",
        description:
          "Massive hilltop fortress with ingenious acoustics and the famed Fateh Rahben cannon.",
      },
      {
        name: "Qutb Shahi Tombs",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Qutb_Shahi_Tombs.jpg",
        description:
          "Domed mausoleums set in landscaped gardens, showcasing Deccan Sultanate architecture.",
      },
      {
        name: "Ramappa Temple (UNESCO)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Ramappa_Temple.jpg",
        description:
          "13th‑century Kakatiya temple famed for floating bricks and intricate carvings of dancers.",
      },
    ],
    food: [
      {
        name: "Hyderabadi Biryani",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/b/bb/Hyderabadi_Chicken_Biryani.jpg",
        description:
          "Layered rice and marinated meat dum biryani, fragrant with saffron and kewra.",
      },
      {
        name: "Mirchi ka Salan",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mirchi_Ka_Salan.jpg",
        description:
          "Rich curry of green chilies in a spiced peanut and sesame sauce, served alongside biryani.",
      },
      {
        name: "Qubani ka Meetha",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/e/e5/Qubani_ka_Meetha.jpg",
        description:
          "Apricot compote dessert garnished with almonds and sometimes served with ice cream.",
      },
    ],
    dances: [
      {
        name: "Perini Sivatandavam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/2/26/Perini_Shivatandavam.jpg",
        description:
          "Warrior dance historically performed at Golconda to drum beats and temple chants.",
      },
      {
        name: "Bathukamma Festival Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bathukamma.jpg",
        description:
          "Women’s floral stack‑dance in concentric circles singing songs dedicated to Goddess Gauri.",
      },
      {
        name: "Dhappu Dance",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dhappu_Dance.jpg",
        description:
          "Energetic drum dance of the Lambadi community, featuring rhythmic leaps and spins.",
      },
    ],
    famousPlaces: [
      {
        name: "Hyderabad Charminar",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/9/93/Charminar_Hyderabad.jpg",
        description:
          "Iconic 16th‑century mosque‑monument in the old city, surrounded by bustling markets.",
      },
      {
        name: "Ramoji Film City",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Ramoji_Film_City.jpg",
        description:
          "World’s largest film studio complex and a major tourist attraction near Hyderabad.",
      },
      {
        name: "Kakatiya Kala Thoranam",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/0/06/Kakatiya_Arches.jpg",
        description:
          "Ornate sandstone arch in Warangal, a surviving ivory arch of the Kakatiya dynasty.",
      },
    ],
    festivals: [
      {
        name: "Bonalu",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/d/d0/Bonalu_Festival.jpg",
        description:
          "Regional festival offering pots of rice cooked with jaggery and curd to Mother Goddess.",
      },
      {
        name: "Bathukamma",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bathukamma.jpg",
        description:
          "Nine‑day floral festival celebrating the beauty of the goddess in colorful arrangements.",
      },
      {
        name: "Sammakka Saralamma Jatara",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/f9/Sammakka_Saralamma_Jatara.jpg",
        description:
          "Biannual tribal festival honoring forest goddess Sammakka, attracting millions to Medaram.",
      },
    ],
    traditionalDress: [
      {
        name: "Pancha Kattu (Men)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/a/ae/Telangana_Men_Pancha.jpg",
        description:
          "Traditional cotton dhoti wrap paired with a shirt or kurta, often in bright prints.",
      },
      {
        name: "Pochampally Saree (Women)",
        imageLink:
          "https://upload.wikimedia.org/wikipedia/commons/f/fc/Pochampally_Saree.jpg",
        description:
          "Ikat‑pattern silk saree handwoven in Bhoodan Pochampally, featuring bold geometric designs.",
      },
    ],
  },
  "jammu-and-kashmir": {
    name: 'Jammu & Kashmir',
    description: `Nestled in the Himalayas, Jammu & Kashmir boasts alpine meadows, serene lakes, and a rich tapestry of Kashmiri and Dogra traditions.`,
    history: `Former princely state since the 19th century under the Dogra dynasty, J&K acceded to India in 1947. It became a state in 1952 and was reorganized in 2019 as a union territory while preserving its cultural heritage amid complex political shifts.`,
    population: '14 million (2025 est.)',
    area: '125,535 km²',
    density: '112 people/km²',
    capital: 'Srinagar (summer), Jammu (winter)',
    region: 'North India',
    coordinates: '33.7782° N, 76.5762° E',
    gdp: '$20 billion (2023 est.)',
    literacyRate: '67.1%',
    sexRatio: '892 ♀ per 1000 ♂',
    languages: ['Kashmiri', 'Urdu', 'Dogri', 'Hindi', 'English'],
    culture: `A blend of Indo-Persian Sufi influences in the Valley and Dogra Hindu traditions in Jammu, celebrated through shrines, festivals, and crafts.`,
    artForms: [
      {
        name: 'Pashmina Weaving',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Kashmiri_Pashmina_Shawl.jpg',
        description: 'Handcrafted shawls woven from the fine undercoat wool of Changthangi goats.'
      },
      {
        name: 'Kashmiri Papier‑mâché',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Kashmiri_paper_mache_bowl.jpg',
        description: 'Colorful lacquered bowls, boxes and ornaments decorated with floral motifs.'
      },
      {
        name: 'Walnut Wood Carving',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kashmiri_woodcarving.jpg',
        description: 'Intricate inlaid furniture and panels crafted from local walnut timber.'
      }
    ],
    heritageSites: [
      {
        name: 'Dal Lake',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Dal_Lake_Srinagar.jpg',
        description: '“Jewel in the crown of Kashmir,” famed for houseboats, shikaras, and floating gardens.'
      },
      {
        name: 'Mughal Gardens',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Shalimar_Bagh.jpg',
        description: 'Terraced terrapin‑style gardens—Shalimar, Nishat and Chashme Shahi—built by Mughal emperors.'
      },
      {
        name: 'Vaishno Devi Shrine',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Vaishno_Devi.jpg',
        description: 'Major Hindu pilgrimage site in the Trikuta Hills, visited by millions annually.'
      }
    ],
    food: [
      {
        name: 'Rogan Josh',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Rogan_josh.jpg',
        description: 'Aromatic lamb curry in a yoghurt and Kashmiri chili sauce.'
      },
      {
        name: 'Gushtaba',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Gushtaba.jpg',
        description: 'Minced mutton meatballs cooked in creamy yoghurt gravy, served at Wazwan feasts.'
      },
      {
        name: 'Dum Aloo',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Kashmiri_dum_aloo.jpg',
        description: 'Baby potatoes slow‑cooked in a spiced yoghurt-based curry.'
      }
    ],
    dances: [
      {
        name: 'Rouf',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Rouf_dance.jpg',
        description: 'Kashmiri folk dance performed by women in rhythmic circular formations during harvest.'
      },
      {
        name: 'Bhand Pather',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bhand_Pather.jpg',
        description: 'Traditional folk theatre combining music, dance and satire, enacted by itinerant troupes.'
      },
      {
        name: 'Pandav Lila',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Pandav_Lila.jpg',
        description: 'Dramatic enactment of Mahabharata tales at Shiva pilgrimage sites in Jammu region.'
      }
    ],
    famousPlaces: [
      {
        name: 'Gulmarg',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Gulmarg.jpg',
        description: '“Meadow of Flowers,” a Himalayan resort known for skiing, gondola rides, and alpine meadows.'
      },
      {
        name: 'Pahalgam',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Pahalgam.jpg',
        description: 'Valley town on the Lidder River, gateway to Amarnath Yatra and trout fishing.'
      },
      {
        name: 'Jammu City',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Jammu_City.jpg',
        description: 'Winter capital with ancient temples like Raghunath and bazaars famed for Dogra handicrafts.'
      }
    ],
    festivals: [
      {
        name: 'Shikara Festival',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Shikara_Festival_Srinagar.jpg',
        description: 'Winter celebration on Dal Lake with shikara races, ice skating, and cultural events.'
      },
      {
        name: 'Tulip Festival',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Tulip_Garden_Srinagar.jpg',
        description: 'Springtime extravaganza at Indira Gandhi Memorial Tulip Garden, showcasing hundreds of tulip varieties.'
      },
      {
        name: 'Heritage Festival (Jammu)',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Jammu_Heritage.jpg',
        description: 'Winter arts festival highlighting Dogra music, dance, crafts and cuisine.'
      }
    ],
    traditionalDress: [
      {
        name: 'Pheran (Men & Women)',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Kashmiri_pheran.jpg',
        description: 'Loose woolen gown worn during winter, often paired with a kangri (portable fire pot).'
      },
      {
        name: 'Phiran & Salwar Kameez (Women)',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Kashmiri_women.jpg',
        description: 'Colourful embroidered tunic and trousers, worn with a headscarf called taranga.'
      }
    ]
  }

};

export default function StatePage() {
  const params = useParams<{ state: string }>();
  const state = stateData[params.state];
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  if (!state) return notFound();

  const stats = [
    { label: "Capital", value: state.capital },
    { label: "Region", value: state.region },
    { label: "Area", value: state.area },
    { label: "Population", value: state.population },
    { label: "Density", value: state.density },
    { label: "GDP", value: state.gdp },
    { label: "Literacy", value: state.literacyRate },
    { label: "Sex Ratio", value: state.sexRatio },
  ];

  const sections = [
    { title: "Art Forms", data: state.artForms },
    { title: "Heritage Sites", data: state.heritageSites },
    { title: "Famous Foods", data: state.food },
    { title: "Traditional Dances", data: state.dances },
    { title: "Famous Places", data: state.famousPlaces },
    { title: "Famous Festivals", data: state.festivals },
    { title: "Traditional Dresses", data: state.traditionalDress },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <h1 className="text-5xl font-extrabold text-sky-400 mb-6 tracking-tight">
          {state.name}
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto italic">
          {state.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition"
            >
              <p className="text-sm text-sky-300 uppercase font-medium">
                {s.label}
              </p>
              <p className="text-2xl text-white font-semibold mt-2">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Culture & History */}
        <div className="prose prose-invert prose-sky mx-auto mb-12 px-4">
          <h2>Culture Overview</h2>
          <p>{state.culture}</p>
          <h2>History</h2>
          <p>{state.history}</p>
        </div>

        {/* Media Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-12 px-4">
            <h2 className="text-3xl font-semibold text-sky-300 mb-6">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.data.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer overflow-hidden hover:bg-gray-700 transition"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.imageLink}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-sky-400">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative p-4 max-w-md w-full">
            <img
              src={selectedItem.imageLink}
              alt={selectedItem.name}
              className="w-full rounded-lg animate-scaleIn"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedItem.name}
              </h3>
              <p className="text-gray-200 mb-4">{selectedItem.description}</p>
              <button
                className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600 text-white"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-[var(--background)] text-white py-10">
        <h1 className="text-center text-4xl font-bold text-sky-400 mb-8">Cultural Chatbot</h1>
        <GeminiChat />
    </div>
    </>
  );
}
