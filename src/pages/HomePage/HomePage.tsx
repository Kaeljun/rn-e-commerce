import { FlatList, View } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import { TabsScreenProps } from '../../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { add, remove } from '../../state/slices/cart-slice';
import { useGetProductsQuery } from '../../services/api.service';
import {
  clear,
  Filters,
  setFilters,
} from '../../state/slices/search-filters-slice';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  const cart = useSelector((state: RootState) => state.cart);
  const filters = useSelector((state: RootState) => state.filters);

  const { data, isError } = useGetProductsQuery(filters);
  console.log('data', data);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <FlatList
      contentContainerStyle={{ gap: 10 }}
      onEndReached={() => dispatch(setFilters({ ...filters, _page: 2 }))}
      ListHeaderComponent={() => {
        return (
          <View
            style={{
              backgroundColor: theme.colors.background,
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >
            <Button
              icon="filter"
              //TODO: react native issue https://github.com/facebook/react-native/issues/51763
              onPressIn={() => navigation.navigate('Filtros')}
              mode="contained"
            >
              Filtrar
            </Button>
            <Button
              icon="cancel"
              //TODO: react native issue https://github.com/facebook/react-native/issues/51763
              onPressIn={() => dispatch(clear())}
              mode="outlined"
            >
              Limpar filtros
            </Button>
          </View>
        );
      }}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
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
