export interface AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    schoolLevel: string | null;
    passionIds: string[];
  };
}
