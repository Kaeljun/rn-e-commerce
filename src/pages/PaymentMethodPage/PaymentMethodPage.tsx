import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setOrderPaymentMethod } from '../../state/slices/order-slice';
import { CardForm } from './components/CardForm';

export const PaymentMethodPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleProceedToFinish = () => {
    dispatch(setOrderPaymentMethod(paymentMethod));
    navigation.navigate('Finalizar compra');
  };

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        buttons={[
          {
            value: 'credit',
            label: 'Crédito',
          },
          {
            value: 'pix',
            label: 'Pix',
          },
          { value: 'debit', label: 'Débito' },
        ]}
      />
      {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
        <CardForm paymentMethod={paymentMethod} />
      ) : null}
      {paymentMethod === 'pix' ? (
        <>
          <Text>
            Na próxima tela copie o código pix e pague com seu banco de
            preferência.
          </Text>
          <Button
            icon="arrow-right"
            mode="contained-tonal"
            onPress={handleProceedToFinish}
          >
            Prosseguir para finalização
          </Button>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginVertical: 25,
    gap: 15,
  },
});
