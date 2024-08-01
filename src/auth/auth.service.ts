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
    
      // Intento de ocultar pass en relaciones
    // const passUser = await getRepository(User).createQueryBuilder()
    // .addSelect('password')
    // .getOne();
    
    // Autenticacion
    const user = await this.userRepository.findOne({where:{email: signInDto.email}, relations:["rol"]})
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if(!isMatch) throw new UnauthorizedException();


    const payload = {id: user.id, name: user.name, rol: user.rol.description}
    const token = this.jwtService.sign(payload, {secret:'moviesadviters', expiresIn: 3600000 });
    return {token: token}

  }
}

