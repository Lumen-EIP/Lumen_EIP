import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent';


const UserVerifiedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('USER_VERIFIED'),
  domain: z.literal('IdentityEvents'),
  version: z.literal(1),
  data: z.object({
    userId: z.uuid(),
    verifiedAt: z.iso.datetime()
  }),
});

export const UserVerifiedEvent = z.union([UserVerifiedV1EventSchema])
export type UserVerifiedEventType = z.infer<typeof UserVerifiedEvent>