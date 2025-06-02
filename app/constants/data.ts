import Index from "@/app/(tabs)";

export const featuredCarData = [
  {
    index: 0, 
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2021,
    rating: 4.9,
    image: 'https://images-porsche.imgix.net/-/media/D41AD8E7D55E45BDA5CFE8651F497A74_145CD2F719DF4CC88352C7DC0B71C560_CZ23V20OX0038-911-gt3-rs-side?w=2560&h=1440&q=45&crop=faces%2Centropy%2Cedges&auto=format',
    topSpeed: 184,
    startingPrice: 241300,
    horsepower: 518,
    torque: 343,
    drivetrain: 'RWD',
    transmission: '7-speed PDK',
    zeroToSixty: 3.0,
    fuelType: 'Premium Gasoline',
    weight: 3200,
    colorOptions: [
      { name: 'Guards Red', colorCode: '#D50032' },
      { name: 'Lizard Green', colorCode: '#7BDA3D' },
      { name: 'Chalk', colorCode: '#C1C6C1' },
      { name: 'White', colorCode: '#FFFFFF' },
      { name: 'Black', colorCode: '#000000' }
    ],
    details: 'The 2021 Porsche 911 GT3 RS is a track-focused sports car with a naturally aspirated 4.0L flat-six engine producing 518 hp. It offers precision handling, a lightweight chassis, and aerodynamics designed for maximum downforce. Ideal for drivers seeking peak performance and an authentic motorsport feel.'
  },
  {
    index: 1,
    make: 'Honda',
    model: 'Civic Si',
    year: 2014,
    rating: 3.6,
    image: 'https://media.ed.edmunds-media.com/honda/civic/2025/oem/2025_honda_civic_sedan_si_fq_oem_1_1600.jpg',
    topSpeed: 137,
    startingPrice: 22500,
    horsepower: 205,
    torque: 174,
    drivetrain: 'FWD',
    transmission: '6-speed manual',
    zeroToSixty: 6.5,
    fuelType: 'Regular Gasoline',
    weight: 2900,
    colorOptions: [
      { name: 'Crystal Black Pearl', colorCode: '#000000' },
      { name: 'Taffeta White', colorCode: '#F0F0F0' },
      { name: 'Alabaster Silver Metallic', colorCode: '#B4B4B4' },
      { name: 'Rallye Red', colorCode: '#D50032' }
    ],
    details: 'The 2014 Honda Civic Si is a sporty compact car featuring a 2.4L inline-4 engine delivering 205 hp. Known for its reliability and engaging driving experience, it offers a balanced mix of performance and practicality.'
  },
  {
    index: 2,
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2022,
    rating: 4.8,
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-2-672d42e16475f.jpg?crop=0.503xw:0.502xh;0.262xw,0.289xh&resize=980:*',
    topSpeed: 200,
    startingPrice: 129990,
    horsepower: 1020,
    torque: 1050,
    drivetrain: 'AWD',
    transmission: '1-speed direct drive',
    zeroToSixty: 1.99,
    fuelType: 'Electric',
    weight: 4766,
    colorOptions: [
      { name: 'Pearl White Multi-Coat', colorCode: '#F5F5F5' },
      { name: 'Solid Black', colorCode: '#000000' },
      { name: 'Midnight Silver Metallic', colorCode: '#4C4C4C' },
      { name: 'Deep Blue Metallic', colorCode: '#003366' },
      { name: 'Red Multi-Coat', colorCode: '#D50032' }
    ],
    details: 'The 2022 Tesla Model S Plaid is an all-electric luxury sedan boasting a tri-motor setup producing 1,020 hp. It accelerates from 0 to 60 mph in under 2 seconds, offering cutting-edge technology and unparalleled performance.'
  }
];

