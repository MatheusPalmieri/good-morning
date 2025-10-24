import { Control, Controller, FieldError } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface FormInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export function FormInput({ label, name, control, error, ...textInputProps }: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingBlock: 8,
    paddingInline: 16,
    height: 44,
    fontSize: 16,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});

