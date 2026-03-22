import { PaymentCompleteEvent, type PaymentCompletedEventType } from "./payment.complete";
import { PaymentInitiatedEvent } from "./payment.initiate";
import { RefundIssuedEvent } from "./refund.issued";

export const BilingEvents = {
    PAYMENT_COMPLETED : PaymentCompleteEvent,
    PAYMENT_INITIATED : PaymentInitiatedEvent,
    REFUND_ISSUED : RefundIssuedEvent
}

export type BilingEventType = typeof BilingEvents[keyof typeof BilingEvents]