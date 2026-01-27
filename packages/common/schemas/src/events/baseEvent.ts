import {z} from 'zod'

export const BaseEventSchema = z.object({
    eventId : z.uuid(),
    domain : z.enum(['AUTH' , 'BILLING' , 'IDENTITY']),
    eventName : z.string().min(1),
    versionNumber : z.number().int().positive(),
    producer : z.string(),
    data : z.object({})
})