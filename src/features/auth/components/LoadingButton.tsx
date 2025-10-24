import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface LoadingButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  title: string;
}

export function LoadingButton({
  isLoading = false,
  title,
  style,
  ...props
}: LoadingButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled, style]}
      disabled={isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    paddingBlock: 8,
    paddingInline: 16,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
