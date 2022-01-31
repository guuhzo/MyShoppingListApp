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
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Q } from '@nozbe/watermelondb';

import theme from '../../global/theme';

import {
  FloatActionButton,
  FiltersContainer,
  FiltersButtonsContainer,
  FilterButton,
  FilterButtonText,
} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import NoItems from '../../components/NoItems';
import ListSkeleton from './Components/Skeleton';

import { StackParamList } from '../../routes';
import database from '../../database';
import List from '../../database/model/List';
import { BUILD_VERSION } from '../Settings';

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

type Props = StackScreenProps<StackParamList, 'Lists'>;

interface IList {
  id: string;
  name: string;
  cash: number;
  card: number;
  done: boolean;
  quantity: number;
}

type FilterType = 'All' | 'Finished' | 'Shared' | 'Starred';

const Lists: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState<List[]>([]);
  const [filter, setFilter] = useState<FilterType>();

  const loadingLists = useCallback(async () => {
    setLoading(true);

    const listsCollection = database.get<List>('lists');
    let dbLists = [] as List[];
    switch (filter) {
      case 'All':
        dbLists = await listsCollection.query().fetch();
        break;
      case 'Finished':
        dbLists = await listsCollection.query(Q.where('done', true)).fetch();
        break;
      default:
        dbLists = await listsCollection.query(Q.where('done', false)).fetch();
        break;
    }

    setLists(dbLists.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1)));

    setLoading(false);
  }, [filter]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadingLists();
    });

    loadingLists();

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

  const handleFilter = useCallback(
    (selectedFilter: FilterType) => {
      if (filter === selectedFilter) {
        setFilter(undefined);
        return;
      }
      setFilter(selectedFilter);
    },
    [filter],
  );

  const renderItem = ({ item }: { item: IList }) => (
    <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
      <Card
        header={{
          fields: {
            title: item.name,
            finished: item.done,
          },
        }}
        footer={{
          fields: {
            quantity: item.quantity,
            total: item.cash + item.card,
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
              <FiltersContainer>
                <Icon
                  name="filter"
                  color={theme.colors.text}
                  size={RFValue(16)}
                />
                <FiltersButtonsContainer>
                  <FilterButton
                    color={
                      filter === 'All'
                        ? theme.colors.primary
                        : theme.colors.altPrimary
                    }
                    pressed={filter === 'All'}
                    onPress={() => handleFilter('All')}
                  >
                    <Icon
                      name="plus-circle"
                      size={RFValue(16)}
                      color={
                        filter === 'All'
                          ? theme.colors.altPrimary
                          : theme.colors.primary
                      }
                    />
                    <FilterButtonText
                      color={
                        filter === 'All'
                          ? theme.colors.altPrimary
                          : theme.colors.primary
                      }
                    >
                      All
                    </FilterButtonText>
                  </FilterButton>
                  {/** ********************************************* */}
                  <FilterButton
                    color={
                      filter === 'Finished'
                        ? theme.colors.sucess
                        : theme.colors.altSuccess
                    }
                    pressed={filter === 'Finished'}
                    onPress={() => handleFilter('Finished')}
                  >
                    <Icon
                      name="check-circle"
                      size={RFValue(16)}
                      color={
                        filter === 'Finished'
                          ? theme.colors.altSuccess
                          : theme.colors.sucess
                      }
                    />
                    <FilterButtonText
                      color={
                        filter === 'Finished'
                          ? theme.colors.altSuccess
                          : theme.colors.sucess
                      }
                    >
                      Finished
                    </FilterButtonText>
                  </FilterButton>
                </FiltersButtonsContainer>
              </FiltersContainer>
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
          <FloatActionButton onPress={handleCreate} style={{ elevation: 5 }}>
            <Icon name="plus" size={RFValue(20)} color={theme.colors.altText} />
          </FloatActionButton>
        </View>
        <View style={styles.BuildInfo}>
          <Text style={styles.buildText}>{`Build ${BUILD_VERSION}`}</Text>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Lists;
