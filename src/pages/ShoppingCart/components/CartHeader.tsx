import { Button, Surface, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

export function CartHeader({ onClear }: { onClear: () => void }) {
  const { totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
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
      <Button icon="arrow-right" mode="contained-tonal">
        Prosseguir com compra
      </Button>
    </Surface>
  );
}
