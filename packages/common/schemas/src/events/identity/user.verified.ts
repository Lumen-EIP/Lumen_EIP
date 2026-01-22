import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent';


const UserVerifiedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('user.verified'),
  version: z.literal(1),
  data: z.object({
    userId: z.uuid(),
    verifiedAt: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime())),
  }),
});

export const UserVerifiedEvent = z.union([UserVerifiedV1EventSchema])
export type UserVerifiedEventType = z.infer<typeof UserVerifiedEvent>