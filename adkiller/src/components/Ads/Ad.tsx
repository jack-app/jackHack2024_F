import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./Ad.css";

const SIZE = 100

export type tAd = {
  strImg: string,
  strLink: string,
  numCloseX: number,
  numCloseY: number,
  strClass: string,
  numStartX:number,
  numStartY:number, 
}

const Ad: React.FC<tAd> = (props) => {
  // 画面に表示するかのフラグ．
  const [isShow, setIsShow] = useState<boolean>(true);

  return (
    <>
      {/* 表示フラグが立っているときのみ表示 */}
      {isShow &&
        (
          <Box className={`${props.strClass}`} display="flex" justifyContent="center" alignItems="center" position="relative"
            sx={{
              top: window.innerHeight*props.numStartY,
              left: window.innerWidth*props.numStartX
            }}
          >
            {/* 広告描画 */}
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
              }}
            >

              <img
                src={props.strImg}
                onClick={() => { window.open(props.strLink, '_blank'); }}
                style={{
                  maxWidth: `${SIZE}px`,
                  maxHeight: `${SIZE}px`
                }} />
            </Box>

            {/* 閉じるアイコン */}
            <Box
              sx={{
                position: 'absolute',
                zIndex: -1
                // top: `${-SIZE}px`,
              }}
            >

              <IconButton
                aria-label="Close"
                onClick={() => { setIsShow(false) }}
                sx={{
                  // position: 'absolute',
                  top: `${props.numCloseY - SIZE / 2}px`,
                  left: `${props.numCloseX - SIZE / 2}px`,
                  // top: `${SIZE}px`,
                  // left: `${SIZE}px`,
                  // top: "0px",
                  // left: "0px",
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

          </Box>
        )}
    </>
  );
};

export default Ad;