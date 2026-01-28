import { ArgumentMetadata, BadRequestException, Injectable, InternalServerErrorException, PipeTransform } from "@nestjs/common";
import { BaseEventSchema } from "../../../../packages/common/schemas/src/events/baseEvent";
import { EventsRegistry } from "@common/schemas";
import {z} from 'zod'


type EventDomain = keyof typeof EventsRegistry

export function createEventValidatorPipe(givendomain : EventDomain = 'IdentityEvents') {
    @Injectable()
    class EventValidatorPipe implements PipeTransform {

        transform(data: any) {
            try {
                const { eventName, domain } = BaseEventSchema.parse(data);

                if (!eventName || domain !== givendomain) {
                    throw new BadRequestException("Event Domain is not valid under")
                }
                
                const domainRegistry = EventsRegistry[domain]
                const eventSchema = domainRegistry[eventName as keyof typeof domainRegistry] as z.ZodObject<any>

                if (!eventSchema) {
                    throw new BadRequestException("No shcema found for the given event Name")
                }

                const parsedEvent = eventSchema.parse(data);

                return parsedEvent;
            }
            catch (error) {
                if(error instanceof z.ZodError){
                    throw new BadRequestException('Error in Zod: ' , error.message)
                }
                throw new BadRequestException("Error while validating event" , error.errors || error.message)
            }

        }
    }

    return EventValidatorPipe
}