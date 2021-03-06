import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Header from '../../components/Header';
import theme from '../../global/theme';
import { StackParamList } from '../../routes';
import database from '../../database';
import List from '../../database/model/List';
import Product from '../../database/model/Product';
import ListItem from '../../database/model/ListItem';

export const BUILD_VERSION = '0.3.0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 80,
    width: 208,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    padding: 4,
  },
  text: {
    color: theme.colors.text,
    fontSize: 25,
    textAlign: 'center',
  },
  buildText: {
    color: theme.colors.text,
    fontSize: 20,
  },
  BuildInfo: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});

type Props = StackScreenProps<StackParamList, 'Settings'>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const [bSyncText, setBSyncText] = useState('Generate Data');
  const [bDeleteText, setBDeleteText] = useState('Delete Data');
  const [showCompletedText, setShowCompletedText] = useState(false);

  const handleSync = useCallback(async () => {
    setBSyncText('Generating');

    setBSyncText('Generate Data');
  }, []);

  const handleDelete = useCallback(async () => {
    setBDeleteText('Deleting');
    setShowCompletedText(false);

    const listsCollection = database.get<List>('lists');
    const productsCollection = database.get<Product>('products');
    const listItemsCollection = database.get<ListItem>('list_items');

    await database.action(async () => {
      const lists = await listsCollection.query().fetch();
      const products = await productsCollection.query().fetch();
      const relations = await listItemsCollection.query().fetch();

      for (const relation of relations) {
        await relation.destroyPermanently();
      }

      for (const product of products) {
        await product.destroyPermanently();
      }

      for (const list of lists) {
        await list.destroyPermanently();
      }
    });

    setShowCompletedText(true);
    setBDeleteText('Delete Data');
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Beta Admin View" canGoBack={navigation.canGoBack()} />
      <View style={{ alignItems: 'center', margin: 5 }}>
        <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>
          ATEN????O
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Espa??o destinado para a manuten????o dos dados armazenados no APP.
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Em caso de d??vidas entrar em contato com o time de desenvolvimento.
        </Text>
      </View>
      <View style={styles.containerContent}>
        {showCompletedText && (
          <Text
            style={{
              color: 'green',
              fontSize: 24,
              paddingBottom: 24,
              marginTop: -34,
            }}
          >
            Done!!!
          </Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('RealeaseNotes')}>
          <View style={styles.button}>
            <Text style={styles.text}>Release Notes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSync} disabled>
          <View style={[styles.button, { marginTop: 8 }]}>
            <Text style={{ ...styles.text, color: theme.colors.agnostic }}>
              {`${bSyncText} (WIP)`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <View style={[styles.button, { marginTop: 8 }]}>
            <Text style={styles.text}>{bDeleteText}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.BuildInfo}>
        <Text style={styles.buildText}>{`Build ${BUILD_VERSION}`}</Text>
      </View>
    </View>
  );
};

export default Settings;
