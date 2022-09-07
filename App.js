import Matter from 'matter-js';
import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Bird from './components/Bird';
import Physics from './components/Physics';
import Constants from './utils/Constants';
import Floor from './components/Floor';
import {resetPipes} from './utils/ResetPipes';
import Images from './utils/Images';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      score: 0,
    };

    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT,
    );

    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    Matter.World.add(world, [bird, floor1, floor2]);

    Matter.Events.on(engine, 'collisionStart', event => {
      let pairs = event.pairs;

      this.gameEngine.dispatch({type: 'game-over'});
    });

    return {
      physics: {engine: engine, world: world},
      bird: {body: bird, pose: 1, renderer: Bird},
      floor1: {body: floor1, renderer: Floor},
      floor2: {body: floor2, renderer: Floor},
    };
  };

  onEvent = e => {
    if (e.type === 'game-over') {
      // Alert.alert('Game Over');
      this.setState({running: false});
    } else if (e.type === 'score') {
      this.setState({
        score: this.state.score + 1,
      });
    }
  };

  reset = () => {
    resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({running: true, score: 0});
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          running={this.state.running}
          systems={[Physics]}
          onEvent={this.onEvent}
          style={styles.gameContainer}
          entities={this.entities}>
          <StatusBar hidden={true} />
        </GameEngine>
        <Text style={styles.score}>{this.state.score}</Text>
        {!this.state.running && (
          <TouchableOpacity
            onPress={this.reset}
            style={styles.fullscreenButton}>
            <View style={styles.fullscreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <Text style={styles.gameOverSubText}>Try Again</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'FB',
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'FB',
  },
  fullscreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    fontFamily: 'FB',
  },
});
