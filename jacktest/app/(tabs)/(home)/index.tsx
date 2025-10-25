import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';

// One-file React Native / Expo game
// Description: "Tap the Target" — a simple reflex game implemented in a single file.
// How to use: Paste this file as App.tsx in an Expo project (or import & render the default export).

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Index() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // seconds
  const [running, setRunning] = useState(false);
  const [targetSize, setTargetSize] = useState(80);

  // Target position
  const pos = useRef(new Animated.ValueXY({ x: SCREEN_W / 2 - 40, y: SCREEN_H / 2 - 40 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Speed / difficulty
  const [intervalMs, setIntervalMs] = useState(1000);

  useEffect(() => {
    let timer = null;
    if (running) {
      timer = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            stopGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => timer && clearInterval(timer);
  }, [running]);

  useEffect(() => {
    // Speed up a bit as time goes on
    if (running) {
      const id = setInterval(() => { moveTarget(); intervalMs });
      return () => clearInterval(id);
    }
  }, [running, intervalMs]);

  // Because TypeScript/JS forbids bare function call in setInterval creation above, rewrite properly

  useEffect(() => {
    let mover = null;
    if (running) {
      mover = setInterval(() => {
        moveTarget();
      }, intervalMs);
    }
    return () => mover && clearInterval(mover);
  }, [running, intervalMs]);

  function moveTarget() {
    const maxX = SCREEN_W - targetSize - 20;
    const maxY = SCREEN_H - targetSize - 200; // leave room for HUD
    const x = rand(10, Math.max(10, maxX));
    const y = rand(120, Math.max(120, maxY));

    Animated.parallel([
      Animated.timing(pos, {
        toValue: { x, y },
        duration: Math.max(150, intervalMs - 200),
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.25, duration: 120, useNativeDriver: false }),
        Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: false }),
      ]),
    ]).start();
  }

  function startGame() {
    setScore(0);
    setTimeLeft(30);
    setIntervalMs(1000);
    setRunning(true);
    // position randomly at start
    const x = rand(10, SCREEN_W - targetSize - 10);
    const y = rand(120, SCREEN_H - targetSize - 150);
    pos.setValue({ x, y });
  }

  function stopGame() {
    setRunning(false);
    if (score > best) setBest(score);
  }

  function onHit() {
    if (!running) return;
    setScore((s) => s + 1);
    // make the game harder: shrink target slightly and speed up
    setTargetSize((sz) => Math.max(40, sz - 2));
    setIntervalMs((ms) => Math.max(300, Math.floor(ms * 0.95)));
    // small pop animation
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.6, duration: 80, useNativeDriver: false }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: false }),
    ]).start();
    moveTarget();
  }

  // quick restart button
  function quickRestart() {
    stopGame();
    setTimeout(() => startGame(), 200);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hud}>
        <View style={styles.hudRow}>
          <Text style={styles.hudText}>Score: {score}</Text>
          <Text style={styles.hudText}>Best: {best}</Text>
        </View>
        <View style={styles.hudRow}>
          <Text style={styles.hudText}>Time: {timeLeft}s</Text>
          <Text style={styles.hudText}>Speed: {(1000 / intervalMs).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.playArea} pointerEvents="box-none">
        {/* Animated target */}
        <Animated.View
          style={[
            styles.targetWrapper,
            {
              width: targetSize,
              height: targetSize,
              transform: [...(pos as any).getTranslateTransform() , { scale }],
            },
          ]}
        >
          <Pressable
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            style={({ pressed }) => [styles.target, pressed && { opacity: 0.7 }]}
            onPress={onHit}
          >
            <Text style={styles.targetText}>Tap</Text>
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.controls}>
        {!running ? (
          <Pressable style={styles.bigButton} onPress={startGame}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.bigButton, styles.stopButton]} onPress={stopGame}>
            <Text style={styles.buttonText}>Stop</Text>
          </Pressable>
        )}

        <View style={styles.rowButtons}>
          <Pressable style={styles.smallButton} onPress={quickRestart}>
            <Text style={styles.smallText}>Restart</Text>
          </Pressable>

          <Pressable
            style={styles.smallButton}
            onPress={() => {
              setScore(0);
              setBest(0);
              setTargetSize(80);
              setIntervalMs(1000);
              setTimeLeft(30);
              setRunning(false);
            }}
          >
            <Text style={styles.smallText}>Reset</Text>
          </Pressable>
        </View>

        <Text style={styles.tiny}>Tip: Tap the target as fast as you can. It gets smaller and faster!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  hud: {
    paddingTop: 8,
    paddingHorizontal: 14,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  hudRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  hudText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  playArea: {
    flex: 1,
  },
  targetWrapper: {
    position: 'absolute',
    // left & top are controlled via Animated.ValueXY
  },
  target: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: '#ff5c7c',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#ff5c7c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  targetText: {
    color: 'white',
    fontWeight: '800',
  },
  controls: {
    padding: 14,
    alignItems: 'center',
  },
  bigButton: {
    backgroundColor: '#3ee0c1',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 999,
    marginBottom: 8,
  },
  stopButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    fontWeight: '800',
    color: '#042018',
    fontSize: 18,
  },
  rowButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  smallButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  smallText: {
    color: 'white',
    fontWeight: '700',
  },
  tiny: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    fontSize: 12,
  },
});
