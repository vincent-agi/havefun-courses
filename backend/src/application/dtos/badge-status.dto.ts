export interface BadgeStatusDto {
  id: string;
  key: string;
  label: string;
  description: string;
  iconUrl: string;
  earned: boolean;
  earnedAt: Date | null;
}
