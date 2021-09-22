import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Card/styles';
import Header from '../../components/Header';
import theme from '../../global/theme';

import { StackParamList } from '../../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    marginHorizontal: 20,
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
  title: {
    color: theme.colors.text,
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 8,
  },
  version: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

type Props = StackScreenProps<StackParamList, 'RealeaseNotes'>;

const RealeaseNotes: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Release Notes" canGoBack={navigation.canGoBack()} />
      <View style={styles.containerContent}>
        <Text style={styles.title}>Features</Text>
        <Text style={styles.version}>v0.0.1</Text>
        <Text>* Criar Listas com: Nome, Orçamento(Budget) e produtos.</Text>
        <Text>* Exibir detalhes da lista.</Text>
        <Text>* Definir quantidade e preço dos produtos da lista.</Text>
        <Text>
          * Armazenar uma base de produtos para facilitar a adição de produtos
          em novas listas.
        </Text>
        <Text style={styles.title}>Bugs</Text>
        <Text>Nenhum bug mapeado.</Text>
        <Text style={styles.title}>Roadmap</Text>
        <Text style={styles.version}>v0.0.2</Text>
        <Text>* Editar lista.</Text>
        <Text>* Finalizar lista.</Text>
        <Text>* Excluir lista.</Text>
        <Text>* Excluir(ocultar) produto.</Text>
        <Text>* Adicionar vários itens de forma facilitada.</Text>
        <Text>* Splash screen.</Text>
      </View>
    </View>
  );
};

export default RealeaseNotes;
