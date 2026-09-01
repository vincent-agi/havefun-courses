import { isOnboardingComplete, User } from './user';
import { SchoolLevel } from './school-level';

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: '1',
    email: 'eleve@example.com',
    firstName: 'Alex',
    schoolLevel: null,
    passionIds: [],
    xpPoints: 0,
    ...overrides,
  };
}

describe('isOnboardingComplete', () => {
  it('est incomplet sans classe ni passion', () => {
    expect(isOnboardingComplete(makeUser())).toBe(false);
  });

  it('est incomplet avec une classe mais sans passion', () => {
    expect(
      isOnboardingComplete(makeUser({ schoolLevel: SchoolLevel.TROISIEME })),
    ).toBe(false);
  });

  it('est complet avec une classe et au moins une passion', () => {
    expect(
      isOnboardingComplete(
        makeUser({ schoolLevel: SchoolLevel.TROISIEME, passionIds: ['skate'] }),
      ),
    ).toBe(true);
  });
});
