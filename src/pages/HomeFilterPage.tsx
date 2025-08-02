import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  RadioButton,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setFilters } from '../state/slices/search-filters-slice';
import { RootStackScreenProps } from '../types/react-navigation';

const mapValueToQuery = {
  priceasc: { _sort: 'price', _order: 'asc' },
  pricedesc: { _sort: 'price', _order: 'desc' },
  nameasc: { _sort: 'name', _order: 'asc' },
  namedesc: { _sort: 'name', _order: 'desc' },
};

const mapQueryToValue = ({
  _sort,
  _order,
}: {
  _sort: string;
  _order: string;
}) => {
  return `${_sort}${_order}`;
};

export const HomeFilterPage = ({
  navigation,
}: RootStackScreenProps<'Filtros'>) => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const onMountValue = mapQueryToValue({
    _order: filters._order,
    _sort: filters._sort,
  });

  const [selected, setSelected] = useState(onMountValue);

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        gap: 10,
      }}
    >
      <Text variant="titleSmall">Ordenar por</Text>
      <RadioButton.Group
        //@ts-ignore TODO: fix type
        onValueChange={value => setSelected(value)}
        value={selected}
      >
        <RadioButton.Item label="Preço: do menor ao maior" value="priceasc" />
        <RadioButton.Item
          label="Preço: do maior ao menor"
          value="pricedesc"
          mode="android"
        />
        <RadioButton.Item label="Nome: de A a Z" value="nameasc" />
        <RadioButton.Item label="Nome: de Z a A" value="namedesc" />
      </RadioButton.Group>
      <Button
        mode="contained"
        style={{ alignSelf: 'center' }}
        onPress={() =>
          dispatch(
            setFilters({
              ...filters,
              //@ts-ignore TODO: fix type
              _sort: mapValueToQuery[selected]._sort,
              //@ts-ignore TODO: fix type
              _order: mapValueToQuery[selected]._order,
            }),
            navigation.goBack(),
          )
        }
      >
        Aplicar
      </Button>
    </View>
  );
};
