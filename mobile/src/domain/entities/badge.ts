export interface Badge {
  id: string;
  key: string;
  label: string;
  description: string;
  iconUrl: string;
}

export interface BadgeStatus extends Badge {
  earned: boolean;
  earnedAt: string | null;
}
