import {EventsRegistry} from '../../schemas/src/index'



export interface DomainEvent<T = any>{
    name : string,
    id : string,
    domain : keyof typeof EventsRegistry,
    payload : T,
    timestamp : number,
    metadata? : Record<string , any>
}


export type EventHandler = (event : DomainEvent) => Promise<void>


export interface EventBus{
    publish : (event : DomainEvent) => Promise<any>;
    publishBatch: (events : DomainEvent[]) => Promise<any>;
}