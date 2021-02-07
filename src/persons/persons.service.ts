import { Persons } from './persons.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PersonsService {
  async create(createPersonDto: CreatePersonDto) {
    const person = new Persons();
    person.name = createPersonDto.name;
    person.surname = createPersonDto.surname;
    person.age = createPersonDto.age;
    person.gender = createPersonDto.gender;
    person.nick = createPersonDto.nick;
    person.photoUrl = createPersonDto.photoUrl;
    person.role = createPersonDto.role;

    const createdPerson = await person.save();

    return createdPerson;
  }

  async findAll() {
    return await Persons.find();
  }

  async findOne(id: string) {
    const person = await Persons.findOne(id);

    if (!person) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);

    Object.keys(updatePersonDto).map(key => {
      person[key] = updatePersonDto[key]
    })

    const newPerson = person.save();

    return newPerson;
  }

  async remove(id: string) {
    const person = await Persons.findOne(id);

    const userWithThisPerson = await User.findOne({ person: person }, { relations: ['person'] });

    if(userWithThisPerson) {
      userWithThisPerson.person = null;

      await userWithThisPerson.save();
    }
    console.log(userWithThisPerson);
    await person.remove();

    return { success: false, user: userWithThisPerson };
  }
}
