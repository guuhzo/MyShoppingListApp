import React, { useState, useEffect, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../global/theme';

import { FloatActionButton } from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import NoItems from '../../components/NoItems';
import ListSkeleton from './Components/Skeleton';

import { StackParamList } from '../../routes';
import database from '../../database';
import List from '../../database/model/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    marginTop: 20,
  },
  containerEmptyList: {
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 25,
  },
});

type Props = StackScreenProps<StackParamList, 'Lists'>;

interface IList {
  id: string;
  name: string;
  cash: number;
  card: number;
  done: boolean;
  quantity: number;
}

const Lists: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const [lists, setLists] = useState([] as List[]);

  const loadingLists = useCallback(async () => {
    setLoading(true);

    const listsCollection = database.get<List>('lists');
    const dbLists = await listsCollection.query().fetch();

    setLists(dbLists);

    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadingLists());

    return unsubscribe;
  }, [loadingLists, navigation]);

  const handleCreate = useCallback(() => {
    navigation.navigate('CreateList');
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    loadingLists();
  }, [loadingLists]);

  const handlePress = useCallback(
    (id: string) => {
      const index = lists.findIndex(list => list.id === id);
      const list = lists[index];

      if (!list) {
        return;
      }

      navigation.navigate('ListDetails', { id: list.id, listName: list.name });
    },
    [lists, navigation],
  );

  const renderItem = ({ item }: { item: IList }) => (
    <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
      <Card
        header={{
          fields: {
            title: item.name,
          },
        }}
        footer={{
          fields: {
            quantity: item.quantity,
            total: item.cash + item.card,
          },
          style: {
            fontSize: 16,
          },
        }}
      />
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header title="My Lists" canGoBack={navigation.canGoBack()} />
          <SafeAreaView style={styles.container}>
            <View style={styles.containerContent}>
              {loading ? (
                <ListSkeleton />
              ) : (
                <FlatList
                  data={lists}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={handleRefresh}
                      colors={[theme.colors.primary]}
                    />
                  }
                  ListEmptyComponent={<NoItems />}
                  contentContainerStyle={lists.length === 0 && { flex: 1 }}
                />
              )}
            </View>
          </SafeAreaView>
          <FloatActionButton onPress={handleCreate}>
            <Icon name="plus" size={RFValue(20)} color={theme.colors.altText} />
          </FloatActionButton>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Lists;
