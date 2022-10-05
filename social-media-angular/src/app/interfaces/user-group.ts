export interface UserGroup {
    userGroupId?: number;
    user: {
        userId: number;
    }
    group: {
        groupId: number;
    }
    creator: boolean;
    admin: boolean;
}
