const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Admin = require("./models/Admin");
const Destination = require("./models/Destination");
const Package = require("./models/Package");
const Testimonial = require("./models/Testimonial");
const Blog = require("./models/Blog");
const Subscriber = require("./models/Subscriber");

const destinations = [
  {
    "name": "Jaipur",
    "state": "Rajasthan",
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600",
    "images": [],
    "description": "The Pink City - known for its stunning palaces, forts, and vibrant culture.",
    "rating": 4.8,
    "reviews": 2450,
    "price": 8999,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "heritage",
    "featured": true,
    "active": true
  },
  {
    "name": "Goa",
    "state": "Goa",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    "images": [],
    "description": "Sun, sand, and sea - India's ultimate beach paradise with vibrant nightlife.",
    "rating": 4.7,
    "reviews": 3200,
    "price": 12999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "beach",
    "featured": true,
    "active": true
  },
  {
    "name": "Manali",
    "state": "Himachal Pradesh",
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
    "images": [],
    "description": "A breathtaking hill station nestled in the Himalayas with adventure sports.",
    "rating": 4.9,
    "reviews": 1890,
    "price": 10999,
    "duration": "5 Days / 4 Nights",
    "tags": [],
    "category": "mountain",
    "featured": true,
    "active": true
  },
  {
    "name": "Kerala",
    "state": "Kerala",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    "images": [],
    "description": "God's Own Country - serene backwaters, lush greenery, and Ayurvedic retreats.",
    "rating": 4.8,
    "reviews": 2780,
    "price": 15999,
    "duration": "5 Days / 4 Nights",
    "tags": [],
    "category": "nature",
    "featured": true,
    "active": true
  },
  {
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "image": "https://t4.ftcdn.net/jpg/04/08/25/05/360_F_408250543_MVaEVGeWxb4FiFy7mEGKj8nfYkwoAZON.jpg",
    "images": [
      "https://static.toiimg.com/thumb/107570872/Varanasi.jpg?width=636&height=358&resize=4"
    ],
    "description": "The spiritual capital of India - ancient temples and the sacred Ganges.",
    "rating": 4.6,
    "reviews": 1560,
    "price": 6999,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "spiritual",
    "featured": false,
    "active": true
  },
  {
    "name": "Ladakh",
    "state": "Jammu & Kashmir",
    "image": "https://images.pexels.com/photos/951927/pexels-photo-951927.jpeg?cs=srgb&dl=pexels-shashank-951927.jpg&fm=jpg",
    "images": [
      "https://t3.ftcdn.net/jpg/02/64/31/46/360_F_264314658_bMWblZcsJj9XTTwkOo1l4Z3eOIx9T3Qv.jpg"
    ],
    "description": "The Land of High Passes - stunning landscapes, monasteries, and adventure.",
    "rating": 4.9,
    "reviews": 980,
    "price": 22999,
    "duration": "7 Days / 6 Nights",
    "tags": [],
    "category": "adventure",
    "featured": true,
    "active": true
  },
  {
    "name": "Udaipur",
    "state": "Rajasthan",
    "image": "https://t4.ftcdn.net/jpg/00/85/61/27/360_F_85612737_veoCTufAsIuYJC8rjs06CA4HrLw30r8l.jpg",
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJL2ZaPTHTmLKdvi2sOHg0rpYU1tWnEsuzg&s",
      "https://cdn.pixabay.com/photo/2018/03/15/22/02/udaipur-3229676_1280.jpg"
    ],
    "description": "The City of Lakes - romantic palaces, shimmering lakes, and royal heritage.",
    "rating": 4.7,
    "reviews": 2100,
    "price": 9999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "heritage",
    "featured": false,
    "active": true
  },
  {
    "name": "Andaman Islands",
    "state": "Andaman & Nicobar",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    "images": [],
    "description": "Crystal-clear waters, pristine beaches, and vibrant coral reefs.",
    "rating": 4.8,
    "reviews": 1340,
    "price": 25999,
    "duration": "6 Days / 5 Nights",
    "tags": [],
    "category": "beach",
    "featured": false,
    "active": true
  },
  {
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "image": "https://t4.ftcdn.net/jpg/07/57/15/39/360_F_757153920_ye2oNLnIzilUqn5OP0adQyp2WFVZp8N8.jpg",
    "images": [
      "https://t3.ftcdn.net/jpg/04/74/52/86/360_F_474528672_vpQtkeor5wF3bF8wkm7Fbt3BOhlEoBRh.jpg",
      "https://t4.ftcdn.net/jpg/03/01/35/03/360_F_301350326_5gAQhd0fH2faDncnsGBJqCxroCUCsQVn.jpg"
    ],
    "description": "Yoga capital of the world with thrilling river rafting and spiritual vibes.",
    "rating": 4.6,
    "reviews": 1720,
    "price": 7499,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "name": "Darjeeling",
    "state": "West Bengal",
    "image": "https://media.istockphoto.com/id/896324660/photo/toy-train.jpg?s=612x612&w=0&k=20&c=z2BYZhzj3RhUNSfDeAnFwfkm-jPU-CNU4lTdQxRqMQM=",
    "images": [
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.pexels.com/photos/26764486/pexels-photo-26764486.jpeg?cs=srgb&dl=pexels-sayan-samanta-1460859263-26764486.jpg&fm=jpg",
      "https://t3.ftcdn.net/jpg/01/45/05/96/360_F_145059639_HkURCzmfUA5MXw6FbqPeks6FozkJD8OK.jpg"
    ],
    "description": "The Queen of Hills - tea gardens, toy trains, and mesmerizing sunrises.",
    "rating": 4.5,
    "reviews": 1450,
    "price": 11499,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "mountain",
    "featured": false,
    "active": true
  },
  {
    "name": "Agra",
    "state": "Uttar Pradesh",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
    "images": [],
    "description": "Home to the iconic Taj Mahal - a monument of eternal love and Mughal architecture.",
    "rating": 4.7,
    "reviews": 4200,
    "price": 5499,
    "duration": "2 Days / 1 Night",
    "tags": [],
    "category": "heritage",
    "featured": false,
    "active": true
  },
  {
    "name": "Shimla",
    "state": "Himachal Pradesh",
    "image": "https://images.pexels.com/photos/30550231/pexels-photo-30550231/free-photo-of-scenic-view-of-shimla-hills-at-sunrise.jpeg",
    "images": [
      "https://media.istockphoto.com/id/1318300669/photo/latest-views-of-snowfall-in-shimla.jpg?s=612x612&w=0&k=20&c=wZmPelTzmwwhIPuC0qtVn4BW1lVUQXAeY2Cqx4cdcwc=",
      "https://images.pexels.com/photos/1123069/pexels-photo-1123069.jpeg?cs=srgb&dl=pexels-digitalbuggu-1123069.jpg&fm=jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a1/b3/f4.jpg"
    ],
    "description": "The Queen of Hill Stations - colonial charm, Mall Road, and scenic beauty.",
    "rating": 4.5,
    "reviews": 2340,
    "price": 8499,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "mountain",
    "featured": false,
    "active": true
  },
  {
    "name": "Mysore",
    "state": "Karnataka",
    "image": "https://media.istockphoto.com/id/1281931838/photo/the-mysore-palace-at-night-in-mysore-in-southern-india.jpg?s=612x612&w=0&k=20&c=ylyE9VYrc008JnHKdXKDxbJx-_I2U8-oQFJDzwJk9Pw=",
    "images": [
      "https://media.istockphoto.com/id/172124032/photo/mysore-palace-at-dusk.jpg?s=612x612&w=0&k=20&c=paO74C_dVsY14IbK0RNqs0TD-lSteQy-AW5CnQFEb_4=",
      "https://images.pexels.com/photos/4124381/pexels-photo-4124381.jpeg?cs=srgb&dl=pexels-mohit-suthar-1271363-4124381.jpg&fm=jpg"
    ],
    "description": "The City of Palaces - royal heritage, sandalwood, and vibrant Dasara celebrations.",
    "rating": 4.6,
    "reviews": 1820,
    "price": 7999,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "heritage",
    "featured": true,
    "active": true
  },
  {
    "name": "Hampi",
    "state": "Karnataka",
    "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
    "images": [],
    "description": "A UNESCO World Heritage Site with stunning ruins of the Vijayanagara Empire.",
    "rating": 4.7,
    "reviews": 1100,
    "price": 6499,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "heritage",
    "featured": false,
    "active": true
  },
  {
    "name": "Munnar",
    "state": "Kerala",
    "image": "https://images.pexels.com/photos/13691355/pexels-photo-13691355.jpeg?cs=srgb&dl=pexels-nandhukumar-13691355.jpg&fm=jpg",
    "images": [
      "https://www.shutterstock.com/shutterstock/videos/3863138577/thumb/1.jpg?ip=x480",
      "https://t3.ftcdn.net/jpg/13/32/42/44/360_F_1332424429_kHGQK7vIG9KygIeoIX6byi9fcbSNArTH.jpg"
    ],
    "description": "Rolling tea gardens, misty mountains, and a paradise for nature lovers in the Western Ghats.",
    "rating": 4.8,
    "reviews": 2050,
    "price": 9499,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "nature",
    "featured": true,
    "active": true
  },
  {
    "name": "Ooty",
    "state": "Tamil Nadu",
    "image": "https://images.pexels.com/photos/32366710/pexels-photo-32366710.jpeg?cs=srgb&dl=pexels-neha-parganihaa-2152600083-32366710.jpg&fm=jpg",
    "images": [
      "https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?b=1&s=612x612&w=0&k=20&c=VMSkDXm5FQpgpJ-gxWXGWNOQ9O_NRuyvjEsYh6zNm50=",
      "https://t3.ftcdn.net/jpg/04/10/13/22/360_F_410132299_FcexXOF2dC0j73CGr4lm9jY9oNhNEpsK.jpg"
    ],
    "description": "The Queen of the Nilgiris - botanical gardens, toy train, and lush green valleys.",
    "rating": 4.5,
    "reviews": 1950,
    "price": 8999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "mountain",
    "featured": false,
    "active": true
  },
  {
    "name": "Coorg",
    "state": "Karnataka",
    "image": "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
    "images": [],
    "description": "The Scotland of India - coffee plantations, misty hills, and stunning waterfalls.",
    "rating": 4.7,
    "reviews": 1680,
    "price": 10499,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "nature",
    "featured": false,
    "active": true
  },
  {
    "name": "Amritsar",
    "state": "Punjab",
    "image": "https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=612x612&w=0&k=20&c=TAgZK64Qz6YsljOK1rXZrrW1u1YSlb9e_YBEmm2pfBw=",
    "images": [
      "https://media.istockphoto.com/id/1972458767/photo/majestic-view-of-golden-temple-in-amristar-punjab-india.jpg?s=612x612&w=0&k=20&c=vkK4sti1m-H2DC72zhEssitmEhDtXgAM7tQ6kFovp4o="
    ],
    "description": "Home of the Golden Temple - spiritual bliss, Wagah Border, and legendary food.",
    "rating": 4.8,
    "reviews": 3100,
    "price": 6999,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "spiritual",
    "featured": true,
    "active": true
  },
  {
    "name": "Jaisalmer",
    "state": "Rajasthan",
    "image": "https://c4.wallpaperflare.com/wallpaper/329/353/199/fort-jaisalmer-wallpaper-preview.jpg",
    "images": [
      "https://www.shutterstock.com/shutterstock/videos/3693342201/thumb/1.jpg?ip=x480",
      "https://t4.ftcdn.net/jpg/06/22/40/25/360_F_622402509_WQHZEHTXhCyDVWSfcH6QmtcIHFXuSXST.jpg"
    ],
    "description": "The Golden City - sand dunes, camel safaris, and a magnificent desert fort.",
    "rating": 4.7,
    "reviews": 1420,
    "price": 9999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "name": "Meghalaya",
    "state": "Meghalaya",
    "image": "https://t3.ftcdn.net/jpg/08/66/94/08/360_F_866940859_vyTEYM5S4u6IPfIfPjNn6ZNwsRWgvIn6.jpg",
    "images": [
      "https://media.istockphoto.com/id/540129900/photo/living-root-bridges-in-nongriat-meghalaya-india.jpg?s=612x612&w=0&k=20&c=BrZBaaQiHGkfr4H1osT7dQEKNamyD_yib2hvZSokgEw=",
      "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVnaGFsYXlhfGVufDB8fDB8fHww",
      "https://c0.wallpaperflare.com/preview/583/36/999/nature-dawki-meghalaya-umngot-river.jpg"
    ],
    "description": "The Abode of Clouds - living root bridges, crystal-clear rivers, and untouched beauty.",
    "rating": 4.9,
    "reviews": 870,
    "price": 16999,
    "duration": "6 Days / 5 Nights",
    "tags": [],
    "category": "nature",
    "featured": true,
    "active": true
  },
  {
    "name": "Kodaikanal",
    "state": "Tamil Nadu",
    "image": "https://t3.ftcdn.net/jpg/01/69/40/76/360_F_169407681_XbcWU19XwS3lrAhjLdy2NPB8xy76k1Y7.jpg",
    "images": [
      "https://media.istockphoto.com/id/492882716/photo/kodaikanal-tamil-nadu-the-picturesque-lake-in-the-british-colonial-town-on-the-palani-hills-in.jpg?s=612x612&w=0&k=20&c=WtYV07vjC_dYOzbo5AZW6IUPgBP6BQkngaX7REKRjpE=",
      "https://images.unsplash.com/photo-1692792284356-f80113facd09?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29kYWlrYW5hbHxlbnwwfHwwfHx8MA%3D%3D"
    ],
    "description": "The Princess of Hill Stations - star-shaped lake, pine forests, and waterfalls.",
    "rating": 4.5,
    "reviews": 1550,
    "price": 8499,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "mountain",
    "featured": false,
    "active": true
  },
  {
    "name": "Rameswaram",
    "state": "Tamil Nadu",
    "image": "https://w0.peakpx.com/wallpaper/860/64/HD-wallpaper-dhanushkodi-rameshwaram-harbour-pamban-bridge-bing.jpg",
    "images": [
      "https://www.shutterstock.com/shutterstock/videos/3751316751/thumb/1.jpg?ip=x480",
      "https://t3.ftcdn.net/jpg/12/11/22/40/360_F_1211224017_oNw0SM77nCiLkfOZmysb0pOxkgByCgx5.jpg",
      "https://wallpapercave.com/wp/wp9920418.jpg"
    ],
    "description": "A sacred island town with the famous Ramanathaswamy Temple and Pamban Bridge.",
    "rating": 4.6,
    "reviews": 1230,
    "price": 7499,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "spiritual",
    "featured": false,
    "active": true
  },
  {
    "name": "Lakshadweep",
    "state": "Lakshadweep",
    "image": "https://i.pinimg.com/736x/c9/d3/d1/c9d3d100ad2849f154a98b089ce40f3e.jpg",
    "images": [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
      "https://wallpapercave.com/wp/wp9215262.jpg"
    ],
    "description": "India's coral paradise - turquoise lagoons, white sand beaches, and untouched islands.",
    "rating": 4.9,
    "reviews": 640,
    "price": 29999,
    "duration": "5 Days / 4 Nights",
    "tags": [],
    "category": "beach",
    "featured": true,
    "active": true
  },
  {
    "name": "Kaziranga",
    "state": "Assam",
    "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600",
    "images": [
      "https://media.istockphoto.com/id/1227079384/photo/sunset-in-the-wild.jpg?s=612x612&w=0&k=20&c=wvV0klvkkZiF6ybOVQR-vJu74NJ-hgimUPOhG2Fi2l8=",
      "https://www.shutterstock.com/shutterstock/videos/3430075291/thumb/1.jpg?ip=x480",
      "https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2022/08/kaziranga-wildlife.jpg"
    ],
    "description": "Home to the one-horned rhinoceros - a UNESCO World Heritage wildlife sanctuary.",
    "rating": 4.7,
    "reviews": 920,
    "price": 13999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "nature",
    "featured": false,
    "active": true
  },
  {
    "name": "Sikkim",
    "state": "Sikkim",
    "image": "https://t4.ftcdn.net/jpg/02/24/29/81/360_F_224298196_zOmmoV8IKFZSszfQINgSAd3JIzBGBWi0.jpg",
    "images": [
      "https://t3.ftcdn.net/jpg/01/21/23/68/360_F_121236833_qW55yETyBDXcwPL3ZPioUt4uVd0DkYaQ.jpg",
      "https://media.istockphoto.com/id/1044788408/photo/gurudongmar-lake-highest-glacial-lake-of-india-in-sikkim.jpg?s=612x612&w=0&k=20&c=djh7XDJxq9o93focvM4iAuMpIbvEFgg_4iAFeVUeMc0="
    ],
    "description": "Land of monasteries and Kanchenjunga views - pristine Himalayan beauty at its best.",
    "rating": 4.8,
    "reviews": 780,
    "price": 18999,
    "duration": "6 Days / 5 Nights",
    "tags": [],
    "category": "mountain",
    "featured": true,
    "active": true
  },
  {
    "name": "Pushkar",
    "state": "Rajasthan",
    "image": "https://media.istockphoto.com/id/992290640/photo/pushkar-holy-lake-at-sunset-india.jpg?s=612x612&w=0&k=20&c=SUza8o43gj3EB3_W_3Yab1Wu4vNFvjSrZap6HyEgHAI=",
    "images": [
      "https://media.istockphoto.com/id/620735528/photo/sacred-pushkar-lake-rajasthan-india.jpg?s=612x612&w=0&k=20&c=ms9NIOl1f-Sb8JZYhG3mh00qQhJxuLrIaSItUPiY3U4=",
      "https://t4.ftcdn.net/jpg/02/46/88/67/360_F_246886773_BAJqfMMVpReatxLZrUhiX2bRzxZuDryE.jpg"
    ],
    "description": "A sacred lake town with the only Brahma Temple in the world and a famous camel fair.",
    "rating": 4.5,
    "reviews": 1100,
    "price": 5999,
    "duration": "2 Days / 1 Night",
    "tags": [],
    "category": "spiritual",
    "featured": false,
    "active": true
  },
  {
    "name": "Auli",
    "state": "Uttarakhand",
    "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=600",
    "images": [],
    "description": "India's premier ski destination with panoramic views of Nanda Devi and Himalayan peaks.",
    "rating": 4.8,
    "reviews": 650,
    "price": 14999,
    "duration": "5 Days / 4 Nights",
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "name": "Pondicherry",
    "state": "Tamil Nadu",
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600",
    "images": [],
    "description": "A French colonial gem - pastel streets, serene beaches, and Auroville's calm.",
    "rating": 4.6,
    "reviews": 1870,
    "price": 8999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "beach",
    "featured": false,
    "active": true
  },
  {
    "name": "Jim Corbett",
    "state": "Uttarakhand",
    "image": "https://t4.ftcdn.net/jpg/05/10/90/23/360_F_510902364_mFudAJMeYereOT2vNItXvkzg6xg6mHez.jpg",
    "images": [
      "https://media.istockphoto.com/id/1487988908/photo/wild-bengal-male-tiger-or-panthera-tigris-side-profile-in-natural-green-scenic-background.jpg?s=612x612&w=0&k=20&c=w7DQW5ne20rsy4hudWNUo-D_iTW0YgEq5cYiCmjN4r4=",
      "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/06/11170014/DSC_4018-1.jpg"
    ],
    "description": "India's oldest national park - thrilling tiger safaris and lush Himalayan foothills.",
    "rating": 4.7,
    "reviews": 1340,
    "price": 11999,
    "duration": "4 Days / 3 Nights",
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "name": "Spiti Valley",
    "state": "Himachal Pradesh",
    "image": "https://bharatjourneys.com/wp-content/uploads/2023/03/spiti.jpg",
    "images": [
      "https://img.freepik.com/premium-photo/spiti-valley-himachal-pradesh-india_564276-9051.jpg"
    ],
    "description": "The Middle Land - barren moonscapes, ancient monasteries, and star-lit skies.",
    "rating": 4.9,
    "reviews": 560,
    "price": 19999,
    "duration": "7 Days / 6 Nights",
    "tags": [],
    "category": "adventure",
    "featured": true,
    "active": true
  },
  {
    "name": "Khajuraho",
    "state": "Madhya Pradesh",
    "image": "https://media.istockphoto.com/id/528284252/photo/kjaruharo-temples-india.jpg?s=612x612&w=0&k=20&c=-iWM83PbINoAS5i_06cVjIDpe_yT0cE3uw0_iPoeWHM=",
    "images": [
      "https://media.istockphoto.com/id/177249944/photo/king-and-lion-fight-statue-kandariya-mahadev-temple.jpg?s=612x612&w=0&k=20&c=nBowCup6IKaA6m1oSfqTpz8YDQ6f2HzRS0XeMvlyLm0=",
      "https://media.istockphoto.com/id/157583060/photo/khajuraho-india-temple.jpg?s=612x612&w=0&k=20&c=QSCmOfYNOIHLSCiN0YyeVrkTpyiOgVpyLvj0x_JHPfk="
    ],
    "description": "UNESCO World Heritage temples showcasing exquisite medieval Indian art and architecture.",
    "rating": 4.6,
    "reviews": 980,
    "price": 6999,
    "duration": "2 Days / 1 Night",
    "tags": [],
    "category": "heritage",
    "featured": false,
    "active": true
  },
  {
    "name": "Digha",
    "state": "West Bengal",
    "image": "https://res.cloudinary.com/dmqssxipk/image/upload/v1772852375/tripzo/destinations/bxpr5ctcw5evq8w06pqz.jpg",
    "images": [
      "https://www.shutterstock.com/shutterstock/videos/18416485/thumb/1.jpg?ip=x480"
    ],
    "description": "Digha, West Bengal's premier seaside resort, are available through several professional stock photography platforms and free image repositories.",
    "rating": 4,
    "reviews": 12541,
    "price": 1200,
    "duration": "3 Days / 2 Nights",
    "tags": [],
    "category": "beach",
    "featured": false,
    "active": true
  }
];

