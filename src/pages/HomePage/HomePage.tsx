import { FlatList, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { TabsScreenProps } from '../../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useGetProductsInfiniteQuery } from '../../services/api.service';
import { clear } from '../../state/slices/search-filters-slice';
import { ProductCard } from './components/ProductCard';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  const filters = useSelector((state: RootState) => state.filters);

  const { data, isError, fetchNextPage, hasNextPage } =
    useGetProductsInfiniteQuery(filters);
  console.log('data', data);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <FlatList
      contentContainerStyle={{ gap: 10 }}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
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
      data={data?.pages.flatMap(item => item)}
      renderItem={({ ...props }) => <ProductCard {...props.item} />}
    ></FlatList>
  );
}
