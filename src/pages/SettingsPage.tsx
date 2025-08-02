import { View } from 'react-native';
import { Button, Dialog, List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { TabsScreenProps } from '../types/react-navigation';
import { useLogOutMutation } from '../services/api.service';
import { useState } from 'react';

export const SettingsPage = ({
  navigation,
}: TabsScreenProps<'Configurações'>) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [mutate, result] = useLogOutMutation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View
      style={{
        flex: 1,
        // padding: 15,
        gap: 5,
        justifyContent: 'space-between',
      }}
    >
      <List.Section>
        <List.Item
          title="Meus pedidos"
          left={props => <List.Icon {...props} icon="cart" />}
          right={props => <List.Icon {...props} icon="arrow-right" />}
          onPress={() => navigation.navigate('Histórico de pedidos')}
        />
        <List.Item
          title="Sair"
          left={props => <List.Icon {...props} icon="logout" />}
          right={props => <List.Icon {...props} icon="arrow-right" />}
          onPress={() => showDialog()}
        />
      </List.Section>
      <View style={{ padding: 15 }}>
        <Text>Logado como {user.email}</Text>
      </View>

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alerta</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Tem certeza que deseja sair?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancelar</Button>
          <Button onPress={() => mutate()}>Sim</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};
