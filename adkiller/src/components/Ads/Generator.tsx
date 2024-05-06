import React, { useState, useEffect, useContext } from 'react';
import Ad, { tAd } from './Ad';
import { adContext, tBooleanSet2 } from '../../App';


// ADのランダム生成


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

// const lsStrImg = [
//   `${process.env.PUBLIC_URL}/neko.png`,
//   `${process.env.PUBLIC_URL}/logo512.png`,
//   `${process.env.PUBLIC_URL}/furya.png`,
// ];

// const lsStrLink = [
//   "https://flobal.jp/160.html",
//   "https://mattsun-kun-portfolio.vercel.app/",
// ];

const lsNumClose = [
  0,
  100,
];



const lsStrClass: string[] = [
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
  interval: number,
  listStartX: number[],
  listStartY: number[],
  strType: string,
}

// 広告生成
const Generator: React.FC<tGenerator> = (props) => {


  const lsAd = (strType: string): string[][] => {
    switch (strType) {
      case "ad":
        return [
          [`${process.env.PUBLIC_URL}/${strType}/YP.jpg`, "https://m.youtube.com/premium?gl=JP&hl=ja"],
          [`${process.env.PUBLIC_URL}/${strType}/hero.jpg`, "https://www.hero-wars.com/?hl=ja"],
          [`${process.env.PUBLIC_URL}/${strType}/eyes.png`, "https://www.kose.co.jp/kose/"],
          [`${process.env.PUBLIC_URL}/${strType}/trap.png`, "https://www.nagoya-u.ac.jp/"],

        ]

        break;
      case "jack":
        return [

          [`${process.env.PUBLIC_URL}/${strType}/neko.png`, "https://ja.wikipedia.org/wiki/ネコ"],
          [`${process.env.PUBLIC_URL}/${strType}/rakutannrakuda.jpg`, "https://www.rakutan-rakuda.com/app/nagoya_u/"],
          [`${process.env.PUBLIC_URL}/${strType}/apple.jpeg`, "https://www.apple.com/jp/"],
          [`${process.env.PUBLIC_URL}/${strType}/maron.png`, "https://kisako-riku-portfolio.vercel.app/"],
          [`${process.env.PUBLIC_URL}/${strType}/kate.png`, "https://katesawada.github.io/"],
          [`${process.env.PUBLIC_URL}/${strType}/nako.png`, "https://nac-39.com/"],
          [`${process.env.PUBLIC_URL}/${strType}/enpitsu.png`, "https://vps.hbenpitsu.net/portfolio/"],
          [`${process.env.PUBLIC_URL}/${strType}/mattunnkun.png`, "https://mattsun-kun-portfolio.vercel.app/"],
          [`${process.env.PUBLIC_URL}/${strType}/jakkunn.png`, "https://jackun-blog.vercel.app/"]
          ,
        ]
        break;
      case "kikikan":

        return [
          [`${process.env.PUBLIC_URL}/${strType}/kikiniki.png`, "https://www.youtube.com/watch?v=0xUpkiYWFJI"],
          [`${process.env.PUBLIC_URL}/${strType}/eigokikikann.png`, "https://kuroma-akuto.com/?p=2622"]
        ]
        break;
      default:
        console.log("ない")
        console.log(strType)
        return [[]]
        break;
    }

  }
  // 広告を保持する配列．
  const [ads, setAds] = useState<tAd[]>([]);

  // インターバルごとに実行される場所．
  useEffect(() => {

    const interval = setInterval(() => {
      // 全消し
      if (props.nully) {
        setAds([]);
      }
      // 動作中
      if (props.running && !props.nully) {
        const adsRand = getRandomEle(lsAd(props.strType));
        // 新しい広告の生成
        const newAd: tAd = {
          strImg: adsRand?.[0] ?? "ERROR_IMG",
          strLink: adsRand?.[1] ?? "ERROR_LINK",
          numCloseX: getRandomEle(lsNumClose) ?? -1,
          numCloseY: getRandomEle(lsNumClose) ?? -1,
          strClass: getRandomEle(lsStrClass) ?? "ERROR_CLASS",
          numStartX: getRandomEle(props.listStartX) ?? -200,
          numStartY: getRandomEle(props.listStartY) ?? -200,
          index: ads.length,
        }


        // 生成した広告を登録する．
        setAds((ads) => [...ads, newAd]);
      }

    }, props.interval);

    return () => clearInterval(interval); // クリーンアップ
  }, [props.nully, props.running]);

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