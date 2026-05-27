/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pet, ContactInfo } from './types';

export const PETS_DATA: Pet[] = [
  {
    id: 'dog_boni',
    name: 'Boni',
    category: 'dog',
    breed: 'Golden Retriever',
    age: '1 Year 2 Months',
    gender: 'Male',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Friendly', 'Highly Active', 'Obedient', 'Kid Loving'],
    description: 'Boni is a golden retriever puppy who is extremely cheerful and high-energy. He loves playing fetch and swimming. Perfect for families with a big backyard or owners who enjoy outdoor activities. He always greets everyone with a friendly tail wag!',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Perfect Health & Extremely Energetic'
    },
    size: 'Large',
    weight: '28 kg',
    color: 'Golden'
  },
  {
    id: 'cat_milo',
    name: 'Milo',
    category: 'cat',
    breed: 'British Shorthair',
    age: '8 Months',
    gender: 'Male',
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Calm', 'Affectionate', 'Independent', 'Quiet'],
    description: 'Milo is a chubby, adorable cat with a very laid-back personality. He prefers purring warmly on your lap or taking naps near a sun-drenched window. He is independent, quiet, and loves being scratched under his chin.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Excellent Health (Ideal Body Weight)'
    },
    size: 'Medium',
    weight: '4.5 kg',
    color: 'Smoky Blue-Grey'
  },
  {
    id: 'dog_coco',
    name: 'Coco',
    category: 'dog',
    breed: 'Toy Poodle',
    age: '5 Months',
    gender: 'Female',
    photos: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Playful', 'Highly Intelligent', 'Cuddly', 'Quick Learner'],
    description: 'Coco is a curly brown Toy Poodle who looks exactly like a teddy bear. She has an incredibly high intelligence level and already understands basic commands like "sit" and "high-five". Coco is very affectionate and will follow you everywhere in the house.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: false,
      condition: 'Healthy, Neutering Scheduled Next Month'
    },
    size: 'Small',
    weight: '3.1 kg',
    color: 'Cinnamon Brown'
  },
  {
    id: 'cat_luna',
    name: 'Luna',
    category: 'cat',
    breed: 'Persian Peaknose',
    age: '1 Year 6 Months',
    gender: 'Female',
    photos: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Elegant', 'Slightly Shy', 'Gentle', 'Loving'],
    description: 'Luna is a gorgeous long-haired grey Persian cat. She needs a brief adjustment period in new environments, but once she feels safe, she becomes the most loyal companion who loves resting on your chest while purring melodiously.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Very Healthy, Well-Groomed Coat (Tick & Flea Free)'
    },
    size: 'Medium',
    weight: '3.8 kg',
    color: 'Smoky Grey'
  },
  {
    id: 'dog_rocky',
    name: 'Rocky',
    category: 'dog',
    breed: 'Siberian Husky',
    age: '2 Years',
    gender: 'Male',
    photos: [
      'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acf9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617895151056-83a30c822361?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Expressive', 'Vocal', 'Adventurous', 'Loyal'],
    description: 'Rocky is a stunning blue-eyed Husky who is hilarious and very vocal (he loves howling in response to your chats). He needs a consistent walking routine because he has boundless energy. Rocky socializes incredibly well with other dogs in our shelter.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Excellent Condition (Up to date with annual boosters)'
    },
    size: 'Large',
    weight: '24 kg',
    color: 'Black and white with Blue Eyes'
  },
  {
    id: 'cat_kiko',
    name: 'Kiko',
    category: 'cat',
    breed: 'Domestic Calico',
    age: '4 Months',
    gender: 'Female',
    photos: [
      'https://images.unsplash.com/photo-1513360309081-36f5e878fc11?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501820488136-726b9cef6624?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Highly Curious', 'Playful', 'Brave', 'Active'],
    description: 'Kiko was rescued from an empty store as an abandoned kitten. Now she has grown into a lively, healthy, and extremely curious Calico kitten. Interactive feather toys are her best friends! She is in desperate search of a loving family to raise her forever.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: false,
      condition: 'Fully Healthy, Highly Active & Playful'
    },
    size: 'Small',
    weight: '1.8 kg',
    color: 'Tricolor (White, Orange, Black)'
  },
  {
    id: 'dog_mochi',
    name: 'Mochi',
    category: 'dog',
    breed: 'Pomeranian',
    age: '1 Year',
    gender: 'Female',
    photos: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554685244-11e2f3785133?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Watchful', 'Extremely Loyal', 'Spirited', 'Attention Seeking'],
    description: 'Mochi is a snow-white Pomeranian with fluff as soft as cotton candy. She might be small, but she has a big, brave heart. She forms an extremely tight bond with her primary caretaker and acts as a charming little alarm system at home.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Super Healthy, Free from Congenital Defects'
    },
    size: 'Small',
    weight: '2.5 kg',
    color: 'Pure White'
  },
  {
    id: 'cat_bella',
    name: 'Bella',
    category: 'cat',
    breed: 'Siamese',
    age: '10 Months',
    gender: 'Female',
    photos: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574158622643-69d34d72650a?w=800&auto=format&fit=crop&q=80'
    ],
    personality: ['Chatty', 'Friendly', 'High Climber', 'Clingy'],
    description: 'Bella is a pure Siamese cat who meows softly with various tones to communicate with you. She loves sitting on your shoulder or perching on the highest shelves. Bella is friendly to other pets, including dog-friendly canines.',
    healthStatus: {
      vaccinated: true,
      dewormed: true,
      neutered: true,
      condition: 'Excellent Health & Very Agile'
    },
    size: 'Medium',
    weight: '3.4 kg',
    color: 'Cream with Dark Brown Points'
  }
];

export const CONTACT_DATA: ContactInfo = {
  address: '45 Loving Paw Avenue, Kebayoran Baru, South Jakarta, 12110',
  phone: '+62 812-3456-7890',
  email: 'hello@ourpetadoption.org',
  workingHours: 'Monday - Sunday: 09:00 - 17:00',
  instagram: '@OurPetAdoption_ID',
  whatsapp: 'https://wa.me/6281234567890'
};
