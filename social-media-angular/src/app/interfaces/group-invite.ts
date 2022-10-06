export interface GroupInvite {
    groupInviteId?: number;
    accepted: boolean;
    group: {
        groupId: number
        name?: string
    }
    groupInviter: {
        userId: number
        firstName?: string;
        lastName?: string;
    }
    newGroupMember: {
        userId: number
    }
}
