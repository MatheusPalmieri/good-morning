import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import {
  authenticateUser,
  BiometricButton,
  ErrorMessage,
  FormInput,
  isBiometricAvailable,
  LoadingButton,
  LoginFormData,
  loginSchema,
  RememberMeCheckbox,
  saveBiometricCredentials,
  useAuthStore,
} from '@/features/auth';

export default function LoginScreen() {
  const router = useRouter();
  const setToken = useAuthStore(state => state.setToken);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    const available = await isBiometricAvailable();
    setBiometricAvailable(available);
  };

  const performLogin = useCallback(
    async (username: string, password: string) => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await authenticateUser(username, password);

        if (response.success && response.token) {
          if (rememberMe && biometricAvailable) {
            await saveBiometricCredentials(username, password);
          }

          await setToken(response.token);
          router.replace('/quote');
        } else {
          setErrorMessage(response.message || 'Erro ao fazer login');
        }
      } catch {
        setErrorMessage('Erro inesperado ao fazer login. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [setToken, router, rememberMe, biometricAvailable]
  );

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      await performLogin(data.username, data.password);
    },
    [performLogin]
  );

  const handleBiometricSuccess = useCallback(
    (username: string, password: string) => {
      setValue('username', username);
      setValue('password', password);
      performLogin(username, password);
    },
    [performLogin, setValue]
  );

  const handleBiometricError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  return (
    <LinearGradient
      colors={['#0EA5E9', '#38BDF8', '#7DD3FC']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInUp.duration(600)}
            style={styles.header}
          >
            <Image
              source={require('@/features/auth/assets/sun.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Bom Dia!</Text>
            <Text style={styles.subtitle}>
              Sua frase inspiradora espera por você
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(600).delay(200)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Entre na sua conta</Text>

            <FormInput
              label="Usuário"
              name="username"
              control={control}
              error={errors.username}
              placeholder="Digite seu usuário"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <FormInput
              label="Senha"
              name="password"
              control={control}
              error={errors.password}
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
              editable={!isLoading}
            />

            {biometricAvailable && (
              <RememberMeCheckbox
                checked={rememberMe}
                onChange={setRememberMe}
                disabled={isLoading}
              />
            )}

            <ErrorMessage message={errorMessage} />

            <LoadingButton
              title="Entrar"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />

            <BiometricButton
              onSuccess={handleBiometricSuccess}
              onError={handleBiometricError}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
});
