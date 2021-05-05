
import React from 'react';
import { StyleSheet,  View, TouchableOpacity ,Alert} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';




export default class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      gameState: [

        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]

      ],
      currentPlayer: 1,
    }
  }
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer: 1,
    });
  }
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tile0} />;
      default: return <View />;
    }
  }


   getwinner = () => {
    const num_tiles = 3;
    var arr = this.state.gameState;
    var sum;
    //check rows
    for (var i = 0; i < num_tiles; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //check columns
    for (var i = 0; i < num_tiles; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //check diagonals
    sum =arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }

    
    sum =arr[2][0] + arr[1][1] + arr[0][2];
      if (sum == 3) { return 1; }
        else if (sum == -3) { return -1; }

    //there are no winners
    return 0;
  } 

// pressing th tiles
onTilepress = (row, col) => {
  //do not allow to style change
  var value = this.state.gameState[row][col];
  if (value != 0) { return; }

  // set correct tile
  var currentPlayer = this.state.currentPlayer;
  var arr = this.state.gameState.slice();
  arr[row][col] = currentPlayer;
  this.setState({ gameState: arr });

  // switch to other variable
  var nextplayer = (currentPlayer == 1) ? -1 : 1;
  this.setState({ currentPlayer: nextplayer });

  //check for winners
  var Winner = this.getwinner();
  if(Winner == 1)
  {
    Alert.alert("player 1 is the winner");
    this.initializeGame();
  } else if (Winner == -1)
  {
    Alert.alert("player 2 is the winner");
    this.initializeGame();
  }   
}



render(){
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity onPress={() => this.onTilepress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]} >
          {this.renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
          {this.renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]} >
          {this.renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity onPress={() => this.onTilepress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
          {this.renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(1, 1)} style={styles.tile} >
          {this.renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]} >
          {this.renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity onPress={() => this.onTilepress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
          {this.renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
          {this.renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
          {this.renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    alignContent: 'center',
    alignItems: 'center',

  },

  tileX:
  {
    color: "red",
    fontSize: 60,
    marginTop: 13,
  },
  tile0:
  {
    color: "green",
    fontSize: 60,
    marginTop: 13,
  }
});