const packages = [
  {
    "title": "Golden Triangle Tour",
    "destinations": [
      "Delhi",
      "Agra",
      "Jaipur"
    ],
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
    "images": [],
    "duration": "6 Days / 5 Nights",
    "price": 18999,
    "originalPrice": 24999,
    "rating": 4.8,
    "reviews": 890,
    "highlights": [
      "Taj Mahal Visit",
      "Amber Fort",
      "Qutub Minar",
      "City Palace"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Guide"
    ],
    "tags": [],
    "category": "popular",
    "featured": true,
    "active": true
  },
  {
    "title": "Kerala Backwaters Bliss",
    "destinations": [
      "Kochi",
      "Munnar",
      "Alleppey",
      "Kovalam"
    ],
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    "images": [],
    "duration": "7 Days / 6 Nights",
    "price": 22999,
    "originalPrice": 29999,
    "rating": 4.9,
    "reviews": 650,
    "highlights": [
      "Houseboat Stay",
      "Tea Plantations",
      "Beach Resort",
      "Ayurvedic Spa"
    ],
    "included": [
      "Hotels",
      "All Meals",
      "Transport",
      "Houseboat"
    ],
    "tags": [],
    "category": "popular",
    "featured": true,
    "active": true
  },
  {
    "title": "Ladakh Adventure Expedition",
    "destinations": [
      "Leh",
      "Nubra Valley",
      "Pangong Lake",
      "Khardung La"
    ],
    "image": "https://i.pinimg.com/736x/e5/9a/c2/e59ac2b742698adf2d3e4a4cc1d6270a.jpg",
    "images": [
      "https://wallpapercave.com/wp/wp7029155.jpg",
      "https://thumbs.dreamstime.com/b/k-shot-majestic-sissu-monastery-lahaul-valley-himachal-pradesh-india-nature-landscape-k-shot-majestic-sissu-monastery-338448597.jpg"
    ],
    "duration": "8 Days / 7 Nights",
    "price": 28999,
    "originalPrice": 35999,
    "rating": 4.9,
    "reviews": 420,
    "highlights": [
      "Pangong Lake Camping",
      "Khardung La Pass",
      "Monastery Visits",
      "Camel Safari"
    ],
    "included": [
      "Hotels",
      "All Meals",
      "Transport",
      "Permits"
    ],
    "tags": [],
    "category": "adventure",
    "featured": true,
    "active": true
  },
  {
    "title": "Rajasthan Royal Heritage",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Jaisalmer"
    ],
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600",
    "images": [],
    "duration": "10 Days / 9 Nights",
    "price": 32999,
    "originalPrice": 42999,
    "rating": 4.8,
    "reviews": 780,
    "highlights": [
      "Desert Safari",
      "Palace Stay",
      "Lake Pichola Cruise",
      "Mehrangarh Fort"
    ],
    "included": [
      "Heritage Hotels",
      "Breakfast",
      "AC Transport",
      "Guide"
    ],
    "tags": [],
    "category": "luxury",
    "featured": false,
    "active": true
  },
  {
    "title": "Goa Beach Carnival",
    "destinations": [
      "North Goa",
      "South Goa",
      "Old Goa"
    ],
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    "images": [],
    "duration": "5 Days / 4 Nights",
    "price": 14999,
    "originalPrice": 19999,
    "rating": 4.7,
    "reviews": 1200,
    "highlights": [
      "Beach Parties",
      "Water Sports",
      "Church Visits",
      "Spice Plantation"
    ],
    "included": [
      "Resort Stay",
      "Breakfast",
      "Airport Transfer",
      "Sightseeing"
    ],
    "tags": [],
    "category": "popular",
    "featured": false,
    "active": true
  },
  {
    "title": "Himalayan Honeymoon Special",
    "destinations": [
      "Shimla",
      "Manali",
      "Kullu",
      "Rohtang"
    ],
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
    "images": [],
    "duration": "7 Days / 6 Nights",
    "price": 19999,
    "originalPrice": 26999,
    "rating": 4.8,
    "reviews": 560,
    "highlights": [
      "Snow Point Visit",
      "River Rafting",
      "Solang Valley",
      "Mall Road"
    ],
    "included": [
      "Deluxe Hotels",
      "All Meals",
      "Volvo Bus",
      "Sightseeing"
    ],
    "tags": [],
    "category": "honeymoon",
    "featured": false,
    "active": true
  },
  {
    "title": "Mysore & Coorg Coffee Trail",
    "destinations": [
      "Mysore",
      "Coorg",
      "Wayanad"
    ],
    "image": "https://t4.ftcdn.net/jpg/16/08/60/37/360_F_1608603767_v3kaZfmR1gmjbD0S5xTfjmGFvb04PNZA.jpg",
    "images": [
      "https://www.asianadventures.net/sites/default/files/cocoon/Tea-Garden-Ooty.jpg"
    ],
    "duration": "5 Days / 4 Nights",
    "price": 13999,
    "originalPrice": 18999,
    "rating": 4.7,
    "reviews": 430,
    "highlights": [
      "Mysore Palace",
      "Coffee Plantation Tour",
      "Abbey Falls",
      "Dubare Elephant Camp"
    ],
    "included": [
      "Resort Stay",
      "Breakfast",
      "Transport",
      "Plantation Visit"
    ],
    "tags": [],
    "category": "family",
    "featured": false,
    "active": true
  },
  {
    "title": "Northeast Explorer - Meghalaya",
    "destinations": [
      "Shillong",
      "Cherrapunji",
      "Dawki",
      "Mawlynnong"
    ],
    "image": "https://northeastexplorers.in/wp-content/uploads/2025/02/meghalaya-in-monsoons-scaled.jpg",
    "images": [
      "https://exoticexpeditions.org/wp-content/uploads/2015/10/northeast3.jpg",
      "https://s3.ap-south-1.amazonaws.com/heenawebdata/front/tourmaster/MWALLYNONG-Day-541710744088.jpeg"
    ],
    "duration": "6 Days / 5 Nights",
    "price": 19999,
    "originalPrice": 25999,
    "rating": 4.9,
    "reviews": 310,
    "highlights": [
      "Living Root Bridges",
      "Dawki River Boating",
      "Cleanest Village",
      "Nohkalikai Falls"
    ],
    "included": [
      "Hotels",
      "All Meals",
      "Transport",
      "Guide"
    ],
    "tags": [],
    "category": "adventure",
    "featured": true,
    "active": true
  },
  {
    "title": "Amritsar Spiritual Retreat",
    "destinations": [
      "Amritsar",
      "Wagah Border"
    ],
    "image": "https://www.theloverspoint.com/wp-content/uploads/2026/02/golden-temple-photos.png",
    "images": [
      "https://assets.cntraveller.in/photos/670f8e406132a95797b4914a/1:1/w_3800,h_3800,c_limit/GettyImages-142737748.jpg",
      "https://media.istockphoto.com/id/1972458767/photo/majestic-view-of-golden-temple-in-amristar-punjab-india.jpg?s=612x612&w=0&k=20&c=vkK4sti1m-H2DC72zhEssitmEhDtXgAM7tQ6kFovp4o="
    ],
    "duration": "3 Days / 2 Nights",
    "price": 8499,
    "originalPrice": 11999,
    "rating": 4.8,
    "reviews": 920,
    "highlights": [
      "Golden Temple",
      "Wagah Border Ceremony",
      "Jallianwala Bagh",
      "Amritsari Kulcha Trail"
    ],
    "included": [
      "Hotel",
      "Breakfast",
      "Transport",
      "Guide"
    ],
    "tags": [],
    "category": "budget",
    "featured": false,
    "active": true
  },
  {
    "title": "Lakshadweep Island Getaway",
    "destinations": [
      "Agatti Island",
      "Bangaram",
      "Kavaratti"
    ],
    "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
    "images": [],
    "duration": "5 Days / 4 Nights",
    "price": 34999,
    "originalPrice": 44999,
    "rating": 4.9,
    "reviews": 220,
    "highlights": [
      "Scuba Diving",
      "Glass-Bottom Boat",
      "Kayaking",
      "Snorkeling"
    ],
    "included": [
      "Beach Resort",
      "All Meals",
      "Flights",
      "Water Sports"
    ],
    "tags": [],
    "category": "luxury",
    "featured": true,
    "active": true
  },
  {
    "title": "Spiti Valley Road Trip",
    "destinations": [
      "Manali",
      "Kunzum Pass",
      "Kaza",
      "Key Monastery"
    ],
    "image": "https://ik.imagekit.io/yd29mwkn4/images/uploads/gallery/large/60836.jpg?tr=w-1080,h-720",
    "images": [],
    "duration": "8 Days / 7 Nights",
    "price": 24999,
    "originalPrice": 32999,
    "rating": 4.9,
    "reviews": 280,
    "highlights": [
      "Key Monastery",
      "Chandratal Lake",
      "Kunzum Pass",
      "Stargazing Camp"
    ],
    "included": [
      "Camps & Hotels",
      "All Meals",
      "4x4 Vehicle",
      "Permits"
    ],
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "title": "Sikkim Monastery Circuit",
    "destinations": [
      "Gangtok",
      "Pelling",
      "Namchi",
      "Ravangla"
    ],
    "image": "https://www.esikkimtourism.in/wp-content/uploads/2018/10/climate-bnnr.jpg",
    "images": [
      "https://media.istockphoto.com/id/2228503994/photo/rumtek-monastery-in-lush-green-hills-of-himalayas.jpg?s=612x612&w=0&k=20&c=2hCFwi2i0CasR6Qe1WR9OPJVf4lwG32nsfrC1Y-JA94="
    ],
    "duration": "7 Days / 6 Nights",
    "price": 21999,
    "originalPrice": 28999,
    "rating": 4.8,
    "reviews": 350,
    "highlights": [
      "Tsomgo Lake",
      "Rumtek Monastery",
      "Kanchenjunga Views",
      "Yak Ride"
    ],
    "included": [
      "Hotels",
      "All Meals",
      "Jeep Safari",
      "Permits"
    ],
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "title": "Andaman Scuba Special",
    "destinations": [
      "Port Blair",
      "Havelock Island",
      "Neil Island"
    ],
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    "images": [],
    "duration": "6 Days / 5 Nights",
    "price": 29999,
    "originalPrice": 38999,
    "rating": 4.8,
    "reviews": 480,
    "highlights": [
      "Scuba Diving",
      "Radhanagar Beach",
      "Cellular Jail",
      "Sea Walking"
    ],
    "included": [
      "Beach Resort",
      "Breakfast",
      "Ferry",
      "Scuba Session"
    ],
    "tags": [],
    "category": "luxury",
    "featured": false,
    "active": true
  },
  {
    "title": "Hampi Heritage Walk",
    "destinations": [
      "Hampi",
      "Badami",
      "Aihole"
    ],
    "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
    "images": [],
    "duration": "4 Days / 3 Nights",
    "price": 9999,
    "originalPrice": 13999,
    "rating": 4.7,
    "reviews": 370,
    "highlights": [
      "Virupaksha Temple",
      "Stone Chariot",
      "Badami Caves",
      "Coracle Ride"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Historian Guide"
    ],
    "tags": [],
    "category": "budget",
    "featured": false,
    "active": true
  },
  {
    "title": "Jim Corbett Wildlife Safari",
    "destinations": [
      "Jim Corbett",
      "Nainital",
      "Bhimtal"
    ],
    "image": "https://media.istockphoto.com/id/2187865173/photo/wildlife-safari-gypsies-tracking-tiger-natural-tyndall-effect-by-sun-rays-in-cold-winter.jpg?s=612x612&w=0&k=20&c=kxXz38WHs0EeaSXjSQ5k-_tkM-dyqLAXx57hwD6sVW8=",
    "images": [
      "https://media.istockphoto.com/id/1548209703/photo/wild-male-leopard-or-panther-or-panthera-pardus-fusca-with-eye-contact-resting-on-natural.jpg?s=612x612&w=0&k=20&c=mcg9yO0ZtYNpTlFMbJuykXfyHlGyHdPeTRtc9wBhkoo="
    ],
    "duration": "5 Days / 4 Nights",
    "price": 16999,
    "originalPrice": 22999,
    "rating": 4.7,
    "reviews": 590,
    "highlights": [
      "Tiger Safari",
      "Jungle Night Stay",
      "Nainital Lake",
      "Bird Watching"
    ],
    "included": [
      "Jungle Lodge",
      "All Meals",
      "Jeep Safari",
      "Park Entry"
    ],
    "tags": [],
    "category": "family",
    "featured": true,
    "active": true
  },
  {
    "title": "Pondicherry French Riviera",
    "destinations": [
      "Pondicherry",
      "Auroville",
      "Mahabalipuram"
    ],
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600",
    "images": [],
    "duration": "4 Days / 3 Nights",
    "price": 11499,
    "originalPrice": 15999,
    "rating": 4.6,
    "reviews": 720,
    "highlights": [
      "French Quarter Walk",
      "Auroville Visit",
      "Beach Cycling",
      "Scuba Diving"
    ],
    "included": [
      "Boutique Hotel",
      "Breakfast",
      "Transport",
      "Cycling Gear"
    ],
    "tags": [],
    "category": "budget",
    "featured": false,
    "active": true
  },
  {
    "title": "Varanasi & Bodh Gaya Spiritual",
    "destinations": [
      "Varanasi",
      "Sarnath",
      "Bodh Gaya"
    ],
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600",
    "images": [],
    "duration": "5 Days / 4 Nights",
    "price": 10999,
    "originalPrice": 14999,
    "rating": 4.6,
    "reviews": 640,
    "highlights": [
      "Ganga Aarti",
      "Sarnath Stupa",
      "Bodhi Tree",
      "Boat Ride at Dawn"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Guide"
    ],
    "tags": [],
    "category": "budget",
    "featured": false,
    "active": true
  },
  {
    "title": "Ooty & Munnar Tea Country",
    "destinations": [
      "Ooty",
      "Coonoor",
      "Munnar"
    ],
    "image": "https://www.shutterstock.com/shutterstock/videos/3881101343/thumb/1.jpg?ip=x480",
    "images": [
      "https://t3.ftcdn.net/jpg/08/66/93/80/360_F_866938032_7UspEa1EG6ET2UR76MlcG2NCy3bkJ853.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfZ0M1DmsmE7OTgmJ2y18MWslvNbyyVxfxA&s"
    ],
    "duration": "6 Days / 5 Nights",
    "price": 14999,
    "originalPrice": 19999,
    "rating": 4.7,
    "reviews": 510,
    "highlights": [
      "Nilgiri Toy Train",
      "Tea Museum",
      "Botanical Gardens",
      "Eravikulam National Park"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Train Tickets"
    ],
    "tags": [],
    "category": "family",
    "featured": false,
    "active": true
  },
  {
    "title": "Rajasthan Desert Camp Experience",
    "destinations": [
      "Jaisalmer",
      "Sam Sand Dunes",
      "Pushkar"
    ],
    "image": "https://cdn.getyourguide.com/img/tour/25b3949bf7bc9b4970a9a42cc12ce5994eb3cc59447e26807d7d0f49da99d6e7.jpg/68.jpg",
    "images": [
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/01/83/59.jpg",
      "https://miro.medium.com/v2/resize:fit:1200/1*UyevmIu88HFdzv2WrblUTA.jpeg"
    ],
    "duration": "5 Days / 4 Nights",
    "price": 15999,
    "originalPrice": 21999,
    "rating": 4.8,
    "reviews": 440,
    "highlights": [
      "Desert Camping",
      "Camel Safari",
      "Folk Music Night",
      "Pushkar Lake"
    ],
    "included": [
      "Desert Camp",
      "All Meals",
      "Jeep Safari",
      "Cultural Show"
    ],
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "title": "Kashmir Paradise Deluxe",
    "destinations": [
      "Srinagar",
      "Gulmarg",
      "Pahalgam",
      "Sonmarg"
    ],
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600",
    "images": [],
    "duration": "7 Days / 6 Nights",
    "price": 26999,
    "originalPrice": 34999,
    "rating": 4.9,
    "reviews": 680,
    "highlights": [
      "Dal Lake Shikara",
      "Gondola Ride",
      "Betaab Valley",
      "Mughal Gardens"
    ],
    "included": [
      "Houseboat + Hotels",
      "All Meals",
      "Transport",
      "Shikara Ride"
    ],
    "tags": [],
    "category": "honeymoon",
    "featured": true,
    "active": true
  },
  {
    "title": "Auli Skiing Adventure",
    "destinations": [
      "Auli",
      "Joshimath",
      "Chopta"
    ],
    "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=600",
    "images": [],
    "duration": "6 Days / 5 Nights",
    "price": 18999,
    "originalPrice": 24999,
    "rating": 4.8,
    "reviews": 290,
    "highlights": [
      "Skiing Lessons",
      "Cable Car Ride",
      "Tungnath Trek",
      "Nanda Devi Views"
    ],
    "included": [
      "Hotels",
      "All Meals",
      "Ski Equipment",
      "Instructor"
    ],
    "tags": [],
    "category": "adventure",
    "featured": false,
    "active": true
  },
  {
    "title": "Darjeeling & Gangtok Combo",
    "destinations": [
      "Darjeeling",
      "Gangtok",
      "Kalimpong"
    ],
    "image": "https://www.akkcrusier.com/blog/wp-content/uploads/2025/10/istockphoto-1318071713-612x612-1.jpg",
    "images": [
      "https://ik.imagekit.io/yd29mwkn4/images/uploads/packages/large/50813.jpg?tr=w-1080,h-720",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWRObgH9hbrzSvW5m3RL05eTKbJBFVDzlQg&s"
    ],
    "duration": "7 Days / 6 Nights",
    "price": 17999,
    "originalPrice": 23999,
    "rating": 4.7,
    "reviews": 520,
    "highlights": [
      "Tiger Hill Sunrise",
      "Tea Garden Tour",
      "Rumtek Monastery",
      "Tsomgo Lake"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Permits"
    ],
    "tags": [],
    "category": "popular",
    "featured": false,
    "active": true
  },
  {
    "title": "Kaziranga & Majuli Island",
    "destinations": [
      "Kaziranga",
      "Majuli Island",
      "Jorhat"
    ],
    "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600",
    "images": [],
    "duration": "5 Days / 4 Nights",
    "price": 15499,
    "originalPrice": 20999,
    "rating": 4.7,
    "reviews": 260,
    "highlights": [
      "Rhino Safari",
      "Majuli Island Visit",
      "Assam Tea Tasting",
      "Mask Making"
    ],
    "included": [
      "Eco Lodge",
      "All Meals",
      "Jeep Safari",
      "Boat Ride"
    ],
    "tags": [],
    "category": "family",
    "featured": false,
    "active": true
  },
  {
    "title": "South India Temple Trail",
    "destinations": [
      "Madurai",
      "Rameswaram",
      "Thanjavur",
      "Trichy"
    ],
    "image": "https://t4.ftcdn.net/jpg/08/70/23/61/360_F_870236140_HwTWSbkhcuIjJ9ciMfNWpzkRcEPczFkQ.jpg",
    "images": [
      "https://t4.ftcdn.net/jpg/02/96/40/39/360_F_296403993_oxQTsstYc83xJqzaAjz5cv1PePLoMRd1.jpg",
      "https://t4.ftcdn.net/jpg/01/45/70/33/360_F_145703345_vUCPyUn4Vsac8yQQvBOeD1yAGaCJMX67.jpg"
    ],
    "duration": "6 Days / 5 Nights",
    "price": 12999,
    "originalPrice": 17999,
    "rating": 4.6,
    "reviews": 410,
    "highlights": [
      "Meenakshi Temple",
      "Pamban Bridge",
      "Brihadeeswara Temple",
      "Rock Fort"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "AC Transport",
      "Guide"
    ],
    "tags": [],
    "category": "popular",
    "featured": false,
    "active": true
  },
  {
    "title": "Khajuraho & Orchha Heritage",
    "destinations": [
      "Khajuraho",
      "Orchha",
      "Panna"
    ],
    "image": "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/06/23181924/Khajuraho-FI-1600x900.jpg",
    "images": [
      "https://5.imimg.com/data5/HY/OJ/GLADMIN-65618487/rajasthan-khajuraho-orchha-tour.png",
      "https://res.cloudinary.com/tourhq/image/upload/fl_progressive,f_auto,h_507,w_900,g_auto,c_fill,q_auto/goh0f9uoqvmlrdez9qug"
    ],
    "duration": "4 Days / 3 Nights",
    "price": 10999,
    "originalPrice": 14999,
    "rating": 4.6,
    "reviews": 320,
    "highlights": [
      "Temple Sculptures",
      "Orchha Fort",
      "Panna Tiger Reserve",
      "Sound & Light Show"
    ],
    "included": [
      "Hotels",
      "Breakfast",
      "Transport",
      "Park Entry"
    ],
    "tags": [],
    "category": "budget",
    "featured": false,
    "active": true
  },
  {
    "title": "Kodaikanal Family Retreat",
    "destinations": [
      "Kodaikanal",
      "Palani",
      "Dindigul"
    ],
    "image": "https://pix10.agoda.net/hotelImages/1094271/-1/864d1405c7478c0dce5cb34c58207523.jpg?ca=23&ce=0&s=414x232",
    "images": [
      "https://media-cdn.tripadvisor.com/media/photo-m/1280/29/3b/ee/f4/caption.jpg",
      "https://media.istockphoto.com/id/1176632636/photo/kodaikanal-south-india-looking-down-at-kodaikanal-lake-from-a-higher-elevation-in-the.jpg?s=612x612&w=0&k=20&c=xs7EM24iGcqUi1YgkWK1-BykHU3In6lFEY4gLXate1o="
    ],
    "duration": "4 Days / 3 Nights",
    "price": 11999,
    "originalPrice": 16999,
    "rating": 4.5,
    "reviews": 480,
    "highlights": [
      "Star-Shaped Lake",
      "Coaker's Walk",
      "Pillar Rocks",
      "Pine Forest Cycling"
    ],
    "included": [
      "Resort Stay",
      "Breakfast",
      "Transport",
      "Boating"
    ],
    "tags": [],
    "category": "family",
    "featured": false,
    "active": true
  }
];

