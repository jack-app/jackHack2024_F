import React from 'react';
// import useGame from './useGame';
import { useState, useEffect, useCallback } from 'react';

const OBSTACLE_WIDTH = 20;
const PLAYER_WIDTH = 20;
const OBSTACLE_SPEED = 1;
const JUMP_DURATION = 500; // ジャンプの継続時間 (ms)
const JUMP_HEIGHT = 100; // ジャンプの高さ (px)
const GROUND_POSITION = 0;

type tMatter = {
  x: number,
  y: number,
  l: number,
}

const useGame = () => {
  // ゲームが開始しているかのフラグ
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // スコアを記録する
  const [score, setScore] = useState<number>(0);
  // 障害物の現在の位置
  const [obstaclePosition, setObstaclePosition] = useState<number>(window.innerWidth);
  // プレイヤーの場所
  const [playerPosition, setPlayerPosition] = useState<number>(GROUND_POSITION);
  // ジャンプ中かどうか
  const [isJumping, setIsJumping] = useState<boolean>(false);
  // ゲームオーバーフラグ
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startGame = useCallback(() => {
    setIsRunning(true);
    setGameOver(false);
    setObstaclePosition(window.innerWidth);
    setPlayerPosition(GROUND_POSITION);
    setScore(0);
  }, []);

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), JUMP_DURATION);
    }
  }, [isJumping, gameOver]);

  const updateGame = useCallback(() => {
    if (isRunning && !gameOver) {
      // 障害物の位置を更新
      setObstaclePosition((prev) => prev - OBSTACLE_SPEED);

      // 新しい障害物を生成
      if (obstaclePosition < -OBSTACLE_WIDTH) {
        setObstaclePosition(window.innerWidth);
      }

      // スコアを更新
      setScore((prev) => prev + 1);

      // プレイヤーの位置を更新 (ジャンプ中かどうかで分岐)
      setPlayerPosition((prev) => (isJumping ? prev : GROUND_POSITION));

      // 衝突検出
      if (
        obstaclePosition < playerPosition + PLAYER_WIDTH &&
        obstaclePosition + OBSTACLE_WIDTH > playerPosition &&
        !isJumping
      ) {
        setGameOver(true);
      }
    }
  }, [isRunning, obstaclePosition, isJumping, gameOver]);

  useEffect(() => {
    if (isRunning && !gameOver) {
      const gameInterval = setInterval(updateGame, 10);
      return () => clearInterval(gameInterval);
    }
  }, [isRunning, updateGame, gameOver]);

  return { isRunning, score, obstaclePosition, playerPosition, startGame, jump, gameOver };
};

// export default useGame;
const Game: React.FC = () => {
  const { isRunning, score, obstaclePosition, playerPosition, startGame, jump, gameOver } = useGame();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [jump]);

  return (
    <div>
      <button onClick={startGame} disabled={isRunning}>
        Start Game
      </button>
      {isRunning && (
        <div>
          <div>Score: {score}</div>
          <div style={{ position: 'relative', height: 200 }}>
            <div
              style={{
                position: 'absolute',
                left: obstaclePosition,
                backgroundColor: 'black',
                width: OBSTACLE_WIDTH,
                height: 20,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: playerPosition,
                bottom: 0,
                backgroundColor: 'red',
                width: PLAYER_WIDTH,
                height: 20,
              }}
            />
          </div>
          {gameOver && <div>Game Over</div>}
        </div>
      )}
    </div>
  );
};

export default Game;