export const carData = [
  {
    make: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    rating: 4.9,
    image: "https://i.ytimg.com/vi/GXwaQIZJkp8/maxresdefault.jpg",
    topSpeed: 205,
    startingPrice: 218000,
    horsepower: 640,
    torque: 590,
    drivetrain: "AWD",
    transmission: "8-speed dual-clutch",
    zeroToSixty: 2.6,
    fuelType: "Premium Gasoline",
    weight: 3500,
    colorOptions: [
      { name: "Jet Black Metallic", colorCode: "#1A1A1A" },
      { name: "Carrara White", colorCode: "#F4F4F4" },
      { name: "Crayon", colorCode: "#D4D4D4" },
      { name: "Gentian Blue", colorCode: "#2F4F7F" },
      { name: "Miami Blue", colorCode: "#00A6D6" }
    ],
    details: "The 2023 Porsche 911 Turbo S delivers exceptional performance with a twin-turbocharged flat-six engine, blending speed with luxury and precision engineering."
  },
  {
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2021,
    rating: 4.9,
    image: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/huracan/2023/09_18_refresh/s/gw_hura_s_02.jpg",
    topSpeed: 202,
    startingPrice: 208571,
    horsepower: 631,
    torque: 443,
    drivetrain: "AWD",
    transmission: "7-speed dual-clutch",
    zeroToSixty: 2.9,
    fuelType: "Premium Gasoline",
    weight: 3135,
    colorOptions: [
      { name: "Arancio Xanto", colorCode: "#FF5C00" },
      { name: "Blu Nethuns", colorCode: "#1F74B3" },
      { name: "Verde Mantis", colorCode: "#4A9E3C" },
      { name: "Giallo Inti", colorCode: "#F3D600" },
      { name: "Bianco Monocerus", colorCode: "#F7F7F7" }
    ],
    details: "The 2021 Huracán EVO combines a 5.2L V10 with advanced aerodynamics for an exhilarating drive."
  },
  {
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2022,
    rating: 4.8,
    image: "https://www.topgear.com/sites/default/files/cars-car/image/2019/09/tg_-_ferrari_f8_tributo_-091.jpg",
    topSpeed: 211,
    startingPrice: 276550,
    horsepower: 710,
    torque: 568,
    drivetrain: "RWD",
    transmission: "7-speed dual-clutch",
    zeroToSixty: 2.9,
    fuelType: "Premium Gasoline",
    weight: 3164,
    colorOptions: [
      { name: "Rosso Corsa", colorCode: "#D50032" },
      { name: "Giallo Modena", colorCode: "#F3D600" },
      { name: "Blu Tour De France", colorCode: "#003B6A" },
      { name: "Nero Daytona", colorCode: "#333333" },
      { name: "Bianco Avus", colorCode: "#F7F7F7" }
    ],
    details: "The 2022 F8 Tributo offers a mid-engine V8 delivering thrilling performance and sharp handling."
  },
  {
    make: "McLaren",
    model: "720S",
    year: 2020,
    rating: 4.7,
    image: "https://www.charlottemclaren.com/wp-content/uploads/2019/01/720s-spider.jpg",
    topSpeed: 212,
    startingPrice: 299000,
    horsepower: 710,
    torque: 568,
    drivetrain: "RWD",
    transmission: "7-speed dual-clutch",
    zeroToSixty: 2.7,
    fuelType: "Premium Gasoline",
    weight: 3128,
    colorOptions: [
      { name: "McLaren Orange", colorCode: "#FF5C00" },
      { name: "Onyx Black", colorCode: "#0D0D0D" },
      { name: "Silica White", colorCode: "#F4F4F4" },
      { name: "Aurora Blue", colorCode: "#3B8FB9" },
      { name: "Vega Blue", colorCode: "#006C88" }
    ],
    details: "The 2020 720S features a lightweight design and twin-turbo V8 for exceptional speed and agility."
  },
  {
    make: "Bugatti",
    model: "Chiron",
    year: 2021,
    rating: 5.0,
    image: "https://cdn.rmsothebys.com/7/6/7/4/7/3/76747313a9e5ecc8b6d7d29b31e859b97a582b84.webp",
    topSpeed: 261,
    startingPrice: 3000000,
    horsepower: 1500,
    torque: 1180,
    drivetrain: "AWD",
    transmission: "7-speed dual-clutch",
    zeroToSixty: 2.3,
    fuelType: "Premium Gasoline",
    weight: 4400,
    colorOptions: [
      { name: "French Racing Blue", colorCode: "#1C3D73" },
      { name: "Nocturne", colorCode: "#000000" },
      { name: "Gris Rafale", colorCode: "#8A8C8E" },
      { name: "Italian Red", colorCode: "#D50032" },
      { name: "Titanium Silver", colorCode: "#B0B0B0" }
    ],
    details: "The 2021 Chiron boasts a quad-turbo W16 engine, delivering unmatched luxury and speed."
  },
  {
    make: "Koenigsegg",
    model: "Jesko",
    year: 2023,
    rating: 4.9,
    image: "https://www.topgear.com/sites/default/files/2022/08/DSC07904.jpg",
    topSpeed: 300,
    startingPrice: 3000000,
    horsepower: 1600,
    torque: 1106,
    drivetrain: "RWD",
    transmission: "9-speed Light Speed Transmission",
    zeroToSixty: 2.5,
    fuelType: "E85 / Premium Gasoline",
    weight: 3131,
    colorOptions: [
      { name: "Tang Orange Pearl", colorCode: "#FF6A13" },
      { name: "White Silver", colorCode: "#D4D4D4" },
      { name: "Black Carbon", colorCode: "#2A2A2A" },
      { name: "Lime Green", colorCode: "#8BFF00" },
      { name: "Crystal White", colorCode: "#FFFFFF" }
    ],
    details: "The 2023 Jesko is engineered for extreme performance, featuring advanced aerodynamics and power."
  },
  {
    make: "Pagani",
    model: "Huayra Roadster",
    year: 2021,
    rating: 4.8,
    image: "https://www.motortrend.com/uploads/2021/09/Pagani-Huayra-BC-Roadster-02-1.jpg",
    topSpeed: 210,
    startingPrice: 3200000,
    horsepower: 791,
    torque: 775,
    drivetrain: "RWD",
    transmission: "7-speed automated manual",
    zeroToSixty: 3.0,
    fuelType: "Premium Gasoline",
    weight: 2822,
    colorOptions: [
      { name: "Rosso Dubai", colorCode: "#9B111E" },
      { name: "Blu Tricolore", colorCode: "#001F8C" },
      { name: "Argento Ametista", colorCode: "#8E8B8D" },
      { name: "Nero Assoluto", colorCode: "#101010" },
      { name: "Giallo Sole", colorCode: "#F1C500" }
    ],
    details: "The 2021 Pagani Huayra Roadster delivers extraordinary performance with precision handling and a bespoke design."
  },
  {
    make: "Lotus",
    model: "Evija",
    year: 2023,
    rating: 4.7,
    image: "https://www.supercars.net/blog/wp-content/uploads/2021/05/lotus-evija-top-gear-test-1.jpg",
    topSpeed: 200,
    startingPrice: 2300000,
    horsepower: 1972,
    torque: 1254,
    drivetrain: "AWD",
    transmission: "Single-speed automatic",
    zeroToSixty: 2.9, // seconds
    fuelType: 'Electric',
    weight: 4160, // lbs
    colorOptions: [
        { name: "Solar Yellow", colorCode: "#FFD700" },
        { name: "Carbon Black", colorCode: "#000000" },
        { name: "Arctic White", colorCode: "#FFFFFF" },
        { name: "Liquid Silver", colorCode: "#C0C0C0" }
    ],
    details: 'The 2023 Lotus Evija is an all-electric hypercar delivering nearly 2,000 hp with a top speed over 200 mph. Limited to 130 units, it features a lightweight carbon fiber chassis and advanced aerodynamics.'
  },
  {
    make: 'test',
  }
];

export const listForStars = [1, 2, 3, 4, 5];