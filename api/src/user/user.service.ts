import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Roles } from './entities/user.entity';
import { Repository } from 'typeorm';
import { response } from 'src/utils/response.util';
import { comparePassword, hashPassword } from 'src/lib/bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { createToken } from 'src/lib/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, role } = createUserDto;

    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestException(
        response(
          false,
          'First name, last name, email, and password are required!',
          null,
        ),
      );
    }

    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException(
          response(false, 'User already exists!', null),
        );
      }

      const hashedPassword = await hashPassword(password);

      const newUser = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role ? (role as Roles) : Roles.user,
      });

      const registeredUser = await this.userRepository.save(newUser);

      return response(true, 'User registered successfully!', registeredUser);
    } catch (error) {
      console.error('Login service error:', error);
      if (error instanceof ConflictException) {
        throw new InternalServerErrorException(
          response(false, 'Registration failed. Try again later!', null),
        );
      }
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new BadRequestException(
        response(false, 'Email and password are required!', null),
      );
    }

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedException(
          response(false, 'Email or password is invalid!', null),
        );
      }

      const isPasswordValid = await comparePassword(user.password, password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          response(false, 'Email or password is invalid!', null),
        );
      }

      const userInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      const accessToken = createToken(userInfo, '1hr');
      const refreshToken = createToken({ id: user.id }, '12h');

      return {
        ...userInfo,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException(response(false, 'Login failed', null));
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
