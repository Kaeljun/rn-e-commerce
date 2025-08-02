import { Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../../state/slices/cart-slice';
import { RootState } from '../../../state/store';

export const ProductCard = ({ id, image, name, price }: Product) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const isInCart = !!cart.products.find(p => p.id === id);

  return (
    <Card contentStyle={{ padding: 10 }} mode="contained" key={id}>
      <Card.Cover source={{ uri: image }} />
      <Card.Title
        title={name}
        subtitle={`R$ ${price.toFixed(2)}`}
        titleVariant="titleMedium"
        subtitleVariant="titleMedium"
      />
      <Card.Content>
        <Text variant="bodyMedium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis
          urna quam vitae est.
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
            dispatch(remove(id));
          }}
          disabled={!isInCart}
          style={!isInCart ? { opacity: 0 } : {}}
        >
          Remover
        </Button>
        <Button
          icon="cart"
          onPress={() => {
            dispatch(add({ id, image, name, price }));
          }}
          disabled={isInCart}
        >
          {cart.products.find(p => p.id === id) ? 'Adicionado' : 'Adicionar'}
        </Button>
      </Card.Actions>
    </Card>
  );
};
