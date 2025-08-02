import { useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  List,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useGetOrderQuery } from '../services/api.service';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PurchaseHistoryPage = () => {
  const { data, error } = useGetOrderQuery();
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      {!!data?.length ? (
        <ScrollView>
          <List.AccordionGroup>
            {data
              ?.slice()
              .reverse()
              .map(order => (
                <List.Accordion
                  title={'Pedido nº ' + order.orderNumber}
                  id={order.id}
                  description={new Date(order.date).toLocaleDateString('pt-BR')}
                  key={order.id}
                >
                  <List.Item
                    title={
                      order.deliveryMethod === 'shipment'
                        ? 'Entregue'
                        : 'Retirado'
                    }
                    description={
                      order.deliveryMethod === 'shipment'
                        ? order.address.street
                        : order.pickupAddress
                    }
                  />
                  {order?.cart?.products?.map(product => (
                    <List.Item
                      description={product.price}
                      left={() => (
                        <Image
                          source={{ uri: product.image }}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            borderRadius: 8,
                            marginLeft: 10,
                          }}
                        />
                      )}
                      title={product.name}
                      right={() => <Text>{product.quantity}</Text>}
                      key={product.id}
                    />
                  ))}
                </List.Accordion>
              ))}
          </List.AccordionGroup>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Nenhum pedido encontrado</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
