import { Button, Surface, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useNavigation } from '@react-navigation/native';
import { setOrderProducts } from '../../../state/slices/order-slice';

export function CartHeader({ onClear }: { onClear: () => void }) {
  const { totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  const cart = useSelector((state: RootState) => state.cart);
  const order = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleContinue = () => {
    dispatch(setOrderProducts(cart));
    navigation.navigate('Método de entrega');
  };
  return (
    <Surface
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 16,
        gap: 15,
      }}
      elevation={3}
      mode="flat"
    >
      <Text variant="titleLarge">{totalItems} itens</Text>
      <Text variant="titleLarge">Preço total: R${totalPrice.toFixed(2)}</Text>
      <Button icon="delete" onPress={onClear} mode="contained">
        Limpar carrinho
      </Button>
      <Button
        icon="arrow-right"
        mode="contained-tonal"
        onPress={handleContinue}
      >
        Prosseguir para entrega
      </Button>
    </Surface>
  );
}
