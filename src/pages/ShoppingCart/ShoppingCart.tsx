import { FlatList, Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { RootStackScreenProps } from '../../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { decrement, increment, remove } from '../../state/slices/cart-slice';
import * as React from 'react';
import { CartHeader } from './components/CartHeader';

export function ShoppingCart({
  navigation,
}: RootStackScreenProps<'ShoppingCart'>) {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <FlatList
      contentContainerStyle={{ padding: 8, gap: 5 }}
      data={cart.products}
      ListHeaderComponent={() => {
        if (cart.products.length > 0)
          return (
            <CartHeader
              onClear={() => {
                cart.products.forEach(p => dispatch(remove(p.id)));
              }}
            />
          );
      }}
      renderItem={({ item }) => (
        <Surface
          style={{
            padding: 10,
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10,
          }}
          mode="flat"
        >
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            style={{ flex: 1, borderRadius: 10 }}
          />
          <Card
            style={{ flex: 2, backgroundColor: theme.colors.elevation.level1 }}
            mode="contained"
          >
            <Card.Title
              title={item.name}
              subtitle={`R$ ${item.price.toFixed(2)}`}
              titleVariant="titleMedium"
              subtitleVariant="titleMedium"
            />
            <Card.Actions>
              <Surface style={styles.actions}>
                <IconButton
                  icon={item.quantity > 1 ? 'minus' : 'trash-can'}
                  onPress={() => {
                    if (item.quantity === 1) dispatch(remove(item.id));
                    else dispatch(decrement(item.id));
                  }}
                  mode="contained"
                />
                <Text variant="titleMedium">{item.quantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => {
                    dispatch(increment(item.id));
                  }}
                  mode="contained"
                />
              </Surface>
            </Card.Actions>
          </Card>
        </Surface>
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

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
  },
});
