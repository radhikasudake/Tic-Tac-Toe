import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import { red } from 'color-name';
import { render } from 'react-dom';



export default class App extends React.Component {
  

 constructor(props){
  super(props)
    this.state ={
      gameState :[
        
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        
      ],
      currentPlayer: 1,
    } 
 }
 componentDidMount()
 {
   this.initializeGame();
 }
 initializeGame = () => {
   this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  });
 }
 renderIcon = (row,col) => {
   var value = this.state.gameState[row][col];
   switch(value)
   {
     case 1: return <Icon name="close" style={styles.tileX} />;
     case -1: return <Icon name="circle-outline" style={styles.tile0} />;
     default: return <View />;
   }
 }

 onTilepress = (row,col) => {
   //do not allow to style change
   var value = this.state.gameState[row][col];
   if (value != 0){ return; }

  // set correct tile
  var currentPlayer = this.state.currentPlayer;
  var arr = this.state.gameState.slice();
  arr[row][col] = currentPlayer;
  this.setState({gameState: arr});

  // switch to other variable
  var nextplayer = (currentPlayer == 1) ? -1 :1;
  this.setState({currentPlayer : nextplayer});
 }

 render(){
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity  onPress={() => this.onTilepress(0,0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]} >
        {this.renderIcon(0,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(0,1)} style={[styles.tile, { borderTopWidth: 0 }]} >
        {this.renderIcon(0,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(0,2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]} >
        {this.renderIcon(0,2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity onPress={() => this.onTilepress(1,0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
        {this.renderIcon(1,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(1,1)} style={styles.tile} >
        {this.renderIcon(1,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(1,2)} style={[styles.tile, { borderRightWidth: 0 }]} >
        {this.renderIcon(1,2)}
          </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }} >
        <TouchableOpacity onPress={() => this.onTilepress(2,0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} > 
        {this.renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(2,1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
        {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilepress(2,2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
        {this.renderIcon(2,2)}
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
    color:"red",
    fontSize: 60,
    marginTop:13,
  },
  tile0:
  {
    color:"green",
    fontSize: 60,
    marginTop:13,
  }
});
