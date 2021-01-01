// Section 9 : Lesson 101
// We used POSTMAN to get the object of a member
// Then used a website to make the object
// I used jsontots.com

import { Photo } from './photo';

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
  }
  
