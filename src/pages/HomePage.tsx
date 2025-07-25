import { FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { productsList } from '../constants/products-list';
import { TabsScreenProps } from '../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { add, remove } from '../state/reducers/cart.reducer';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <FlatList
      contentContainerStyle={{ padding: 10, gap: 20 }}
      data={productsList}
      renderItem={({ item }) => {
        const isInCart = !!cart.products.find(p => p.id === item.id);
        return (
          <Card contentStyle={{ padding: 10 }}>
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
            <Card.Actions>
              {isInCart ? (
                <Button
                  icon="cart"
                  onPress={() => {
                    dispatch(remove(item.id));
                  }}
                >
                  Remover
                </Button>
              ) : (
                <></>
              )}
              <Button
                icon="cart"
                onPress={() => {
                  const value = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                  };
                  dispatch(add(value));
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
