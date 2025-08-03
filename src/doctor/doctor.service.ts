import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class DoctorService {
  constructor(private firebaseService: FirebaseService) {}
  
  findAll() {
    return [{ id: 1, name: 'Dr. Sharma' }];
  }
  async createDoctor(data: { name: string; specialization: string }) {
    const db = this.firebaseService.getFirestore();
    const docRef = await db.collection('doctors').add(data);
    return { id: docRef.id };
  }

  async getDoctors() {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection('doctors').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
