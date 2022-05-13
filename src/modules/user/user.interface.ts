export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  deleteDate?: Date;
  referralId?: string;
  referer?: IUser;
  referralCount: number;
  refereeCount: number;
  salt?: string;
  validatePassword: () => void;
  setPassword: (password: string) => void;
}
export interface IUserMongoose extends IUser, Document {}
