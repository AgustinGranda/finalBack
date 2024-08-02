import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private jwtService: JwtService
  ){}



  async singIn( signInDto:SignInDto){
     
    
    // Autenticacion
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.email')
      .where('user.email = :email', { email: signInDto.email })
      .leftJoinAndSelect('user.rol', 'rol') 
      .getOne();

    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    
    if(!isMatch) throw new UnauthorizedException();


    const payload = {id: user.id, name: user.name, role: user.rol.description}
    console.log(payload)
    const token = this.jwtService.sign(payload, {secret:'moviesadviters', expiresIn: 3600000 });
    return {token: token}

  }
}

