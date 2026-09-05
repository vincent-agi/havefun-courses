import { getExperimentValidator } from './index';

describe('getExperimentValidator', () => {
  it('renvoie un composant pour chaque notion pilote', () => {
    for (const key of [
      'pi-circle-ratio',
      'density-floats',
      'mass-conservation',
      'outbreak-source',
      'earth-shadow',
      'air-oxygen-fraction',
      'plant-matter-origin',
      'shadow-straight-line',
      'melting-plateau',
      'mendel-ratio',
      'pythagoras-3-4-5',
      'co2-limewater',
      'earthworm-burial',
    ]) {
      expect(typeof getExperimentValidator(key)).toBe('function');
    }
  });

  it('renvoie null pour une notion inconnue ou absente', () => {
    expect(getExperimentValidator('inconnue')).toBeNull();
    expect(getExperimentValidator(null)).toBeNull();
    expect(getExperimentValidator(undefined)).toBeNull();
  });
});
