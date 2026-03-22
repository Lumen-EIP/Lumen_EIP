
import {z} from 'zod'
import { IdentityEvents, type IdentityEventsType } from './events/identity/main'
import { BilingEvents, type BilingEventType } from './events/biling/main'
import { AuthEvents, type AuthEventsType } from './events/auth/main'


export const EventsRegistry = {
    IdentityEvents,
    BilingEvents,
    AuthEvents
}

export type EventRegistryType = {
    IdentityEvents : IdentityEventsType,
    BilingEvents : BilingEventType,
    AuthEvents : AuthEventsType
}

export type {BaseEventType} from './events/baseEvent' 