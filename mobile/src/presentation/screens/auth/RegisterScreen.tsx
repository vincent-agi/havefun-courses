import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../theme/tokens';

export function RegisterScreen() {
  const { register } = useSession();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await register({ email, password, firstName });
    } catch {
      setError('Impossible de créer le compte. Vérifie tes informations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor={colors.text.secondary}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.text.secondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe (8 caractères min.)"
        placeholderTextColor={colors.text.secondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        label="Créer mon compte"
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
  },
  error: {
    color: colors.accent.danger,
    fontSize: typography.fontSize.sm,
  },
});
