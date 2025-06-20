import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import GestureObject from '../components/GestureObject';
import { useNavigation } from '@react-navigation/native';

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [taskProgress, setTaskProgress] = useState({
    taps: 0,
    doubleTaps: 0,
    longPress: false,
    pan: false,
    flingRight: false,
    flingLeft: false,
    pinch: false,
    reached100: false,
  });

  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const doubleTapRef = useRef();
  const longPressRef = useRef();

  const updateScore = (amount) => {
    const newScore = score + amount;
    setScore(newScore);

    setTaskProgress((prev) => ({
      ...prev,
      reached100: newScore >= 100 || prev.reached100,
    }));
  };

  const updateProgress = (type) => {
    setTaskProgress((prev) => {
      const updated = { ...prev };
      if (type === 'tap') updated.taps += 1;
      else if (type === 'doubleTap') updated.doubleTaps += 1;
      else updated[type] = true;
      return updated;
    });
  };

  const navigation = useNavigation();

  // 👇 GESTURE EVENTS без useNativeDriver
  const panGesture = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const pinchGesture = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Очки: {score}</Text>
      <Button title="Перейти до завдань" onPress={() => navigation.navigate('Tasks', { progress: taskProgress })} />

      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            updateScore(Math.floor(Math.random() * 10) + 1);
            updateProgress('flingRight');
          }
        }}
      >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              updateScore(Math.floor(Math.random() * 10) + 1);
              updateProgress('flingLeft');
            }
          }}
        >
          <PinchGestureHandler
            onGestureEvent={pinchGesture}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                updateScore(15);
                updateProgress('pinch');
              }
            }}
          >
            <PanGestureHandler
              onGestureEvent={panGesture}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                  updateProgress('pan');
                }
              }}
            >
              <LongPressGestureHandler
                ref={longPressRef}
                minDurationMs={3000}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) {
                    updateScore(20);
                    updateProgress('longPress');
                  }
                }}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                      updateScore(10);
                      updateProgress('doubleTap');
                    }
                  }}
                >
                  <TapGestureHandler
                    waitFor={doubleTapRef}
                    onHandlerStateChange={({ nativeEvent }) => {
                      if (nativeEvent.state === State.ACTIVE) {
                        updateScore(5);
                        updateProgress('tap');
                      }
                    }}
                  >
                    <Animated.View
                      style={[
                        styles.box,
                        {
                          transform: [
                            { translateX: pan.x },
                            { translateY: pan.y },
                            { scale },
                          ],
                        },
                      ]}
                    >
                      <GestureObject />
                    </Animated.View>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </PanGestureHandler>
          </PinchGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#4A90E2',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
