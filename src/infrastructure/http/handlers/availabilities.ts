import { Context, Next } from "koa";
import Joi from "joi";
import getAvailabilities from "src/infrastructure/http/services/availabilities";

const schema = Joi.object({
  hotel_id: Joi.string().required(),
  check_in: Joi.string().required(),
  check_out: Joi.string().required(),
  adults: Joi.string().required(),
  children: Joi.string().required(),
});

export default async function (ctx: Context, next: Next) {
  const { value, error } = schema.validate(ctx.query);

  if (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message,
    };

    await next();
  } else {
    try {
      ctx.body = await getAvailabilities(value);
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        error: "Server error",
      };
    }
  }
}
