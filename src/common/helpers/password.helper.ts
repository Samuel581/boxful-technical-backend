import * as bcript from 'bcrypt';

// Hashing passwords before inserting them into the database
export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
  return await bcript.hash(password, saltRounds);
};
//Verifies and decrypts the password that the user provided, if it matches it continues the login process
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcript.compare(password, hashedPassword);
};
