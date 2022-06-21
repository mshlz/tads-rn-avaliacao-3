
import React, { useRef, useState } from "react"
import { Dimensions, Image, Text, View } from "react-native"
import { GameEngine } from "react-native-game-engine"
import { Button } from "../../components/Button"

const Score = ({ score }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0
    }}
  >
    <Text style={{ fontSize: 40, textAlign: 'center', color: "#000" }}>{score}</Text>
  </View>
)

const Bird = ({ position, size }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: "",
      position: "absolute",
      left: position[0],
      top: position[1],
    }}
  >
    <Image source={require('./bird.png')} style={{ width: size, height: size }} />

  </View>
)

const Background = ({ width, height, position }) => {
  const x1 = position[0] % 900;

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: "purple",
        zIndex: -1
      }}
    >
      <Image source={require('./background.png')} style={{
        height: '100%', position: "absolute",
        left: -x1,
        top: 0,
      }} />
      <Image source={require('./background.png')} style={{
        height: '100%', position: "absolute",
        left: -x1 + 900,
        top: 0,
      }} />

    </View>
  )
}

type Config = {
  width: number
  height: number
  gravity: number
  jumpForce: number
  minAcc: number
}

export function MateusScreen() {
  const engine = useRef(null)
  const [isRunning, setIsRunning] = useState(true)

  const config: Config = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    gravity: 1.5,
    jumpForce: 50,
    minAcc: -15
  }

  const reset = () => {
    engine.current.swap({
      background: {
        width: config.width,
        height: config.height,
        position: [0],
        xspeed: 5,
        renderer: Background
      },
      score: {
        score: 0,
        renderer: Score
      },
      bird: {
        position: [50, 0],
        size: 50,
        yspeed: 9,
        yacc: 1,
        renderer: Bird,
      }
    })
    setIsRunning(true)
  }

  const onEvent = event => {
    switch (event) {
      case "GAME_OVER":
        alert("Game over!")
        setIsRunning(false)
        break
    }
  }

  const gameLoop = (entities, { events, dispatch, touches, time }) => {
    const bg = entities.background
    bg.position[0] += bg.xspeed;
    const bird = entities.bird;

    bird.yacc = bird.yacc + config.gravity

    if (bird.position[1] + bird.yacc >= config.height - bird.size) {
      dispatch('GAME_OVER')
    } else {
      bird.position[1] += bird.yacc
    }

    if (bg.position[0] % 100 == 0) {
      entities.score.score++
    }

    for (const touch of touches) {
      if (touch.type == 'press') {
        bird.yacc -= config.jumpForce;
        bird.yacc = Math.max(config.minAcc, bird.yacc)
      }
    }

    return entities
  }

  return (
    <>
      <GameEngine
        ref={engine}
        style={{
          // marginTop: 50,
          width: config.width,
          height: config.height,
          flex: null,
          backgroundColor: "#f00",
        }}
        entities={{
          background: {
            width: config.width,
            height: config.height,
            position: [0],
            xspeed: 5,
            renderer: Background
          },
          score: {
            score: 0,
            renderer: Score
          },
          bird: {
            position: [50, 0],
            size: 50,
            yspeed: 9,
            yacc: 1,
            renderer: Bird,
          }
        }}
        systems={[gameLoop]}
        running={isRunning}
        onEvent={onEvent}
      />
      {!isRunning && <Button style={{ position: 'absolute', bottom: 40 }} onPress={reset} text="Restart" />}
    </>
  )
}