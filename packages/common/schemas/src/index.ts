
import {z} from 'zod'
import { UserCreatedEvent } from './events/identity/user.created'
import { UserDeletedEvent } from './events/identity/user.deleted'
import { UserVerifiedEvent } from './events/identity/user.verified'
import { PaymentInitiatedEvent } from './events/biling/payment.initiate'
import { PaymentCompleteEvent } from './events/biling/payment.complete'
import { RefundIssuedEvent } from './events/biling/refund.issued'
import { LoginFailedEvent } from './events/auth/login.failure'
import { LoginSuccessEvent } from './events/auth/login.success'


export const EventsRegistry = {
    UserCreated : UserCreatedEvent,
    UserDeleted : UserDeletedEvent,
    UserVerified : UserVerifiedEvent,
    PaymentInitiated : PaymentInitiatedEvent,
    PaymentCompleted : PaymentCompleteEvent,
    RefundIssued : RefundIssuedEvent,
    LoginFailure : LoginFailedEvent,
    LoginSuccess : LoginSuccessEvent
}