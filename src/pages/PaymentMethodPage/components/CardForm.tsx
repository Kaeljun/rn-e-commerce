import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput, Text, HelperText, Button } from 'react-native-paper';
import {
  PaymentMethodForm,
  paymentMethodSchema,
} from '../../../schemas/payment-method.schema';
import MaskInput, { Masks } from 'react-native-mask-input';
import { CVV_MASK, EXPIRY_DATE_MASK } from '../../../constants/masks';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { setOrderPaymentMethod } from '../../../state/slices/order-slice';

export const CardForm = ({ paymentMethod }: { paymentMethod: string }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<PaymentMethodForm>({
    //@ts-ignore
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit: SubmitHandler<PaymentMethodForm> = data => {
    dispatch(setOrderPaymentMethod(paymentMethod));
    navigation.navigate('Finalizar compra');
  };

  return (
    <>
      <Controller
        control={control}
        name="cardholderName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Titular"
              placeholder="Ex: Maria Silva"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.cardholderName}
            />
            {!!errors.cardholderName && (
              <HelperText type="error" visible={!!errors.cardholderName}>
                {errors.cardholderName?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="cardNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Número do cartão"
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.cardNumber}
              render={props => (
                <MaskInput {...props} mask={Masks.CREDIT_CARD} />
              )}
            />
            {!!errors.cardNumber && (
              <HelperText type="error" visible={!!errors.cardNumber}>
                {errors.cardNumber?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="expiryDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Data de expiração"
              placeholder="MM/AA"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.expiryDate}
              render={props => <MaskInput {...props} mask={EXPIRY_DATE_MASK} />}
            />
            {!!errors.expiryDate && (
              <HelperText type="error" visible={!!errors.expiryDate}>
                {errors.expiryDate?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="cvv"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Código de segurança"
              placeholder="123"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.cvv}
              render={props => <MaskInput {...props} mask={CVV_MASK} />}
            />
            {!!errors.cvv && (
              <HelperText type="error" visible={!!errors.cvv}>
                {errors.cvv?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button
        icon="arrow-right"
        mode="contained-tonal"
        //@ts-ignore
        onPress={handleSubmit(onSubmit)}
      >
        Prosseguir para finalização
      </Button>
    </>
  );
};
