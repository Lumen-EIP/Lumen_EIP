import { z } from 'zod';
import { BaseEventSchema } from '../baseEvent';

const LoginSucceededV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('LOGIN_SUCCESS'),
  domain : z.literal('AuthEvents'),
  version: z.literal(1),
  data: z.object({
    userId: z.uuid(),
    loginDate: z.iso.datetime()
  }),
});

export const LoginSuccessEvent = z.union([LoginSucceededV1EventSchema])

export type LoginSuccessEventType = z.infer<typeof LoginSuccessEvent>