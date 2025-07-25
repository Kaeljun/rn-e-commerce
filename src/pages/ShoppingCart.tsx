import { FlatList, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { RootStackScreenProps } from '../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { remove } from '../state/reducers/cart.reducer';

export function ShoppingCart({
  navigation,
}: RootStackScreenProps<'ShoppingCart'>) {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <FlatList
      contentContainerStyle={{ padding: 10, gap: 20 }}
      data={cart.products}
      renderItem={({ item }) => (
        <Card>
          <Card.Title
            title={item.name}
            subtitle={`R$ ${item.price.toFixed(2)}`}
            titleVariant="titleMedium"
            subtitleVariant="titleMedium"
            left={() => <Card.Cover source={{ uri: '' }} />}
          />
          <Card.Actions>
            <Button
              onPress={() => {
                dispatch(remove(item.id));
              }}
            >
              Remover
            </Button>
          </Card.Actions>
        </Card>
      )}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={() => (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text variant="bodyMedium">Seu carrinho está vazio</Text>
          <Button onPress={() => navigation.goBack()}>Voltar às compras</Button>
        </View>
      )}
    />
  );
}
