export interface Follow {
    followId?: number;
    followedUser: {
        userId: number
    };
    followerUser: {
        userId: number
    }
}
