import {z} from 'zod';


export const UserCreatedEventSchema = z.object({
    eventName : z.literal('user_created'),
    eventID : z.uuid(),
    data : z.object({
        email : z.email(),
        userID : z.uuid(),
    })
})

export type UserCreatedEventType = z.infer<typeof UserCreatedEventSchema>;