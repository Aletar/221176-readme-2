export enum Message {
  UserExist = 'User with this email exists',
  UserNotFound = 'User not found',
  UserPasswordWrong = 'User password is wrong',
  UserEmailNotValid = 'The email is not valid',
}

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const UploadPath = () => `./${process.env.UPLOAD_DIR}`
