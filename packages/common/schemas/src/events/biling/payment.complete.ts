import {z} from 'zod'
import {BaseEventSchema} from '../baseEvent'


const PaymentCompletedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('PAYMENT_COMPLETED'),
  domain : z.literal('BilingEvents'),
  version: z.literal(1),
  data: z.object({
    paymentId: z.uuid(),
    userId: z.uuid(),
    amount: z.number().positive(),
    completedAt: z.iso.datetime()
  }),
});

export const PaymentCompleteEvent = z.union([PaymentCompletedV1EventSchema])

export type PaymentCompletedEventType = z.infer<typeof PaymentCompleteEvent>