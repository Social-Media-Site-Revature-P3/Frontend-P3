export interface GroupInvite {
    groupInviteId?: number;
    accepted: boolean;
    group: {
        groupId: number
    }
    groupInviter: {
        userId: number
    }
    newGroupMember: {
        userId: number
    }
}
