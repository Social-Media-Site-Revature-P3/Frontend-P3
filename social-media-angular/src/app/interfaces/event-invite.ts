export interface EventInvite {
    eventInviteId?: number;
    accepted: boolean;
    event: {
        eventId: number;
    }
    eventInviter: {
        userId: number
    }
    newEventMember: {
        userId: number
    }
}
