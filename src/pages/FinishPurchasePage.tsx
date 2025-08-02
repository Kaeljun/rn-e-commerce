import { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Snackbar,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { useOrderMutation } from '../services/api.service';
import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { clearCart } from '../state/slices/cart-slice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../types/react-navigation';

export const FinishPurchasePage = ({
  navigation,
}: {
  navigation: RootStackScreenProps<'Finalizar compra'>;
}) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const copyToClipboard = () => {
    Clipboard.setString('código pix');
  };

  const [mutate, result] = useOrderMutation();

  const order = useSelector((state: RootState) => state.order);

  const handlePurchase = () => {
    mutate(order).then(result => {
      //@ts-ignore
      navigation.popToTop();
    });
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.container}
        data={cart.products}
        ListHeaderComponent={() => (
          <Text variant="titleLarge">Resumo do seu pedido</Text>
        )}
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
              style={{
                flex: 2,
                backgroundColor: theme.colors.elevation.level1,
              }}
              mode="contained"
            >
              <Card.Title
                title={item.name}
                subtitle={`R$ ${item.price.toFixed(2)}`}
                titleVariant="titleMedium"
                subtitleVariant="titleMedium"
                right={() => <Text variant="bodyLarge"> {item.quantity}</Text>}
              />
            </Card>
          </Surface>
        )}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() => (
          <>
            <View style={styles.footer}>
              <Text variant="titleLarge">Entrega</Text>
              <Surface mode="flat" style={styles.surface}>
                {order.deliveryMethod === 'shipment' ? (
                  <>
                    <Text variant="bodyLarge">Enviar para:</Text>
                    <Text>
                      {order.address?.street}, {order.address?.number}
                    </Text>
                    <Text>{order.address?.neighborhood}</Text>
                    <Text>{order.address?.city}</Text>
                  </>
                ) : (
                  <>
                    <Text variant="bodyLarge">Retirar em:</Text>
                    <Text>{order.pickupAddress}</Text>
                  </>
                )}
              </Surface>

              <Divider />
              <Text variant="titleLarge">Pagamento</Text>
              <Surface mode="flat" style={styles.surface}>
                <Text variant="bodyLarge">
                  Total: R${cart.totalPrice.toFixed(2)}
                </Text>
                <Text>Forma de pagamento:</Text>

                {order.paymentMethod === 'pix' ? (
                  <>
                    <Text>Pix</Text>
                    <Text>
                      Clique no botão abaixo para copiar o código Pix para a
                      área de transferência:
                    </Text>
                    <Button onPress={copyToClipboard}>Copiar código Pix</Button>
                  </>
                ) : null}
                {order.paymentMethod === 'credit' ? (
                  <>
                    <Text>Cartão de crédito</Text>
                  </>
                ) : null}
                {order.paymentMethod === 'debit' ? (
                  <>
                    <Text>Cartão de débito</Text>
                  </>
                ) : null}
              </Surface>
              <Button
                icon={result.isLoading ? undefined : 'check'}
                mode="contained-tonal"
                onPress={handlePurchase}
                disabled={result.isLoading || result.isSuccess}
              >
                {result.isLoading ? <ActivityIndicator /> : 'Finalizar pedido'}
              </Button>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  footer: {
    gap: 15,
  },
  surface: {
    borderRadius: 10,
    padding: 10,
  },
});
