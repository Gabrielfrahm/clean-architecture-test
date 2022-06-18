import { MissingParamError } from '../../error'
import { BadRequest } from '../../helper/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class SignUpController implements IController {
  public async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['name', 'email', 'phone', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }
    return await Promise.resolve({ statusCode: 200, body: httpRequest })
  }
}
