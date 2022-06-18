import { InvalidParamError, MissingParamError } from '../../error'
import { BadRequest, ok, serverError } from '../../helper/http-helper'
import { EmailValidator, IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  public async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'phone', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field))
        }

        const { email, password, passwordConfirmation } = httpRequest.body

        if (password !== passwordConfirmation) {
          return BadRequest(new InvalidParamError('passwordConfirmation'))
        }
        const isValidEmail = this.emailValidator.isValid(email)

        if (!isValidEmail) {
          return BadRequest(new InvalidParamError('email'))
        }
      }
      return ok(httpRequest)
    } catch (error) {
      return serverError()
    }
  }
}
