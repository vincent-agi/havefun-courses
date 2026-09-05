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

const SOURCES = ['Fontaine A', 'Fontaine B', 'Robinet C'] as const;
type SourceName = (typeof SOURCES)[number];

/** Notion : identifier la source d'une contagion par le taux d'attaque. */
export function OutbreakSourceValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState(
    SOURCES.map(name => ({ name, cases: '', users: '' })),
  );
  const [pick, setPick] = useState<SourceName | null>(null);
  const [soap, setSoap] = useState('');
  const [water, setWater] = useState('');
  const [checked, setChecked] = useState(false);

  const rates = rows.map(r => {
    const c = int(r.cases);
    const u = int(r.users);
    return c !== null && u !== null && u > 0 && c <= u ? c / u : null;
  });
  const complete = rates.every(r => r !== null);
  let culprit: SourceName | null = null;
  if (complete) {
    let best = -1;
    rates.forEach((rate, i) => {
      if ((rate as number) > best) {
        best = rate as number;
        culprit = rows[i].name;
      }
    });
  }
  const soapN = int(soap);
  const waterN = int(water);
  const transmissionOk =
    soapN !== null && waterN !== null && soapN < waterN;
  const ok =
    complete && pick !== null && pick === culprit && transmissionOk;

  const update = (i: number, patch: Partial<(typeof rows)[number]>) =>
    setRows(cur => cur.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque point d’eau : nombre de malades et nombre total
        d’utilisateurs. On calcule le taux d’attaque = malades ÷ utilisateurs.
      </Text>
      {rows.map((row, i) => (
        <View key={row.name} style={styles.rowCard}>
          <Text style={styles.rowTitle}>{row.name}</Text>
          <NumberField
            label="Malades"
            value={row.cases}
            onChangeText={t => update(i, { cases: t })}
          />
          <NumberField
            label="Utilisateurs"
            value={row.users}
            onChangeText={t => update(i, { users: t })}
          />
          {rates[i] !== null && (
            <Text style={styles.rate}>
              taux d’attaque = {(rates[i]! * 100).toFixed(0)} %
            </Text>
          )}
        </View>
      ))}
      <ChoiceRow
        label="Source responsable de l’épidémie ?"
        options={SOURCES.map(s => ({ value: s, label: s }))}
        value={pick}
        onChange={setPick}
      />

      <Text style={styles.sectionTitle}>Transmission par les mains</Text>
      <NumberField
        label="Contaminés après lavage au savon"
        value={soap}
        onChangeText={setSoap}
      />
      <NumberField
        label="Contaminés après simple rinçage à l’eau"
        value={water}
        onChangeText={setWater}
      />

      <Button label="Vérifier" onPress={() => setChecked(true)} />
      {checked && !complete && (
        <Feedback tone="warn">
          Renseigne les 3 points d’eau (malades ≤ utilisateurs, utilisateurs &gt;
          0).
        </Feedback>
      )}
      {checked && complete && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Exact : ${culprit} a le taux d’attaque le plus élevé, c’est la source — la « condamner » arrête l’épidémie. Et le savon coupe la transmission mieux que l’eau seule.`
            : [
                pick !== culprit
                  ? 'La source est le point d’eau au taux d’attaque le plus fort, pas forcément celui qui a le plus de malades en nombre absolu.'
                  : null,
                !transmissionOk
                  ? 'On attend moins de contaminés après lavage au savon qu’après simple rinçage.'
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
        </Feedback>
      )}
      {ok && (
        <Button label="Notion validée — continuer" onPress={onValidated} />
      )}
    </View>
  );
}

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [obsA, setObsA] = useState('');
  const [washA, setWashA] = useState('');
  const [obsB, setObsB] = useState('');
  const [washB, setWashB] = useState('');
  const [reco, setReco] = useState('');
  const [checked, setChecked] = useState(false);

  const oa = int(obsA);
  const wa = int(washA);
  const ob = int(obsB);
  const wb = int(washB);
  const rateA = oa !== null && wa !== null && oa > 0 && wa <= oa ? wa / oa : null;
  const rateB = ob !== null && wb !== null && ob > 0 && wb <= ob ? wb / ob : null;
  const compares = rateA !== null && rateB !== null && rateA > rateB;
  const recoOk = reco.trim().length >= 15;
  const ok = compares && recoOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Deux endroits : A avec savon + affiche, B sans rien. Compte les personnes
        observées et celles qui se lavent les mains.
      </Text>
      <Text style={styles.sectionTitle}>Endroit A (savon + affiche)</Text>
      <NumberField label="Observées" value={obsA} onChangeText={setObsA} />
      <NumberField label="Se lavent les mains" value={washA} onChangeText={setWashA} />
      <Text style={styles.sectionTitle}>Endroit B (rien)</Text>
      <NumberField label="Observées" value={obsB} onChangeText={setObsB} />
      <NumberField label="Se lavent les mains" value={washB} onChangeText={setWashB} />
      {rateA !== null && rateB !== null && (
        <Text style={styles.rate}>
          taux A = {(rateA * 100).toFixed(0)} % · taux B ={' '}
          {(rateB * 100).toFixed(0)} %
        </Text>
      )}
      <View style={styles.field}>
        <Text style={styles.label}>Ma recommandation (une phrase)</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={reco}
          onChangeText={setReco}
          placeholder="Que faudrait-il faire, d’après tes chiffres ?"
          placeholderTextColor={colors.text.secondary}
        />
      </View>
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bien : tu compares deux taux sur des effectifs comparables et ta recommandation suit tes chiffres.'
            : [
                !compares
                  ? 'Pour conclure que le dispositif aide, il faut un taux de lavage plus élevé en A qu’en B.'
                  : null,
                !recoOk
                  ? 'Formule une recommandation concrète (au moins une phrase).'
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
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    marginTop: spacing.xs,
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
  rate: {
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
