// import React, { useState, useEffect, useCallback } from "react";

// const GAME_WIDTH = 800;
// const GAME_HEIGHT = 600;
// const PLAYER_SIZE = 50;
// const OBSTACLE_SIZE = 50;
// const OBSTACLE_SPEED = 5;

// const KottoGame = () => {
//   const [playerX, setPlayerX] = useState(0);
//   const [playerY, setPlayerY] = useState(0);
//   const [obstacleX, setObstacleX] = useState(
//     Math.random() * (GAME_WIDTH - OBSTACLE_SIZE)
//   );
//   const [obstacleY, setObstacleY] = useState(GAME_HEIGHT);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);

//   const startGame = () => {
//     setPlayerX(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
//     setPlayerY(0);
//     setObstacleX(Math.random() * (GAME_WIDTH - OBSTACLE_SIZE));
//     setObstacleY(GAME_HEIGHT);
//     setGameOver(false);
//     setScore(0);
//   };

//   const movePlayer = useCallback(
//     (event) => {
//       if (!gameOver) {
//         if (event.key === "ArrowLeft" && playerX > 0) {
//           setPlayerX(playerX - 50);
//         } else if (
//           event.key === "ArrowRight" &&
//           playerX < GAME_WIDTH - PLAYER_SIZE
//         ) {
//           setPlayerX(playerX + 50);
//         }
//         // else if (
//         //   event.key === "ArrowUp" &&
//         //   playerY < GAME_HEIGHT - PLAYER_SIZE
//         // ) {
//         //   setPlayerY(playerY + 50);
//         // } else if (event.key === "ArrowDown" && playerY >= 0) {
//         //   setPlayerY(playerY - 50);
//         // }
//       }
//     },
//     [playerX, gameOver]
//   );

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       movePlayer(event);
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [movePlayer]);

//   useEffect(() => {
//     const gameLoop = setInterval(() => {
//       if (!gameOver) {
//         setObstacleX(obstacleX - OBSTACLE_SPEED);

//         if (obstacleX < -OBSTACLE_SIZE) {
//           setObstacleX(GAME_WIDTH);
//           setScore(score + 1);
//         }

//         if (obstacleY === playerY) {
//           if (obstacleX > playerX && obstacleX < playerX + PLAYER_SIZE) {
//             setGameOver(true);
//           }
//         }
//       }
//     }, 20);

//     return () => clearInterval(gameLoop);
//   }, [obstacleX, playerX, gameOver, score]);

//   return (
//     <div>
//       <h1>Obstacle Avoider</h1>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <div
//           style={{
//             width: GAME_WIDTH,
//             height: GAME_HEIGHT,
//             border: "1px solid black",
//             position: "relative",
//           }}
//         >
//           <div
//             style={{
//               width: PLAYER_SIZE,
//               height: PLAYER_SIZE,
//               backgroundColor: "blue",
//               position: "absolute",
//               left: playerX,
//               bottom: playerY,
//             }}
//           />
//           <div
//             style={{
//               width: OBSTACLE_SIZE,
//               height: OBSTACLE_SIZE,
//               backgroundColor: "red",
//               position: "absolute",
//               left: obstacleX,
//               bottom: obstacleY,
//             }}
//           />
//         </div>
//       </div>
//       <p>Score: {score}</p>
//       {gameOver && <p>Game Over</p>}
//       <button onClick={startGame}>Start Game</button>
//     </div>
//   );
// };

// export default KottoGame;

import React, { useState, useEffect, useCallback } from "react";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 50;
const OBSTACLE_SIZE = 50;
const OBSTACLE_SPEED = 5;
const OBSTACLE_SPAWN_RATE = 1000; // 障害物の出現間隔(ミリ秒)

const Game = () => {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - PLAYER_SIZE);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(Date.now());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const startGame = () => {
    setPlayerX(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
    setPlayerY(GAME_HEIGHT - PLAYER_SIZE);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
  };

  const movePlayer = useCallback(
    (event) => {
      if (!gameOver) {
        if (event.key === "ArrowLeft" && playerX > 0) {
          setPlayerX(playerX - 50);
        } else if (
          event.key === "ArrowRight" &&
          playerX < GAME_WIDTH - PLAYER_SIZE
        ) {
          setPlayerX(playerX + 50);
        } else if (event.key === "ArrowUp" && playerY > 0) {
          setPlayerY(playerY - 50);
        } else if (
          event.key === "ArrowDown" &&
          playerY < GAME_HEIGHT - PLAYER_SIZE
        ) {
          setPlayerY(playerY + 50);
        }
      }
    },
    [playerX, playerY, gameOver]
  );

  const handleClick = (event) => {
    if (!gameOver) {
      const isLeftClick = event.clientX < window.innerWidth / 2;
      const moveDistance = OBSTACLE_SPEED * 15;
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

        console.log(time - Date.now());
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
        } else {
          setScore(score + 1);
        }
      }
    }, 20);

    return () => clearInterval(gameLoop);
  }, [obstacles, playerX, playerY, gameOver, score]);

  return (
    <div>
      <h1>あかい四角をよけろ！</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            border: "1px solid black",
            position: "relative",
          }}
        >
          <div
            style={{
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              backgroundColor: "blue",
              position: "absolute",
              left: playerX,
              bottom: playerY,
            }}
          />
          {obstacles.map((obstacle, index) => (
            <div
              key={index}
              style={{
                width: OBSTACLE_SIZE,
                height: OBSTACLE_SIZE,
                backgroundColor: "red",
                position: "absolute",
                left: obstacle.x,
                bottom: obstacle.y,
              }}
            />
          ))}
        </div>
      </div>
      <p>Score: {score}</p>
      {gameOver && <p>Game Over</p>}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Game;
