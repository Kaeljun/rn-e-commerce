import { FlatList, View } from 'react-native';
import { Button, Snackbar, Text, useTheme } from 'react-native-paper';
import { TabsScreenProps } from '../../types/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useGetProductsInfiniteQuery } from '../../services/api.service';
import { clear } from '../../state/slices/search-filters-slice';
import { ProductCard } from './components/ProductCard';
import { setShowFeedback } from '../../state/slices/feedback-slice';

export function HomePage({ navigation }: TabsScreenProps<'Início'>) {
  const filters = useSelector((state: RootState) => state.filters);
  const feedback = useSelector((state: RootState) => state.feedback);

  const onDismissSnackBar = () => dispatch(setShowFeedback({ visible: false }));
  const { data, isError, fetchNextPage, hasNextPage } =
    useGetProductsInfiniteQuery(filters);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <FlatList
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
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
      />
      <Snackbar
        visible={feedback.visible}
        onDismiss={onDismissSnackBar}
        theme={theme}
        action={{ label: 'Ok' }}
      >
        Compra realizada com sucesso.
      </Snackbar>
    </>
  );
}
