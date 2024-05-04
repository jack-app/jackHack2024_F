import React, { useState, useEffect, useContext } from 'react';
import Ad, { tAd } from './Ad';
import { adContext, tBooleanSet2 } from '../../App';


// ADのランダム生成


// インターバルの指定
const AD_INTERVAL = 1000

// ランダムなものを返す．
function getRandomEle<T>(arr: T[]) {
  if (arr.length === 0) {
    return undefined; // 配列が空の場合、undefinedを返す
  }
  // ランダムなindexを取得する．
  const randomIndex = Math.floor(Math.random() * arr.length);
  // ランダムな要素を返す．
  return arr[randomIndex];
}

const lsStrImg = [
  `${process.env.PUBLIC_URL}/neko.png`,
  `${process.env.PUBLIC_URL}/logo512.png`,
  `${process.env.PUBLIC_URL}/furya.png`,
];

const lsStrLink = [
  "https://flobal.jp/160.html",
  "https://mattsun-kun-portfolio.vercel.app/",
];

const lsNumClose = [
  0,
  100,
];

const lsNumStartX = [
  -0.3,
  -0.15, 
  0, 
  0.15,
  0.3
]

const lsNumStartY = [
  0,
  0.25,
  0.5,
  0.75,
  1,
]

const lsStrClass = [
  "hiranan-chaos",
  "hiranan-dokidoki",
  "chahan-circle",
  "chahan-fade",
  "sinryoku-A",
  "hiranan-right",
  "hiranan-Y",
]

export type tGenerator = {
  nully: boolean,
  running: boolean,
}

// 広告生成
const Generator: React.FC<tGenerator> = (props) => {

  // 広告を保持する配列．
  const [ads, setAds] = useState<tAd[]>([]);
  // const { valNull, setValNull, valRun, setValRun } = (useContext(adContext) || {}) as tBooleanSet2;
  const { nully, running } = props
  // console.log(props)

  // インターバルごとに実行される場所．
  useEffect(() => {

    const interval = setInterval(() => {
      // 全消し
      if (nully) {
        setAds([]);
      }
      // 動作中
      if (running && !nully) {
        // 新しい広告の生成
        const newAd: tAd = {
          strImg: getRandomEle(lsStrImg) ?? "ERROR_IMG",
          strLink: getRandomEle(lsStrLink) ?? "ERROR_LINK",
          numCloseX: getRandomEle(lsNumClose) ?? -1,
          numCloseY: getRandomEle(lsNumClose) ?? -1,
          strClass: getRandomEle(lsStrClass) ?? "ERROR_CLASS",
          numStartX: getRandomEle(lsNumStartX)??-200, 
          numStartY: getRandomEle(lsNumStartY) ?? -200, 
        }


        // 生成した広告を登録する．
        setAds((ads) => [...ads, newAd]);
      }

    }, AD_INTERVAL);

    return () => clearInterval(interval); // クリーンアップ
  }, [nully, running]);

  return (
    <>
      {/* 広告描画 */}
      {ads.map((ad, ind) => (
        <Ad key={ind} {...ad} />
      ))}
    </>
  );
};

export default Generator;