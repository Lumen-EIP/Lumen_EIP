<div align="center">

  # LUMEN EIP – Event Ingestion Platform
</div>
LUMEN EIP is a distributed event ingestion and processing platform designed to explore and implement reliable event-driven communication paradigms between microservices.

The system is built by abiding the principles of Event Driven Architecture with a strong emphasis on message delivery semantics, failure handling, and controlled processing guarantees, rather than just functional correctness. It incrementally evolves toward production-grade patterns by explicitly addressing edge cases such as duplicate delivery, consumer crashes, and message acknowledgment boundaries.

## Overview
In a microservices architecture, services must communicate while preserving correctness, scalability, and fault isolation. Henceforth , communications between services in such a setup may be Synchronous or Asynchronous, both comes with their own tradeoffs. Asynchronous Communication or delayed communication comes with its own set of challenges like duplicate processing of events, events getting lost, consumer failing at different stages of acknowledging to producer. Naive implementation can often tend to ignore these, which results in systems which may look functional but may not scale and perform under real world operating conditions. 
LUMEN EIP is built to address these challenges , by designing an architecture which decides wisely the communication pattern between services, makes them fault tolerant and resilient by implementing appropriate event delivery semantcs, Event persistent strategies, acknowledgement semantics, and code scaffolding patterns. However , there are tradeoffs and practical situations where the functioning of the system can be discussed. 

## System Architecture

At a high level, LUMEN EIP follows a producer–broker–consumer model:

```bsh
┌───────────────┐     ┌────────────────────────────┐     ┌───────────────────────┐     ┌──────────────|
│   Producers   │ ──► │      Ingestion Service     │ ──► │ Message Broker        │ ──► │   Consumers  |
└───────────────┘     └────────────────────────────┘     │                       │     └──────────────┘
                                                         └──────────-────────────┘            
                                                                                             
                                                                    
```
This flow establishes asynchronous, decoupled communication between services while enabling controlled message processing and failure handling.

### Component functionality
#### 1. Ingestion Service (`apps/ingestion-service`)
The entry point for all incoming data, ensuring it is sanitized and standardized. The Ingestion service must be deisgned to acheive a high **Throughput** in order to be able to handle masssive amount of incoming events.
* **HTTP Endpoint:** Accepts events over standard HTTP protocols with specific APIs.
* **Schema Validation:** Validates structure against shared schemas to ensure data integrity.
* **Normalization and Preprocessing:** Normalizes events into a standard envelope for downstream consistency, along with some consumer specific preprocessing as needed.
* **Broker Publishing:** Publishes validated events directly to the message broker by using the implemented Broker Abstraction layer.

---

#### 2. Message Broker (RabbitMQ)  (`packages/common/broker`)
The central transport layer and communication medium in this System which promotes Asynchronous communication of events between services. It ensure loose coupling that manages communication between decoupled services.
* **Decoupling:** Acts as the central event transport layer, decoupling producers from consumers.
* **Asynchronous Processing:** Uses asynchronous processing to handle events, which enforces delayed but eventual consistency over the system.
* **Delivery Guarantees:** Provides at-least-once delivery semantics.
* **Manual Acknowledgments:** Enables explicit acknowledgment control (**ACK/NACK**) for reliable processing.

---

#### 3. Consumers
Each consumer is a separate Nest repo in itself, each with its own envs, utils, libs and core logic and service apis.
Independently deployed services responsible for the actual processing of events.
* **Isolation:** Services are independently deployed and scaled based on specific logic needs.
* **Data Ownership:** Each consumer owns it independent data , presistence models which leads to more robust evolution of services.

  
