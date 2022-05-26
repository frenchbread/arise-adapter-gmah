import { Context, Next } from "koa";
import Joi from "joi";
import addReservation from "src/infrastructure/http/services/reservations";

const schema = Joi.object({
  hotel_partner_ref: Joi.string().required(),
  room_type_partner_ref: Joi.string().required(),
  primary_contact: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address_lines: Joi.array().items(Joi.string()),
  }).required(),
  check_in: Joi.string().required(),
  check_out: Joi.string().required(),
  adults: Joi.number().required(),
  children: Joi.array().items(Joi.number().min(0).max(17)).required(),
  price: Joi.object({
    currency: Joi.string().required(),
    amount: Joi.number().required(),
  }).required(),
});

export default async function (ctx: Context, next: Next) {
  const { value, error } = schema.validate(ctx.request.body);

  if (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message,
    };

    await next();
  } else {
    try {
      ctx.body = await addReservation(value);
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        error: "Server error",
      };
    }
  }
}
