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

  {/*This performs the winning logic of the code*/}
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

  {/* This changes the icon that was clicked depending on whose tuen it is */}
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
        <View style={[styles.gameWinner, styles.btn]}>
          <Text style={styles.gameWinnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={isCross ? [styles.playerX, styles.btn] : [styles.playerO, styles.btn]}>
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
      style = {[styles.gameBtn, styles.btn]}
      >
        <Text style = {styles.gameBtnTxt}>{gameWinner ? "Restart the game" : "Reload the game"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 14,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWinner: {
    backgroundColor: 'green',
  },
  playerX: {
    backgroundColor: 'green',
  },
  playerO: {
    backgroundColor: 'orange',
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
    backgroundColor: 'purple',
  },
  gameBtnTxt: {
    fontSize: 20,
    color: 'white',
  },
});

export default App;
