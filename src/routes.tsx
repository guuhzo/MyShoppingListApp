import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Lists from './pages/Lists';
import CreateList from './pages/CreateList';
import AddProducts from './pages/AddProducts';
import ListDetails from './pages/ListDetails';
import Settings from './pages/Settings';
import RealeaseNotes from './pages/RealeaseNotes';
import Product from './database/model/Product';

export type StackParamList = {
  Lists: undefined;
  CreateList: { id: string } | undefined;
  AddProducts: {
    listId: string | undefined;
    listName: string;
    cash: number;
    card: number;
    products: { id: string; name: string; isSelected: boolean }[] | undefined;
  };
  ListDetails: { id: string; listName: string };
  Settings: undefined;
  RealeaseNotes: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Lists"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="CreateList" component={CreateList} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ListDetails" component={ListDetails} />
      <Stack.Screen name="RealeaseNotes" component={RealeaseNotes} />
    </Stack.Navigator>
  );
};

export default MainStack;
