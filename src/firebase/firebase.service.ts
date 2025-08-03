// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase.config.json';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: '<your-bucket>.appspot.com', // Optional for Firebase Storage
    });
  }

  getFirestore() {
    return admin.firestore();
  }

//   getStorage() {
//     return admin.storage();
//   }
}
