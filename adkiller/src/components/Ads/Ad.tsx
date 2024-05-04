import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./Ad.css";


export type tAd = {
  strImg: string,
  strLink: string,
  numCloseX: number,
  numCloseY: number,
  strClass: string,
}

const Ad: React.FC<tAd> = (props) => {
  // 画面に表示するかのフラグ．
  const [isShow, setIsShow] = useState<boolean>(true);

  return (
    <>
      {/* 表示フラグが立っているときのみ表示 */}
      {isShow &&
        (
          <Box className={props.strClass} display="flex" justifyContent="center" alignItems="center" position="relative">
            {/* 広告描画 */}
            <img
              src={props.strImg}
              alt="Your Image"
              onClick={() => { window.open(props.strLink, '_blank'); }}
              style={{ maxWidth: '100%', maxHeight: '100%' }} />

            {/* 閉じるアイコン */}
            <IconButton
              aria-label="Close"
              onClick={() => { setIsShow(false) }}
              sx={{
                position: 'absolute',
                top: `${props.numCloseY}%`,
                left: `${props.numCloseX}%`,
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
        )}
    </>
  );
};

export default Ad;