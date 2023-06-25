export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  username: string;
  userId: string;
  collectionId: string;
}
