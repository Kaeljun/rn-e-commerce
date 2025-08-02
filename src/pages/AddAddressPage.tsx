import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderAddress } from '../state/slices/order-slice';
import { useLazyGetAddressQuery } from '../services/address.service';
import { AddressForm, addressSchema } from '../schemas/address.schema';
import { storeAddress } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../state/store';
import { loadAddresses } from '../state/slices/address-slice';

export const AddAddressPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [trigger, result, lastPromiseInfo] = useLazyGetAddressQuery();
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger: triggerForm,
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressName: '',
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      street: '',
    },
  });

  const onSubmit: SubmitHandler<AddressForm> = async data => {
    dispatch(setOrderAddress(data));
    await storeAddress(data, user.id);
    dispatch(loadAddresses(user.id));
    navigation.goBack();
  };

  setValue('city', result?.data?.localidade);
  setValue('street', result?.data?.logradouro);
  setValue('neighborhood', result?.data?.bairro);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="addressName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Nome do endereço"
              placeholder="Casa, Trabalho..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.addressName}
            />
            {!!errors.addressName && (
              <HelperText type="error" visible={!!errors.addressName}>
                {errors.addressName?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="cep"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="CEP (somente números)"
              placeholder="12345-678"
              keyboardType="numeric"
              onBlur={async () => {
                onBlur();
                const isValid = await triggerForm('cep');
                if (isValid) {
                  trigger(getValues('cep').replace('-', ''));
                }
              }}
              onChangeText={onChange}
              value={value}
              error={!!errors.cep}
              render={props => <MaskInput {...props} mask={Masks.ZIP_CODE} />}
            />
            {!!errors.cep && (
              <HelperText type="error" visible={!!errors.cep}>
                {errors.cep?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="street"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Rua"
              placeholder="Avenida Rio Branco"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.street}
              disabled={!!result?.data?.logradouro}
            />
            {!!errors.street && (
              <HelperText type="error" visible={!!errors.street}>
                {errors.street?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="number"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Número"
              keyboardType="numeric"
              placeholder="1234"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.number}
            />
            {!!errors.number && (
              <HelperText type="error" visible={!!errors.number}>
                {errors.number?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="neighborhood"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Bairro"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.neighborhood}
              disabled={!!result?.data?.bairro}
            />
            {!!errors.neighborhood && (
              <HelperText type="error" visible={!!errors.neighborhood}>
                {errors.neighborhood?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              label="Cidade"
              placeholder="Caxias do Sul"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.city}
              disabled={!!result?.data?.localidade}
            />
            {!!errors.city && (
              <HelperText type="error" visible={!!errors.city}>
                {errors.city?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button
        mode="contained"
        //@ts-ignore
        onPress={handleSubmit(onSubmit)}
      >
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 15,
    margin: 15,
  },
});
