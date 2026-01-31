import {z} from 'zod'
import {BaseEventSchema} from '../baseEvent'


const LoginFailedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('LOGIN_FAILURE'),
  domain : z.literal('AuthEvents'),
  version: z.literal(1),
  data: z.object({
    userId : z.uuid(),
    reason: z.enum(['invalid_password', 'user_not_found', 'account_locked']),
    loginDate: z.iso.datetime()
  }),
});

export const LoginFailedEvent = z.union([LoginFailedV1EventSchema])

export type LoginFailedEventType = z.infer<typeof LoginFailedEvent>