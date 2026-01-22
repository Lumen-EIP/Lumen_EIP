import {z} from 'zod'

export const BaseEventSchema = z.object({
    eventId : z.uuid(),
    eventName : z.string().min(1),
    versionNumber : z.number().int().positive(),
    producer : z.string(),
    data : z.object({})
})