const testimonials = [
  {
    "name": "Priya Sharma",
    "location": "Mumbai",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "rating": 5,
    "text": "Tripzo made our Kerala trip absolutely magical! The houseboat experience was beyond our expectations. Every detail was perfectly planned.",
    "tour": "Kerala Backwaters Bliss",
    "active": true
  },
  {
    "name": "Rahul Verma",
    "location": "Delhi",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    "rating": 5,
    "text": "The Ladakh expedition was a life-changing experience. The team handled everything from permits to accommodations flawlessly.",
    "tour": "Ladakh Adventure Expedition",
    "active": true
  },
  {
    "name": "Anjali Desai",
    "location": "Bangalore",
    "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    "rating": 4,
    "text": "Our Golden Triangle tour was perfectly organized. The guide was knowledgeable and the hotels were excellent. Highly recommend!",
    "tour": "Golden Triangle Tour",
    "active": true
  },
  {
    "name": "Vikram Singh",
    "location": "Jaipur",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    "rating": 5,
    "text": "Booked the Goa package for our anniversary. Everything was seamless - from the resort to the water sports. Will book again!",
    "tour": "Goa Beach Carnival",
    "active": true
  },
  {
    "name": "Sneha Patel",
    "location": "Ahmedabad",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    "rating": 5,
    "text": "The Rajasthan tour gave us royal treatment! The desert safari under the stars was unforgettable. Tripzo is our go-to for travel.",
    "tour": "Rajasthan Royal Heritage",
    "active": true
  }
];

