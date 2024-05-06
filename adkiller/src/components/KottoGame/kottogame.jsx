import React, { useState, useEffect, useCallback, useContext } from "react";
import Generator from "../Ads/Generator";
import { Box, Button, Typography } from "@mui/material";
import { adContext } from "../../App";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const GAME_WIDTH = window.innerWidth * 0.8;
const GAME_HEIGHT = window.innerHeight * 0.8;

const PlayerSpeed_Key = 50;



const Game = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  const PLAYER_SIZE = Number(queryParams.get("meSize")) ?? 50;
  const OBSTACLE_SIZE = Number(queryParams.get("obSize")) ?? 50;
  const OBSTACLE_SPEED = Number(queryParams.get("obSpeed")) ?? 5;
  const OBSTACLE_SPAWN_RATE = Number(queryParams.get("obRate")) ?? 1000;
  const ArrowKeyOK = (Number(queryParams.get("arrow")) === 1);
  const PlayerSpeed_Mouse = Number(queryParams.get("meSpeed")) ?? 15;
  const AD_INTERVAL = Number(queryParams.get("adInterval")) ?? 1000;
  const GameClearTime = Number(queryParams.get("time")) ?? 10;
  const gameType = queryParams.get("type") ?? "UNAGI";

  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - PLAYER_SIZE);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameClear, setGameClear] = useState(false);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(Date.now());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 広告の初期値
  const [isAdRunning, setIsAdRunning] = useState(true);
  const [isAdNully, setisAdNully] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // 追加

  const startGame = () => {
    setPlayerX(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
    setPlayerY(GAME_HEIGHT - PLAYER_SIZE);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
    setTime(Date.now());
    setElapsedTime(0);
    setGameClear(false);
  };

  const getElapsedTime = () => {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - time) / 1000);
    if (!gameOver) {
      if (elapsedSeconds >= GameClearTime) {
        setGameClear(true); // ゲームクリア
        setisAdNully(true);
        setIsAdRunning(false);
      }

      //return Math.floor((currentTime - time) / 1000);
      return elapsedSeconds;
    } else {
      return elapsedTime; // ゲームが終了したら経過時間を固定
    }
  };

  useEffect(() => {
    console.log("gameClear:", gameClear);
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, gameClear]);







  const movePlayer = useCallback(
    (event) => {
      if (gameClear) return;

      if (!gameOver && ArrowKeyOK) {
        if (event.key === "ArrowLeft" && playerX > 0) {
          setPlayerX(playerX - PlayerSpeed_Key);
        } else if (
          event.key === "ArrowRight" &&
          playerX < GAME_WIDTH - PLAYER_SIZE
        ) {
          setPlayerX(playerX + PlayerSpeed_Key);
        } else if (event.key === "ArrowUp" && playerY > 0) {
          setPlayerY(playerY - PlayerSpeed_Key);
        } else if (
          event.key === "ArrowDown" &&
          playerY < GAME_HEIGHT - PLAYER_SIZE
        ) {
          setPlayerY(playerY + PlayerSpeed_Key);
        }
      }
    },
    [playerX, playerY, gameOver]
  );

  const handleClick = (event) => {
    if (gameClear) return;

    if (!gameOver) {
      const isLeftClick = event.clientX < window.innerWidth / 2;
      const moveDistance = OBSTACLE_SPEED * PlayerSpeed_Mouse;
      let newPlayerX;
      if (isLeftClick) {
        newPlayerX = Math.max(0, playerX - moveDistance);
      } else {
        newPlayerX = Math.min(GAME_WIDTH - PLAYER_SIZE, playerX + moveDistance);
      }
      setPlayerX(newPlayerX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = event.target.getBoundingClientRect();
      setMousePosition({
        x: event.clientX / 2 - rect.left / 2,
        y: event.clientY / 2 - rect.top / 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("click", handleClick); // クリックイベントを追加
    return () => {
      window.removeEventListener("click", handleClick); // クリックイベントのリスナーを削除
    };
  }, [gameOver, playerX]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      movePlayer(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePlayer]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameClear) return;

      if (!gameOver) {
        // 障害物の位置を更新
        setObstacles((prevObstacles) =>
          prevObstacles.map((obstacle) => ({
            ...obstacle,
            y: obstacle.y + OBSTACLE_SPEED,
          }))
        );

        // 画面外の障害物を削除
        setObstacles((prevObstacles) =>
          prevObstacles.filter((obstacle) => obstacle.y < GAME_HEIGHT)
        );

        // 新しい障害物を生成

        if (Date.now() - time > OBSTACLE_SPAWN_RATE) {
          setObstacles((prevObstacles) => [
            ...prevObstacles,
            {
              x: Math.random() * (GAME_WIDTH - OBSTACLE_SIZE),
              y: -OBSTACLE_SIZE,
            },
          ]);
          setTime(Date.now());
        }

        // 衝突検出
        const playerRect = {
          x: playerX,
          y: playerY,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
        };

        const collision = obstacles.some((obstacle) => {
          const obstacleRect = {
            x: obstacle.x,
            y: obstacle.y,
            width: OBSTACLE_SIZE,
            height: OBSTACLE_SIZE,
          };

          return (
            playerRect.x < obstacleRect.x + obstacleRect.width &&
            playerRect.x + playerRect.width > obstacleRect.x &&
            playerRect.y < obstacleRect.y + obstacleRect.height &&
            playerRect.y + playerRect.height > obstacleRect.y
          );
        });

        if (collision) {
          setGameOver(true);
          setisAdNully(!isAdNully);
        } else {
          setScore(score + 1);
        }
      }
    }, 20);

    return () => clearInterval(gameLoop);
  }, [obstacles, playerX, playerY, gameOver, score]);

  return (
    <>

      <img

        src={`${process.env.PUBLIC_URL}/main/${gameType}/back.png`} style={{
          zIndex: -99999999,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: GAME_HEIGHT,
          width: GAME_WIDTH,
          position: "absolute",
          left: window.innerWidth * 0.1,
        }} />
      <Box>
        <Typography
          color="white"
        >
          任意のタイトル
        </Typography>


        {!(gameOver || gameClear) ? <Typography
          color="white"
        >
          Elapsed Time: {elapsedTime} second
          <br />
          Time Left: {GameClearTime - elapsedTime} seconds
        </Typography> :
          <Button component={Link} to="/" >
            ホームへ
          </Button>}

        {gameOver && <Typography color="white">Game Over</Typography>}
        {gameClear && <Typography color="white">Game Clear</Typography>}
      </Box>
      <Generator
        running={isAdRunning}
        nully={isAdNully}
        interval={AD_INTERVAL}
        listStartX={[
          -0.3,
          -0.15,
          0,
          0.15,
          0.3
        ]}
        listStartY={[
          0,
          0.25,
          0.5,
          0.75,
          1,
        ]}
        strType={gameType}
      />

      <div style={{
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        zIndex: -99999
      }}>



        {/* 縦の黒線 */}
        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            // left: window.innerWidth * 0.5,
            // borderLeft: "1px solid black",
          }}
        />
        <div
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            // border: "1px solid black",
            position: "relative",
          }}
        >
          {/* <div
            style={{
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              backgroundColor: "blue",
              position: "absolute",
              left: playerX,
              bottom: playerY,
            }}
          /> */}
          <img
            // key={index}
            src={`${process.env.PUBLIC_URL}/main/${gameType}/me.png`} // 画像のパスを指定
            style={{
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              position: "absolute",
              left: playerX,
              bottom: playerY,
            }}
            alt="Me" // 代替テキスト
          />

          {obstacles.map((obstacle, index) => (
            // <div
            //   key={index}
            //   style={{
            //     width: OBSTACLE_SIZE,
            //     height: OBSTACLE_SIZE,
            //     backgroundColor: "red",
            //     position: "absolute",
            //     left: obstacle.x,
            //     bottom: obstacle.y,
            //   }}
            // />
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/main/${gameType}/op.png`} // 画像のパスを指定
              style={{
                width: OBSTACLE_SIZE,
                height: OBSTACLE_SIZE,
                position: "absolute",
                left: obstacle.x,
                bottom: obstacle.y,
              }}
              alt="Obstacle" // 代替テキスト
            />
          ))}
        </div>
      </div>


    </>
  );


};



export default Game;


