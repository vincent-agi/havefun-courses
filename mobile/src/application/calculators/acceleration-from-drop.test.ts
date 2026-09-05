import { computeAccelerationFromDrop } from './acceleration-from-drop';

describe('computeAccelerationFromDrop', () => {
  it('deduit l’acceleration de d = 1/2 a t^2', () => {
    // 1 m en 1 s -> a = 2 m/s^2
    expect(computeAccelerationFromDrop({ distanceM: 1, timeS: 1 })).toBe(2);
    // meme acceleration : 4 m en 2 s
    expect(computeAccelerationFromDrop({ distanceM: 4, timeS: 2 })).toBe(2);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(computeAccelerationFromDrop({ distanceM: 1, timeS: 0 })).toBeNull();
    expect(
      computeAccelerationFromDrop({ distanceM: 1 } as Record<string, number>),
    ).toBeNull();
  });
});
