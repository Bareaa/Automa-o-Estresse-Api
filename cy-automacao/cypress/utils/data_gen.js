const faker = require('faker-br');

class DataGenerator {
  generateUserData() {
    return {
      primeiro_nome: faker.name.firstName(),
      ultimo_nome: faker.name.lastName(),
      cpf: faker.br.cpf(),
      telefone: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      senha: this.generatePassword(8),
      data_nascimento: faker.date.past(42, new Date(new Date().setFullYear(new Date().getFullYear() - 18))).toISOString().split('T')[0],
      endereco_completo: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode(),
    };
  }
  

  generatePassword(length) {
    if (length < 8) {
      throw new Error('Password length must be at least 8 characters');
    }
    const uppercase = faker.random.alpha().toUpperCase();
    const lowercase = faker.random.alpha(length - 3).toLowerCase();
    const number = faker.random.number({ min: 0, max: 9 }).toString();
    const specialChars = "!@#$%&*";
    const special = specialChars.charAt(faker.random.number({ min: 0, max: specialChars.length - 1 }));

    const password = uppercase + lowercase + number + special;
    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Embaralha os caracteres
  };
}


export default new DataGenerator();