export interface Follow {
    followId?: number;
    followedUser: {
        userId: number
        firstName?: string,
        lastName?: string,
        nickname?: string,
        profilePicture?: string
    };
    followerUser: {
        userId: number,
        firstName?: string,
        lastName?: string,
        nickname?: string,
        profilePicture?: string
    }
}
