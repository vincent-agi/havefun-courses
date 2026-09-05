import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ChoiceRow,
  ExperimentValidatorProps,
  Feedback,
  NumberField,
} from './shared';

const int = (s: string): number | null => {
  const v = Number(s);
  return s.trim() !== '' && Number.isInteger(v) && v >= 0 ? v : null;
};

/** Notion : la descendance d'un croisement tend vers le rapport 3 dominant / 1 récessif. */
export function MendelRatioValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState([
    { dom: '', rec: '' },
    { dom: '', rec: '' },
    { dom: '', rec: '' },
  ]);
  const [checked, setChecked] = useState(false);

  const parsed = rows.map(r => ({ dom: int(r.dom), rec: int(r.rec) }));
  const ready = parsed.every(r => r.dom !== null && r.rec !== null);
  const totalDom = parsed.reduce((a, r) => a + (r.dom ?? 0), 0);
  const totalRec = parsed.reduce((a, r) => a + (r.rec ?? 0), 0);
  const ratio = totalRec > 0 ? totalDom / totalRec : null;
  const enough = totalDom + totalRec >= 50;
  const ok =
    ready && enough && ratio !== null && ratio >= 2.4 && ratio <= 3.8;

  const update = (i: number, patch: Partial<(typeof rows)[number]>) =>
    setRows(cur => cur.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque épi (ou lot), compte les grains de forme dominante et de
        forme récessive.
      </Text>
      {rows.map((row, i) => {
        const d = int(row.dom);
        const r = int(row.rec);
        const rr = r !== null && r > 0 && d !== null ? d / r : null;
        return (
          <View key={i} style={styles.rowCard}>
            <Text style={styles.rowTitle}>Épi {i + 1}</Text>
            <NumberField
              label="Grains dominants"
              value={row.dom}
              onChangeText={t => update(i, { dom: t })}
            />
            <NumberField
              label="Grains récessifs"
              value={row.rec}
              onChangeText={t => update(i, { rec: t })}
            />
            {rr !== null && (
              <Text style={styles.calc}>rapport = {rr.toFixed(2)}</Text>
            )}
          </View>
        );
      })}
      {ready && totalRec > 0 && (
        <Text style={styles.calc}>
          total : {totalDom} / {totalRec} → rapport global ={' '}
          {(ratio as number).toFixed(2)}
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les 3 épis (nombres entiers).</Feedback>
      )}
      {checked && ready && !enough && (
        <Feedback tone="warn">
          Compte davantage de grains (au moins 50 au total) : le rapport ne se
          stabilise qu’avec de grands nombres.
        </Feedback>
      )}
      {checked && ready && enough && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Bravo : rapport global ≈ ${(ratio as number).toFixed(
                2,
              )}, proche de 3 pour 1. Chaque caractère est porté par des facteurs hérités par paires ; le dominant masque le récessif sans le supprimer.`
            : `Rapport global ≈ ${(ratio as number).toFixed(
                2,
              )}. On attend une valeur proche de 3 (entre 2,4 et 3,8). Recompte, ou cumule plus d’épis.`}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const COMPATIBLE = [
  {
    value: 'oui' as const,
    label: 'Oui, si cette version domine ou est plus répandue dans la population',
  },
  { value: 'non' as const, label: 'Non, cela contredit l’hérédité' },
  { value: 'sait-pas' as const, label: 'On ne peut pas savoir' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [reco, setReco] = useState('');
  const [compat, setCompat] = useState<'oui' | 'non' | 'sait-pas' | null>(null);
  const [checked, setChecked] = useState(false);

  const nA = int(a);
  const nB = int(b);
  const total = (nA ?? 0) + (nB ?? 0);
  const propA = nA !== null && nB !== null && total > 0 ? nA / total : null;
  const enough = total >= 100;
  const recoOk = reco.trim().length >= 15;
  const compatOk = compat === 'oui';
  const ok = enough && propA !== null && recoOk && compatOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Compte les deux formes de ton caractère sur au moins 100 individus.
      </Text>
      <NumberField label="Nombre d’individus — forme A" value={a} onChangeText={setA} />
      <NumberField label="Nombre d’individus — forme B" value={b} onChangeText={setB} />
      {propA !== null && (
        <Text style={styles.calc}>
          total {total} · proportion A = {(propA * 100).toFixed(0)} %
        </Text>
      )}
      <View style={styles.field}>
        <Text style={styles.label}>Ce que tu conclus</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={reco}
          onChangeText={setReco}
          placeholder="Compatible avec un caractère à deux versions ? Pourquoi ?"
          placeholderTextColor={colors.text.secondary}
        />
      </View>
      <ChoiceRow
        label="Une forme plus fréquente que l’autre, est-ce compatible avec l’hérédité ?"
        options={COMPATIBLE}
        value={compat}
        onChange={setCompat}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bien : tu as un échantillon suffisant, les proportions des deux formes, et tu conclus qu’un caractère à deux versions (dont l’une peut dominer ou être plus répandue) reste compatible avec l’hérédité.'
            : [
                !enough ? 'Compte au moins 100 individus.' : null,
                !recoOk ? 'Rédige une conclusion (au moins une phrase).' : null,
                !compatOk
                  ? 'Une forme peut être plus fréquente sans contredire l’hérédité : elle peut être dominante ou simplement plus répandue.'
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
        </Feedback>
      )}
      {ok && <Button label="Défi réussi — continuer" onPress={onValidated} />}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.md },
  intro: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    lineHeight: 22,
  },
  rowCard: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.surface,
  },
  rowTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
  calc: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
  field: { gap: spacing.xs },
  label: { color: colors.text.primary, fontSize: typography.fontSize.sm },
  textArea: {
    minHeight: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    padding: spacing.md,
    textAlignVertical: 'top',
  },
});
