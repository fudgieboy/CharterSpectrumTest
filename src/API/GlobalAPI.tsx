import React from 'react'
import ReactDOM from 'react-dom/client'

const getVideoData = () => {
  fetch("https://code-challenge.spectrumtoolbox.com/api/movies", {
    headers: {
      Authorization: "Api-Key q3MNxtfep8Gt",
    },
  }).then((res)=>{
    console.log("res");
    console.log(res);
  });
}

export default {
  getVideoData
} 