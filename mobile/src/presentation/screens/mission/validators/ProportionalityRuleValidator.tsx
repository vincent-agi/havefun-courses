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
const near = (a: number, b: number, tol: number) => Math.abs(a - b) / b <= tol;

/** Notion : proportionnalité et règle de trois (le prix suit la masse). */
export function ProportionalityRuleValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [price, setPrice] = useState('');
  const [portion, setPortion] = useState('');
  const [studentPrice, setStudentPrice] = useState('');
  const [doublePrice, setDoublePrice] = useState('');
  const [triplePrice, setTriplePrice] = useState('');
  const [checked, setChecked] = useState(false);

  const p = num(price);
  const m = num(portion);
  const computed = p !== null && m !== null && p > 0 && m > 0 ? (p / 1000) * m : null;
  const sp = num(studentPrice);
  const dp = num(doublePrice);
  const tp = num(triplePrice);
  const ready = computed !== null && sp !== null && dp !== null && tp !== null;
  const priceOk = computed !== null && sp !== null && near(sp, computed, 0.05);
  const doubleOk = computed !== null && dp !== null && near(dp, 2 * computed, 0.05);
  const tripleOk = computed !== null && tp !== null && near(tp, 3 * computed, 0.05);
  const ok = ready && priceOk && doubleOk && tripleOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte le prix au kilo, la masse de ta portion et les prix que tu as
        calculés.
      </Text>
      <NumberField label="Prix au kilo (€/kg)" value={price} onChangeText={setPrice} />
      <NumberField label="Masse de la portion (g)" value={portion} onChangeText={setPortion} />
      {computed !== null && (
        <Text style={styles.calc}>
          prix attendu de la portion ≈ {computed.toFixed(2)} €
        </Text>
      )}
      <NumberField label="Prix de la portion — ton calcul (€)" value={studentPrice} onChangeText={setStudentPrice} />
      <NumberField label="Prix de la portion doublée (€)" value={doublePrice} onChangeText={setDoublePrice} />
      <NumberField label="Prix de la portion triplée (€)" value={triplePrice} onChangeText={setTriplePrice} />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne toutes les valeurs (prix et masse non nuls).</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : ton prix est cohérent, et doubler ou tripler la portion double ou triple le prix. Le prix est proportionnel à la masse (règle de trois)."
            : "On attend un prix égal à prix au kilo ÷ 1000 × masse, un prix double pour la portion doublée et triple pour la triplée."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const SCALE = [
  {
    value: 'bon' as const,
    label: '1 cm sur le plan = 2000 cm en réalité',
  },
  { value: 'inverse' as const, label: '2000 cm sur le plan = 1 cm en réalité' },
  { value: 'egal' as const, label: '1 cm sur le plan = 2000 cm sur le plan' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [planCm, setPlanCm] = useState('');
  const [predicted, setPredicted] = useState('');
  const [measured, setMeasured] = useState('');
  const [scale, setScale] = useState<'bon' | 'inverse' | 'egal' | null>(null);
  const [checked, setChecked] = useState(false);

  const lp = num(planCm);
  const pr = num(predicted);
  const me = num(measured);
  const expected = lp !== null && lp > 0 ? lp * 20 : null; // 1/2000 -> 1 cm = 20 m
  const predOk = expected !== null && pr !== null && near(pr, expected, 0.05);
  const measOk = pr !== null && me !== null && pr > 0 && near(me, pr, 0.1);
  const scaleOk = scale === 'bon';
  const ok = predOk && measOk && scaleOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la longueur du trajet sur le plan, la longueur réelle que tu
        prévois, puis celle que tu mesures.
      </Text>
      <NumberField label="Longueur sur le plan (cm)" value={planCm} onChangeText={setPlanCm} />
      <NumberField label="Longueur réelle prévue (m)" value={predicted} onChangeText={setPredicted} />
      <NumberField label="Longueur réelle mesurée au décamètre (m)" value={measured} onChangeText={setMeasured} />
      {expected !== null && (
        <Text style={styles.calc}>
          longueur réelle attendue = {expected.toFixed(1)} m
        </Text>
      )}
      <ChoiceRow
        label="L’échelle 1/2000 signifie…"
        options={SCALE}
        value={scale}
        onChange={setScale}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : ta prévision vaut la longueur sur le plan × 2000 (soit × 20 pour l’avoir en mètres), et ta mesure la confirme."
            : "À l’échelle 1/2000, 1 cm sur le plan représente 2000 cm = 20 m en réalité. Multiplie la longueur du plan par 20 pour obtenir des mètres."}
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
