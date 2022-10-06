export interface EventInvite {
    eventInviteId?: number;
    accepted: boolean;
    event: {
        eventId: number;
        name?: string;
    }
    eventInviter: {
        userId: number
        firstName?: string;
        lastName?: string;
    }
    newEventMember: {
        userId: number
    }
}
