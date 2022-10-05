export interface UserEvent {
    userEventId?: number;
    user: {
        userId: number;
        firstName?: string;
        lastName?: string;
        nickname?: string;
        profilePicture?: string;
        email?: string;
    }
    event: {
        eventId: number;
        date?: string;
        group?: {
            groupId: number
        }
        info?: string;
        inviteOnly?: boolean;
        name?: string;
        request?: boolean;
        time?: string;
        picture?: string;
    }
    creator: boolean;
    admin: boolean;
}
