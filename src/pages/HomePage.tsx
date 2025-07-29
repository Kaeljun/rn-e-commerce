import { FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { productsList } from '../constants/products-list';
import { TabsScreenProps } from '../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { add, remove } from '../state/slices/cart-slice';
import { useGetProductsQuery } from '../services/api.service';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  const cart = useSelector((state: RootState) => state.cart);
  const { data, isError, error, status } = useGetProductsQuery();
  const dispatch = useDispatch();

  return (
    <FlatList
      contentContainerStyle={{ padding: 10, gap: 20 }}
      ListEmptyComponent={() => (
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {isError
            ? 'Erro ao carregar produtos :('
            : 'Nenhum produto encontrado'}
        </Text>
      )}
      data={data}
      renderItem={({ item }) => {
        const isInCart = !!cart.products.find(p => p.id === item.id);
        return (
          <Card contentStyle={{ padding: 10 }} mode="contained" key={item.id}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title
              title={item.name}
              subtitle={`R$ ${item.price.toFixed(2)}`}
              titleVariant="titleMedium"
              subtitleVariant="titleMedium"
            />
            <Card.Content>
              <Text variant="bodyMedium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim,
                eget facilisis urna quam vitae est.
              </Text>
            </Card.Content>
            <Card.Actions
              style={{
                justifyContent: 'space-between',
              }}
            >
              <Button
                icon="cart"
                onPress={() => {
                  dispatch(remove(item.id));
                }}
                disabled={!isInCart}
                style={!isInCart ? { opacity: 0 } : {}}
              >
                Remover
              </Button>
              <Button
                icon="cart"
                onPress={() => {
                  dispatch(add(item));
                }}
                disabled={isInCart}
              >
                {cart.products.find(p => p.id === item.id)
                  ? 'Adicionado'
                  : 'Adicionar'}
              </Button>
            </Card.Actions>
          </Card>
        );
      }}
    ></FlatList>
  );
}
