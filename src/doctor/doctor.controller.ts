import { Controller, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctors') // <-- This maps to /doctors
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async getAllDoctors() {
    return this.doctorService.getDoctors();
  }
}
