// packages/common/schemas/src/events/billing.events.ts
import { z } from 'zod';
import { BaseEventSchema } from '../baseEvent';

const PaymentInitiatedV1EventSchema = BaseEventSchema.extend({
  eventName: z.literal('PAYMENT_INITIATED'),
  domain: z.literal('BilingEvents'),
  version: z.literal(1),
  data: z.object({
    paymentId: z.uuid(),
    userId: z.uuid(),
    amount: z.number().positive(),
    currency: z.string().length(3),
    initiatedAt: z.iso.datetime()
  }),
});

export const PaymentInitiatedEvent = z.union([PaymentInitiatedV1EventSchema])

export type PaymentInitiatedEventType = z.infer<typeof PaymentInitiatedEvent>

