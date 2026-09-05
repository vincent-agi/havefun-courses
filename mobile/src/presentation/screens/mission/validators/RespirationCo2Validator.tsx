import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ExperimentValidatorProps,
  Feedback,
  NumberField,
} from './shared';

const num = (s: string): number | null => {
  const v = Number(s.replace(',', '.'));
  return s.trim() !== '' && Number.isFinite(v) ? v : null;
};

/** Notion : la respiration rejette du CO₂ (combustion lente), intensifiée par l'effort. */
export function RespirationCo2Validator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [expired, setExpired] = useState('');
  const [ambient, setAmbient] = useState('');
  const [rest, setRest] = useState('');
  const [effort, setEffort] = useState('');
  const [checked, setChecked] = useState(false);

  const te = num(expired);
  const ta = num(ambient);
  const fr = num(rest);
  const fe = num(effort);
  const ready = te !== null && ta !== null && fr !== null && fe !== null;
  const expiredFaster =
    te !== null && ta !== null && te > 0 && ta > 0 && te < 0.6 * ta;
  const effortMore = fr !== null && fe !== null && fe > fr;
  const ok = expiredFaster && effortMore;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte les temps de trouble de l’eau de chaux et tes fréquences
        respiratoires.
      </Text>
      <NumberField
        label="Trouble — air expiré, au repos (s)"
        value={expired}
        onChangeText={setExpired}
      />
      <NumberField
        label="Trouble — air ambiant, témoin (s)"
        value={ambient}
        onChangeText={setAmbient}
      />
      <NumberField
        label="Respirations par minute — au repos"
        value={rest}
        onChangeText={setRest}
      />
      <NumberField
        label="Respirations par minute — après effort"
        value={effort}
        onChangeText={setEffort}
      />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les quatre mesures.</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : l’air expiré trouble l’eau de chaux bien plus vite que l’air ambiant (il est riche en dioxyde de carbone), et l’effort augmente la fréquence respiratoire. La respiration est une combustion lente qui s’intensifie."
            : [
                !expiredFaster
                  ? "L’air expiré devrait troubler l’eau de chaux beaucoup plus vite que l’air ambiant."
                  : null,
                !effortMore
                  ? "Après l’effort, on respire plus souvent qu’au repos."
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [r1, setR1] = useState('');
  const [c1, setC1] = useState('');
  const [r2, setR2] = useState('');
  const [c2, setC2] = useState('');
  const [r3, setR3] = useState('');
  const [c3, setC3] = useState('');
  const [reco, setReco] = useState('');
  const [checked, setChecked] = useState(false);

  const rs = [num(r1), num(r2), num(r3)];
  const cs = [num(c1), num(c2), num(c3)];
  const ready = [...rs, ...cs].every(v => v !== null);
  const inc = (xs: (number | null)[]) =>
    xs.every((v, i) => i === 0 || (v as number) > (xs[i - 1] as number));
  const rInc = ready && inc(rs);
  const cInc = ready && inc(cs);
  const recoOk = reco.trim().length >= 15;
  const ok = rInc && cInc && recoOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour trois niveaux d’effort, reporte la fréquence respiratoire et la
        fréquence cardiaque (par minute), après stabilisation.
      </Text>
      <Text style={styles.rowTitle}>Marche</Text>
      <NumberField label="Respirations / min" value={r1} onChangeText={setR1} />
      <NumberField label="Battements / min" value={c1} onChangeText={setC1} />
      <Text style={styles.rowTitle}>Marche rapide</Text>
      <NumberField label="Respirations / min" value={r2} onChangeText={setR2} />
      <NumberField label="Battements / min" value={c2} onChangeText={setC2} />
      <Text style={styles.rowTitle}>Course</Text>
      <NumberField label="Respirations / min" value={r3} onChangeText={setR3} />
      <NumberField label="Battements / min" value={c3} onChangeText={setC3} />
      <View style={styles.field}>
        <Text style={styles.label}>Ta conclusion</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={reco}
          onChangeText={setReco}
          placeholder="Lien entre l’intensité de l’effort et la consommation de l’organisme ?"
          placeholderTextColor={colors.text.secondary}
        />
      </View>
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : tes deux séries (respiration et fréquence cardiaque) augmentent avec l’intensité de l’effort, et ta conclusion relie effort et consommation."
            : "On attend deux séries croissantes (marche < marche rapide < course) pour la respiration et le cœur, et une conclusion écrite."}
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
  rowTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    marginTop: spacing.xs,
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
