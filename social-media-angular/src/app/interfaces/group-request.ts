export interface GroupRequest {
    groupRequestId?: number;
    text: string;
    accepted: boolean;
    user: {
        userId: number;
    }
    group: {
        groupId: number;
    }

}
