import {z} from 'zod'
import {BaseEventSchema} from '../baseEvent'


const PaymentCompletedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('payment.completed'),
  version: z.literal(1),
  data: z.object({
    paymentId: z.uuid(),
    userId: z.uuid(),
    amount: z.number().positive(),
    completedAt: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime())),
  }),
});

export const PaymentCompleteEvent = z.union([PaymentCompletedV1EventSchema])

export type PaymentCompletedEventType = z.infer<typeof PaymentCompleteEvent>