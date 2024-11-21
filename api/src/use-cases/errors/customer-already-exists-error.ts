export class UserAlreadyExistsError extends Error {
  constructor() {
    super('customer already exists')
  }
}
