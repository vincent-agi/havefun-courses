import { getExperimentValidator } from './index';

describe('getExperimentValidator', () => {
  it('renvoie un composant pour chaque notion pilote', () => {
    for (const key of [
      'pi-circle-ratio',
      'density-floats',
      'mass-conservation',
      'outbreak-source',
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
