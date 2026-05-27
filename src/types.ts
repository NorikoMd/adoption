/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PetCategory = 'dog' | 'cat';

export interface Pet {
  id: string;
  name: string;
  category: PetCategory;
  breed: string; // Breed
  age: string; // Age (e.g., "2 Months", "1 Year 3 Months")
  gender: 'Male' | 'Female'; // Gender
  photos: string[]; // Carousel
  personality: string[]; // Personality tags
  description: string; // Personality description
  healthStatus: {
    vaccinated: boolean;
    dewormed: boolean;
    neutered: boolean;
    condition: string; // Health status summary (e.g. "Perfect Health", "Post-Neutered Recovery")
  };
  size: 'Small' | 'Medium' | 'Large';
  weight: string; // e.g. "4.2 kg"
  color: string;
}

export interface AdoptionSubmission {
  petId: string;
  petName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  experience: string;
  message?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  instagram: string;
  whatsapp: string;
}
