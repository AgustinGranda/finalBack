import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

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


    const payload = {id: user.id, name: user.name, rol: user.rol.description}
    const token = this.jwtService.sign(payload, {secret:'moviesadviters', expiresIn: 3600000 });
    return {token: token}

  }
}

