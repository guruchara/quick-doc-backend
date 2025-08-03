import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [DoctorModule, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
