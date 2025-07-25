import { Alert, FlatList, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { productsList } from '../constants/products-list';
import { useNavigation } from '@react-navigation/native';
import { TabsScreenProps } from '../types/react-navigation';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  return (
    <FlatList
      contentContainerStyle={{ padding: 10, gap: 20 }}
      data={productsList}
      renderItem={({ item }) => (
        <Card>
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
            <Button
              icon="cart"
              onPress={() => Alert.alert('Adicionado ao carrinho!')}
            >
              Adicionar
            </Button>
          </Card.Actions>
        </Card>
      )}
    ></FlatList>
  );
}
