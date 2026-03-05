

export interface EventBus<T>{
    publish(
        queue : string,
        eventName : string,
        payload : T
    ) : Promise<void>
}