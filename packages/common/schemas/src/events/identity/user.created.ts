import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent'

const UserCreatedV1EventSchema = BaseEventSchema.extend({
    eventName : z.literal('USER_CREATED'),
    version : z.literal(1),
    data : z.object({
        email : z.email(),
        userName : z.string().min(3).max(30),
        userId : z.uuid(),
        createdAt : z.date().refine((date) => date instanceof Date && !isNaN(date.getTime()))
    })
})

export const UserCreatedEvent = z.union([UserCreatedV1EventSchema])
export type UserCreatedEventType = z.infer<typeof UserCreatedEvent>