import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) { }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(id, updateGenderDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gendersService.remove(id);
  }
}
