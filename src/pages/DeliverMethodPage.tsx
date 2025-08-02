import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  List,
  RadioButton,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Address } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOrderAddress,
  setOrderDeliveryMethod,
  setOrderPickupAddress,
} from '../state/slices/order-slice';
import { AppDispatch, RootState } from '../state/store';
import { loadAddresses } from '../state/slices/address-slice';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DeliverMethodPage = () => {
  const navigation = useNavigation();
  const [deliveryMethod, setDeliveryMethod] = useState('shipment');
  const addresses = useSelector((state: RootState) => state.addresses);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [selectedPickupLocation, setSelectedPickupLocation] = useState('');
  const handleContinue = () => {
    if (
      deliveryMethod === 'shipment'
        ? !!selectedAddress
        : !!selectedPickupLocation
    ) {
      dispatch(setOrderPickupAddress(selectedPickupLocation));
      dispatch(setOrderDeliveryMethod(deliveryMethod));
      dispatch(setOrderAddress(selectedAddress!));
      navigation.navigate('Método de pagamento');
    }
  };

  const canContinue =
    deliveryMethod === 'shipment'
      ? !!selectedAddress
      : !!selectedPickupLocation;

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Escolher tipo de entrega</Text>
        <SegmentedButtons
          value={deliveryMethod}
          onValueChange={setDeliveryMethod}
          buttons={[
            {
              value: 'shipment',
              label: 'Entrega',
            },
            {
              value: 'pickup',
              label: 'Retirada em loja',
            },
          ]}
        />
        {deliveryMethod === 'shipment' ? (
          <>
            <Text>Selecionar endereço de entrega</Text>
            {!!addresses.length ? (
              <List.Accordion
                title="Endereços salvos"
                left={props => <List.Icon {...props} icon="pin" />}
              >
                {addresses?.map(address => {
                  return (
                    <List.Item
                      title={address.addressName}
                      onPress={() => setSelectedAddress(address)}
                      description={() => (
                        <Text>
                          {address.street}, {address.number}
                        </Text>
                      )}
                      right={() => (
                        <RadioButton
                          value={address.addressName}
                          status={
                            selectedAddress?.addressName === address.addressName
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      )}
                      key={addresses?.indexOf(address)}
                    />
                  );
                })}
              </List.Accordion>
            ) : null}
            <Button
              icon="plus"
              mode="contained"
              onPress={() => navigation.navigate('Novo endereco')}
            >
              Novo endereço
            </Button>
          </>
        ) : (
          <>
            <Text>Selecione o endereço de retirada</Text>
            <List.Accordion
              title="Endereços disponíveis"
              left={props => <List.Icon {...props} icon="store" />}
            >
              <List.Item
                title={'Loja Porto Alegre'}
                onPress={() => setSelectedPickupLocation('Loja Porto Alegre')}
                right={() => (
                  <RadioButton
                    value={'Loja Porto Alegre'}
                    status={
                      selectedPickupLocation === 'Loja Porto Alegre'
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                )}
              />
              <List.Item
                title={'Loja Caxias do Sul'}
                onPress={() => setSelectedPickupLocation('Loja Caxias do Sul')}
                right={() => (
                  <RadioButton
                    value={'Loja Caxias do Sul'}
                    status={
                      selectedPickupLocation === 'Loja Caxias do Sul'
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                )}
              />
            </List.Accordion>
          </>
        )}

        <Button
          icon="arrow-right"
          mode="contained-tonal"
          onPress={handleContinue}
          disabled={!canContinue}
        >
          Continuar para pagamento
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 15,
  },
});
