
import {z} from 'zod'
import { IdentityEvents } from './events/identity/main'
import { BilingEvents } from './events/biling/main'
import { AuthEvents } from './events/auth/main'


export const EventsRegistry = {
    IdentityEvents,
    BilingEvents,
    AuthEvents
}