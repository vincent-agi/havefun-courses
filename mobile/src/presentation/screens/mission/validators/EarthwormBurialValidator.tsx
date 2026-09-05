import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ChoiceRow,
  ExperimentValidatorProps,
  Feedback,
  NumberField,
} from './shared';

const num = (s: string): number | null => {
  const v = Number(s.replace(',', '.'));
  return s.trim() !== '' && Number.isFinite(v) ? v : null;
};

/** Notion : la faune du sol enfouit et recycle la matière organique (humus). */
export function EarthwormBurialValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [sink, setSink] = useState('');
  const [days, setDays] = useState('');
  const [initial, setInitial] = useState('');
  const [fine, setFine] = useState('');
  const [coarse, setCoarse] = useState('');
  const [checked, setChecked] = useState(false);

  const s = num(sink);
  const d = num(days);
  const rate = s !== null && d !== null && d > 0 && s >= 0 ? s / d : null;
  const m0 = num(initial);
  const mf = num(fine);
  const mc = num(coarse);
  const massReady =
    m0 !== null && mf !== null && mc !== null && m0 > 0 && mf >= 0 && mc >= 0;
  const decompFine = massReady ? 1 - (mf as number) / (m0 as number) : null;
  const decompCoarse = massReady ? 1 - (mc as number) / (m0 as number) : null;
  const faunaHelps =
    decompFine !== null &&
    decompCoarse !== null &&
    (decompCoarse as number) > (decompFine as number) + 0.1;
  const ok = rate !== null && faunaHelps;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte l’enfoncement de la dalle et les masses de feuilles restantes.
      </Text>
      <NumberField label="Enfoncement de la dalle (mm)" value={sink} onChangeText={setSink} />
      <NumberField label="Durée du suivi (jours)" value={days} onChangeText={setDays} />
      {rate !== null && (
        <Text style={styles.calc}>
          vitesse d’enfouissement ≈ {rate.toFixed(3)} mm/jour
        </Text>
      )}
      <NumberField
        label="Masse de feuilles au départ, dans chaque sachet (g)"
        value={initial}
        onChangeText={setInitial}
      />
      <NumberField
        label="Feuilles restantes — sachet mailles fines (g)"
        value={fine}
        onChangeText={setFine}
      />
      <NumberField
        label="Feuilles restantes — sachet grosses mailles (g)"
        value={coarse}
        onChangeText={setCoarse}
      />
      {decompFine !== null && decompCoarse !== null && (
        <Text style={styles.calc}>
          décomposé : mailles fines {(decompFine * 100).toFixed(0)} % · grosses
          mailles {(decompCoarse * 100).toFixed(0)} %
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && (rate === null || !massReady) && (
        <Feedback tone="warn">
          Renseigne l’enfoncement, la durée et les trois masses de feuilles.
        </Feedback>
      )}
      {checked && rate !== null && massReady && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : les feuilles sont bien plus décomposées quand la faune peut y accéder, et la dalle s’enfonce parce que les vers remontent la terre. Ils enfouissent la litière et fabriquent l’humus."
            : "On attend une décomposition nettement plus forte dans le sachet à grosses mailles (accessible à la faune) que dans celui à mailles fines."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const RECYCLES = [
  {
    value: 'organique' as const,
    label: 'La matière organique (feuille, pain), pas le plastique',
  },
  { value: 'tout' as const, label: 'Tout, y compris le plastique' },
  { value: 'rien' as const, label: 'Rien du tout' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [leaf, setLeaf] = useState('');
  const [bread, setBread] = useState('');
  const [plastic, setPlastic] = useState('');
  const [recycles, setRecycles] = useState<
    'organique' | 'tout' | 'rien' | null
  >(null);
  const [checked, setChecked] = useState(false);

  const l = num(leaf);
  const b = num(bread);
  const p = num(plastic);
  const ready = l !== null && b !== null && p !== null;
  const pattern =
    ready &&
    (l as number) >= 30 &&
    (b as number) >= 30 &&
    (p as number) <= 10;
  const recyclesOk = recycles === 'organique';
  const ok = pattern && recyclesOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque déchet enterré, indique la part de masse perdue (en %).
      </Text>
      <NumberField label="Feuille — masse perdue (%)" value={leaf} onChangeText={setLeaf} />
      <NumberField label="Pain — masse perdue (%)" value={bread} onChangeText={setBread} />
      <NumberField
        label="Plastique fin — masse perdue (%)"
        value={plastic}
        onChangeText={setPlastic}
      />
      <ChoiceRow
        label="Que sait recycler la faune du sol ?"
        options={RECYCLES}
        value={recycles}
        onChange={setRecycles}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : la feuille et le pain perdent une part importante de leur masse, le plastique presque rien. La faune du sol recycle la matière organique, pas le plastique."
            : "On attend une forte perte pour la feuille et le pain (matière organique) et une perte quasi nulle pour le plastique."}
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
  calc: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
