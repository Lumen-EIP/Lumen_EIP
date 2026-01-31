import {z} from 'zod'

export const BaseEventSchema = z.object({
    eventId : z.uuid(),
    domain : z.enum(['AuthEvents' , 'BilingEvents' , 'IdentityEvents']),
    eventName : z.string().min(1),
    version : z.number().int().positive(),
    producer : z.string(),
    data : z.object({})
})