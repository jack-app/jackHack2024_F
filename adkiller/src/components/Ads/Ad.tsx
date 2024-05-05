import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./Ad.css";

const SIZE = 100

const SURGERY_INDEX = 10000;

export type tAd = {
  strImg: string,
  strLink: string,
  numCloseX: number,
  numCloseY: number,
  strClass: string,
  numStartX: number,
  numStartY: number,
  index: number,
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
              top: window.innerHeight * props.numStartY,
              left: window.innerWidth * props.numStartX
            }}
          >
            {/* 広告描画 */}
            <Box
              sx={{
                position: 'absolute',
                zIndex: props.index + 2 * SURGERY_INDEX,
              }}
            >

              <img
                src={props.strImg}
                onClick={() => { window.open(props.strLink, '_blank'); }}
                style={{
                  maxWidth: `${SIZE}px`,
                  maxHeight: `${SIZE}px`,

                }} />
            </Box>

            {/* 閉じるアイコン */}
            <Box
              sx={{

                position: 'absolute',
                zIndex: props.index + SURGERY_INDEX,

              }}
            >

              <IconButton
                aria-label="Close"
                onClick={() => {
                  console.log("close")
                  setIsShow(false)
                }}
                sx={{
                  top: `${props.numCloseY - SIZE / 2}px`,
                  left: `${props.numCloseX - SIZE / 2}px`,

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