import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    marginVertical: 16,
  },
  version: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  line: {
    height: 16,
  },
});

type Props = StackScreenProps<StackParamList, 'RealeaseNotes'>;

const RealeaseNotes: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Release Notes" canGoBack={navigation.canGoBack()} />
      <View style={styles.containerContent}>
        <ScrollView>
          <Text style={styles.title}>Features</Text>
          <Text style={styles.version}>v0.3.0</Text>
          <Text>
            * (FEATURE) Filtros de listas: Agora é possível filtras os itens que
            são carregados na tela de Listas. Antes era carregado por padrão
            todas as listas criadas, agora, somente as listas que não foram
            finalizadas são carregadas por padrão e o usuário pode ir filtrando
            de acordo com sua preferência.
          </Text>
          <Text />
          <Text>
            * (FEATURE) Arquivamento de produtos: Agora é possível arquivar os
            produtos apertando e segurando por alguns segundos o item. Uma opção
            de filtro foi disponibilizada para carregar todos os produtos ou
            somente os disponíveis. OBS: Para desarquivar um produto basta usar
            o filtro para apresentar os produtos arquivados e em seguida
            realizar o mesmo processo de arquivamento.
          </Text>

          <Text style={styles.title}>Bugs conhecidos</Text>
          <Text>
            * Ao abrir a tela de adicionar produtos em modo de edição é
            disparado o useEffect 4 vezes fazendo com que os itens da lista
            fiquem piscando durante o ciclo de vida.
          </Text>

          <Text style={styles.title}>Roadmap</Text>
          <Text>* Melhorar a experiência com animações.</Text>
          <Text>* Disponibilizar o APP em PT-BR.</Text>
          <Text>
            * Melhorar a informação apresentada nos cards da tela de listas.
          </Text>
          <Text>
            * Alterar a informação TOTAL na tela de detalhes da lista para
            SAVING e realizar o cálculo de quanto está sendo economizado
            comparando o valor total dos produtos com o valor orçado.
          </Text>

          <Text style={styles.title}>Versions History</Text>
          <Text style={styles.version}>v0.2.1</Text>
          <Text>
            * Ajustado o bug em que o Footer na tela de detalhes da lista ficava
            por baixo dos botões virtuais em alguns dispositivos.
          </Text>
          <Text>
            * Ajustado o tamanho do menu de opções na tela de detalhes da lista
            para que a visualização fique mais nítida em uma maior gama de
            dispositivos.
          </Text>
          <Text style={styles.version}>v0.2.0</Text>
          <Text>* Editar lista.</Text>
          <Text>* Finalizar lista.</Text>
          <Text>* Excluir lista.</Text>
          <Text>* Adicionar vários itens de forma facilitada.</Text>
          <Text style={styles.version}>v0.1.7</Text>
          <Text>* Teste OTA Update.</Text>
          <View style={styles.line} />
          <Text style={styles.version}>v0.1.1</Text>
          <Text>* Ajuste no texto do componente NoItems.</Text>
          <View style={styles.line} />
          <Text style={styles.version}>v0.1.0</Text>
          <Text>* Ferramenta de atualizações via OTA configurada.</Text>
          <Text>* Splash screen.</Text>
          <Text style={styles.version}>v0.0.1</Text>
          <Text>* Criar Listas com: Nome, Orçamento(Budget) e produtos.</Text>
          <Text>* Exibir detalhes da lista.</Text>
          <Text>* Definir quantidade e preço dos produtos da lista.</Text>
          <Text>
            * Armazenar uma base de produtos para facilitar a adição de produtos
            em novas listas.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default RealeaseNotes;
