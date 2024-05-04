import { useState, useEffect, useCallback } from 'react';

const OBSTACLE_WIDTH = 20;
const PLAYER_WIDTH = 20;
const OBSTACLE_SPEED = 1;
const JUMP_DURATION = 500; // ジャンプの継続時間 (ms)
const JUMP_HEIGHT = 100; // ジャンプの高さ (px)
const GROUND_POSITION = 0;

const useGame = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState(window.innerWidth);
  const [playerPosition, setPlayerPosition] = useState(GROUND_POSITION);
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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

export default useGame;