import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import { useLoginMutation, useRegisterMutation } from '../services/api.service';
import { useNavigation } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RegisterForm, registerSchema } from '../schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';

export const RegisterPage = () => {
  const [mutate, result] = useRegisterMutation();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = data => {
    mutate({ email: data.email, password: data.password }).then(() =>
      showDialog(),
    );
  };

  return (
    <View style={styles.container}>
      <Text>Criar conta</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
            />
            {!!errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
            />
            {!!errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors.password?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Cadastrar</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alerta</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{result?.data?.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => navigation.goBack()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
});
