import { Body, Controller, Get, Post} from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctors') // <-- This maps to /doctors
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('allDoctors')
  async getAllDoctors() {
    return this.doctorService.getDoctors();
  }

  @Post()
  async createDoctor(
    @Body() body: { name: string; specialization: string },
  ) {
    return this.doctorService.createDoctor(body);
  }

  @Post('addRating')
  async rateDoctor(@Body() body: { doctId: string; ratingCount: number; ratingDesc: string }) {
    return this.doctorService.addDoctorRating(body);
  }
}
