import { LoginSuccessEvent} from './login.success'
import { LoginFailedEvent} from './login.failure'
import type z from 'zod'

export const AuthEvents = {
    LOGIN_SUCCESS : LoginSuccessEvent,
    LOGIN_FAILURE : LoginFailedEvent
}
export type AuthEventsType = z.infer<typeof AuthEvents[keyof typeof AuthEvents]>