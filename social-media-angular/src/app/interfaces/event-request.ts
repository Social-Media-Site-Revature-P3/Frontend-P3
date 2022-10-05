export interface EventRequest {
    eventRequestId?: number;
    accepted: boolean;
    text: string;
    user: {
        userId: number
    }
    event: {
        eventId: number
    }
}
