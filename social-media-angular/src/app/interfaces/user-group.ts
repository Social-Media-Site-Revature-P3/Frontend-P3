export interface UserGroup {
  userGroupId?: number;
  user: {
      userId: number;
      firstName?: string;
      lastName?: string;
      nickname?: string;
      profilePicture?: string;
      email?: string;
  }
  group: {
    groupId: number;
    picture?: '',
    name?: '',
    inviteOnly?: false,
    request?: false,
    about?: ''
  }
  creator: boolean;
  admin: boolean;
}
