import { z } from 'zod';
import { BaseEventSchema } from '../baseEvent';

const LoginSucceededV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('login.succeeded'),
  version: z.literal(1),
  data: z.object({
    userId: z.uuid(),
    loginDate: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime())),
  }),
});

export const LoginSuccessEvent = z.union([LoginSucceededV1EventSchema])

export type LoginSuccessEventType = z.infer<typeof LoginSuccessEvent>