const createHttpError = require("http-errors");
const Controller = require("../../controller");
const { authSchema } = require("../../../validators/user/auth.schema");
class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      const data = await authSchema.validateAsync(req.body);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        data
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
}
module.exports = { 
    UserAuthController : new UserAuthController
}
