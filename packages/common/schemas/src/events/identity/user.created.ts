import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent'

const UserCreatedV1EventSchema = BaseEventSchema.extend({
    eventName : z.literal('USER_CREATED'),
    domain : z.literal('IdentityEvents'),
    version : z.literal(1),
    data : z.object({
        email : z.email(),
        userName : z.string().min(3).max(30),
        userId : z.uuid(),
        createdAt : z.iso.datetime()
    })
})

export const UserCreatedEvent = z.union([UserCreatedV1EventSchema])
export type UserCreatedEventType = z.infer<typeof UserCreatedEvent>