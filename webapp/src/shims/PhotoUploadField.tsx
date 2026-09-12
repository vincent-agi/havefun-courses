import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../mobile/src/presentation/components/Button';
import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../mobile/src/presentation/theme/tokens';

type PhotoUploadFieldProps = {
  photoUri: string | null;
  onChange: (uri: string) => void;
};

/**
 * Shim web de `mobile/src/presentation/components/PhotoUploadField.tsx`.
 *
 * `react-native-image-picker` est natif only. Sur le web on ouvre un
 * `<input type="file">` masqué et on renvoie un object URL. Le `<input>` est
 * rendu via `React.createElement` : react-native-web s'appuie sur react-dom,
 * donc une balise DOM brute est acceptée.
 */
export function PhotoUploadField({
  photoUri,
  onChange,
}: PhotoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePick = () => inputRef.current?.click();

  const handleFile = (event: { target: HTMLInputElement }) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(URL.createObjectURL(file));
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Aucune photo sélectionnée</Text>
        </View>
      )}

      {React.createElement('input', {
        ref: inputRef,
        type: 'file',
        accept: 'image/*',
        style: { display: 'none' },
        onChange: handleFile,
      })}

      <View style={styles.actions}>
        <Button
          label="Choisir une photo"
          variant="secondary"
          onPress={handlePick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  preview: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  actions: {
    gap: spacing.sm,
  },
});
