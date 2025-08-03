import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class DoctorService {
  constructor(private firebaseService: FirebaseService) {}
  
  // this dummy return 
  // findAll() {
  //   return [{ id: 1, name: 'Dr. Sharma' }];
  // }
  async createDoctor(data: { name: string; specialization: string }) {
    const db = this.firebaseService.getFirestore();
    
    // Generate a doc ref with custom ID
    const docRef = db.collection('doctors').doc(); // 👈 generate empty doc ref (with auto ID)
  
    // Save the data along with the generated ID
    await docRef.set({
      ...data,
      id: docRef.id, // 👈 save the ID inside the document
      createdAt: new Date().toISOString()
    });
  
    return { id: docRef.id };
  }
  

// for getting all doctor
  async getDoctors() {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection('doctors').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addDoctorRating(data: { doctId: string; ratingCount: number; ratingDesc: string }) {
    const db = this.firebaseService.getFirestore();
  
    // Step 1: Check if the doctor exists
    const doctorDoc = await db.collection('doctors').doc(data.doctId).get();
  
    if (!doctorDoc.exists) {
      throw new Error(`Doctor with ID ${data.doctId} does not exist`);
    }
  
    // Step 2: Add the rating
    const ratingRef = await db.collection('ratings').add({
      id: data.doctId,
      ratingCount: data.ratingCount,
      ratingDesc: data.ratingDesc,
      createdAt: new Date().toISOString(),
    });
  
    return { id: ratingRef.id };
  }
  
  
  
}
