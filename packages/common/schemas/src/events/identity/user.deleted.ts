import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent';



const UserDeletedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('USER_DELETED'),
  domain: z.literal('IdentityEvents'),
  version: z.literal(1),
  data: z.object({
    userId: z.uuid(),
    deletedAt: z.iso.datetime(),
    reason: z.string().optional(),
  }),
});

export const UserDeletedEvent = z.union([UserDeletedV1EventSchema])
export type UserDeletedEventType = z.infer<typeof UserDeletedEvent>
