import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Badge,
  IconButton,
  Searchbar,
  TextInput,
} from 'react-native-paper';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setFilters } from '../../../state/slices/search-filters-slice';

export const HomePageHeader = ({
  layout,
  navigation,
  options,
  route,
}: BottomTabHeaderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearchQuery] = useState('');
  const cart = useSelector((state: RootState) => state.cart);
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  return (
    <SafeAreaView edges={['top']}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          padding: 5,
        }}
      >
        <Searchbar
          placeholder="Pesquisar"
          onChangeText={setSearchQuery}
          value={search}
          style={{ width: 300 }}
          mode="bar"
          onIconPress={e => dispatch(setFilters({ ...filters, search }))}
          onKeyPress={key => {
            if (key.nativeEvent.key === 'Enter')
              dispatch(setFilters({ ...filters, search }));
          }}
          onClearIconPress={() =>
            dispatch(setFilters({ ...filters, search: '' }))
          }
        />
        <IconButton
          icon="cart"
          onPress={() => navigation.navigate('ShoppingCart')}
        />
        <Badge
          visible={cart.totalItems > 0}
          style={{ position: 'absolute', bottom: 10, right: 10 }}
          children={cart.totalItems}
          pointerEvents="none"
        />
      </View>
    </SafeAreaView>
  );
};
