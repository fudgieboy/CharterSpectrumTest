import axios from 'axios';

export const getAllMovies = async (callback) => {

  const res = await fetch("https://code-challenge.spectrumtoolbox.com/api/movies", {
    headers: {
      Authorization: "Api-Key q3MNxtfep8Gt",
    },
  }).then((resData)=>{
    if(resData.status === 200){
      const reader = resData.body.getReader();
      reader.read().then((res)=>{
        const s = String.fromCharCode.apply(null, res.value);
          const decoded = JSON.parse(s);
          callback(decoded.data);
      });
    }
  })
}
export const getMovieData = async(movieID, callback) => {
    const res = await fetch("https://code-challenge.spectrumtoolbox.com/api/movies/" + movieID, {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    }).then((resData)=>{
      if(resData.status === 200){
        const reader = resData.body.getReader();
        reader.read().then((res)=>{
          const s = String.fromCharCode.apply(null, res.value);
            const decoded = JSON.parse(s);
            callback(decoded.data);
        });
      }
    })
}