const blogs = [
  {
    "title": "10 Hidden Gems in Rajasthan You Must Visit",
    "excerpt": "Beyond Jaipur and Udaipur, Rajasthan holds countless treasures waiting to be discovered...",
    "content": "",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600",
    "author": "Tripzo Team",
    "authorAvatar": "",
    "authorBio": "",
    "category": "Travel Guide",
    "readTime": "5 min read",
    "active": true
  },
  {
    "title": "Ultimate Guide to Backpacking in Kerala",
    "excerpt": "From misty mountains to serene backwaters, plan your perfect Kerala backpacking trip...",
    "content": "",
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600",
    "author": "Tripzo Team",
    "authorAvatar": "",
    "authorBio": "",
    "category": "Tips & Tricks",
    "readTime": "7 min read",
    "active": true
  },
  {
    "title": "Best Time to Visit Ladakh: A Complete Guide",
    "excerpt": "Planning a Ladakh trip? Here's everything you need to know about timing your visit...",
    "content": "",
    "image": "https://vargiskhan.com/log/wp-content/uploads/2017/04/best-time-to-visit-ladakh-1-1.jpg",
    "author": "Tripzo Team",
    "authorAvatar": "",
    "authorBio": "",
    "category": "Planning",
    "readTime": "6 min read",
    "active": true
  }
];

const subscribers = [
  {
    "email": "deepguchhait01@gmail.com",
    "active": true
  },
  {
    "email": "asimsamenta12357@gmail.com",
    "active": true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Destination.deleteMany({}),
      Package.deleteMany({}),
      Testimonial.deleteMany({}),
      Blog.deleteMany({}),
      Subscriber.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create admin
    await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "tripzo.india.01@gmail.com",
      password: process.env.ADMIN_PASSWORD || "admin123",
      role: "superadmin",
    });
    console.log("Super Admin created");

    // Seed data
    await Destination.insertMany(destinations);
    console.log(`Seeded ${destinations.length} destinations`);

    await Package.insertMany(packages);
    console.log(`Seeded ${packages.length} packages`);

    await Testimonial.insertMany(testimonials);
    console.log(`Seeded ${testimonials.length} testimonials`);

    await Blog.insertMany(blogs);
    console.log(`Seeded ${blogs.length} blogs`);

    await Subscriber.insertMany(subscribers);
    console.log(`Seeded ${subscribers.length} subscribers`);

    console.log("\nSeed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();
