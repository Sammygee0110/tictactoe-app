import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): JSX.Element {
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');

  const reload = () => {
    setGameState(new Array(9).fill('empty', 0, 9));
    setIsCross(false);
    setGameWinner('');
  };

  const checkIsWinner = () => {
    if (
      gameState[0] != 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[0] != 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[0] != 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[1] != 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game!`);
    } else if (
      gameState[2] != 'empty' &&
      gameState[2] === gameState[6] &&
      gameState[6] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (
      gameState[2] != 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (
      gameState[3] != 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game!`);
    } else if (
      gameState[6] != 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game!`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner(`Draw game...`);
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'Cross' : 'Circle';
      setIsCross(!isCross);
    } else {
      Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
    checkIsWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={styles.gameWinner}>
          <Text style={styles.gameWinnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={isCross ? styles.playerX : styles.playerO}>
          <Text style={styles.gameWinnerTxt}>
            Player {isCross ? 'X' : 'O'}'s turn
          </Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      <Pressable
      onPress={reload}
      style = {styles.gameBtn}
      >
        <Text style = {styles.gameBtnTxt}>{gameWinner ? "Restart the game" : "Reload the game"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameWinner: {
    margin: 15,
    backgroundColor: 'green',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerX: {
    margin: 15,
    backgroundColor: 'green',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerO: {
    margin: 15,
    backgroundColor: 'orange',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWinnerTxt: {
    fontSize: 25,
    color: 'white',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBtn: {
    margin: 15,
    backgroundColor: 'purple',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBtnTxt: {
    fontSize: 20,
    color: 'white',
  },
});

export default App;
