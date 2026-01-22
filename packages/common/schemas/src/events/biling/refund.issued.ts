import {z} from 'zod'
import { BaseEventSchema } from '../baseEvent';

const RefundIssuedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('refund.issued'),
  version: z.literal(1),
  data: z.object({
    refundId: z.string().uuid(),
    paymentId: z.string().uuid(),
    amount: z.number().positive(),
    reason: z.string(),
    issuedAt: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime())),
  }),
});

export const RefundIssuedEvent = z.union([RefundIssuedV1EventSchema])
export type RefundIssuedEventType = z.infer<typeof RefundIssuedEvent>
