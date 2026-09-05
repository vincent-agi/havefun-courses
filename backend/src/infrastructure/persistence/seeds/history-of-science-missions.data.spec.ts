import { describe, expect, it } from 'vitest';
import { SchoolLevel } from '../../../domain/entities/school-level.js';
import { HISTORY_OF_SCIENCE_MISSIONS } from './history-of-science-missions.data.js';

const COLLEGE_LEVELS: SchoolLevel[] = [
  SchoolLevel.SIXIEME,
  SchoolLevel.CINQUIEME,
  SchoolLevel.QUATRIEME,
  SchoolLevel.TROISIEME,
];

const TITLE_MAX_LENGTH = 150; // colonne challenges.title

describe('HISTORY_OF_SCIENCE_MISSIONS', () => {
  it('couvre les 69 sous-notions des 4 milestones', () => {
    expect(HISTORY_OF_SCIENCE_MISSIONS).toHaveLength(69);
  });

  it('a des codes et des titres uniques', () => {
    const codes = HISTORY_OF_SCIENCE_MISSIONS.map((m) => m.code);
    const titles = HISTORY_OF_SCIENCE_MISSIONS.map((m) => m.title);
    expect(new Set(codes).size).toBe(codes.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('cible uniquement des niveaux collège', () => {
    for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
      expect(COLLEGE_LEVELS).toContain(mission.level);
    }
  });

  it('respecte la longueur maximale du titre en base', () => {
    for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
      expect(mission.title.length).toBeLessThanOrEqual(TITLE_MAX_LENGTH);
    }
  });

  it('fournit un récit et une explication non vides', () => {
    for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
      expect(mission.narrativeIntro.trim().length).toBeGreaterThan(40);
      expect(mission.theoryExplanation.trim().length).toBeGreaterThan(20);
    }
  });

  it('a un schéma de calcul valide (formule + champs bornés)', () => {
    for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
      const { formula, resultLabel, fields } = mission.calculatorSchema;
      expect(formula).toMatch(/^[a-z][a-z0-9-]+$/);
      expect(resultLabel.trim().length).toBeGreaterThan(0);
      expect(fields.length).toBeGreaterThanOrEqual(1);
      for (const field of fields) {
        expect(field.key).toMatch(/^[a-zA-Z][a-zA-Z0-9]*$/);
        expect(field.label.trim().length).toBeGreaterThan(0);
        expect(field.min).toBeLessThan(field.max);
      }
      const keys = fields.map((f) => f.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it('répartit les missions sur les 4 matières', () => {
    const bySubject = new Map<string, number>();
    for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
      bySubject.set(mission.subject, (bySubject.get(mission.subject) ?? 0) + 1);
    }
    expect(bySubject.get('Mathématiques')).toBe(18);
    expect(bySubject.get('Physique')).toBe(16);
    expect(bySubject.get('Chimie')).toBe(14);
    expect(bySubject.get('SVT')).toBe(21);
  });

  describe('missions pilotes (parcours expérimental)', () => {
    const pilots = HISTORY_OF_SCIENCE_MISSIONS.filter((m) => m.notionKey);

    it('couvre les 4 matières (déploiement progressif)', () => {
      const subjects = new Set(pilots.map((p) => p.subject));
      expect(subjects).toEqual(
        new Set(['Chimie', 'Mathématiques', 'Physique', 'SVT']),
      );
      expect(pilots.length).toBe(10);
    });

    it('a des clés de notion uniques et en kebab-case', () => {
      const keys = pilots.map((p) => p.notionKey as string);
      expect(new Set(keys).size).toBe(keys.length);
      for (const key of keys) expect(key).toMatch(/^[a-z][a-z0-9-]+$/);
    });

    it('fournit un protocole guidé complet et un défi autonome', () => {
      for (const pilot of pilots) {
        const guided = pilot.guidedExperiment!;
        expect(guided.materials.length).toBeGreaterThanOrEqual(2);
        expect(guided.steps.length).toBeGreaterThanOrEqual(3);
        expect(guided.steps.every((s) => s.instruction.trim().length > 0)).toBe(
          true,
        );
        expect(guided.steps.some((s) => (s.question ?? '').includes('?'))).toBe(
          true,
        );
        expect(guided.schema.trim().length).toBeGreaterThan(0);
        expect(guided.measures.length).toBeGreaterThanOrEqual(1);
        expect(guided.interpretation.trim().length).toBeGreaterThan(40);

        const autonomous = pilot.autonomousChallenge!;
        expect(autonomous.brief.trim().length).toBeGreaterThan(60);
        expect(autonomous.schema.trim().length).toBeGreaterThan(0);
        expect(autonomous.successCriteria.trim().length).toBeGreaterThan(20);
      }
    });

    it('laisse les autres missions sur l’ancien parcours (sans notionKey)', () => {
      const nonPilots = HISTORY_OF_SCIENCE_MISSIONS.filter((m) => !m.notionKey);
      expect(nonPilots).toHaveLength(59);
      for (const mission of nonPilots) {
        expect(mission.guidedExperiment).toBeNull();
        expect(mission.autonomousChallenge).toBeNull();
      }
    });
  });
});
