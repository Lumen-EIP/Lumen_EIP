import { z } from 'zod'
import { UserCreatedEvent } from '../identity/user.created'
import { UserDeletedEvent } from './user.deleted'
import { UserVerifiedEvent } from './user.verified'

export const IdentityEvents = {
    USER_CREATED: UserCreatedEvent,
    USER_DELETED: UserDeletedEvent,
    USER_VERIFIED: UserVerifiedEvent
}