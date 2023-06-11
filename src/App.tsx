import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {getVideoData} from './API/GlobalAPI'
import {ReactElement} from 'react'
import './App.scss'
import testData from "./API/testData.ts"
import testData2 from "./API/testData2.ts"

const App:React.FC = () : ReactElement => {
  const data = useRef(testData);
  const data2 = useRef(testData2);
  const genres = useRef(null); 
  let [selectedGenres, setSelectedGenres] = useState([]);

  let sum = data.current.map((subData)=>{
    return subData.genres;
  })

  sum = sum.reduce((genre1, genre2)=>{
    let cat = genre1.concat(genre2.filter((genre)=>{
      return genre1.indexOf(genre) == -1;
    }));
    return cat;

  })

  genres.current = sum

  const updateOption = (ev, genre) => {
    if(ev.target.checked){
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const newSelectedToppings = selectedGenres.filter((item) => item !== genre);
      setSelectedGenres(newSelectedToppings);
    }
  };

  const getGenreCheckboxes = () => {
    const constructedGenreCheckboxes = [];
    for(const i in genres.current){
      constructedGenreCheckboxes.push(
        <div key = {i}  className = {genres.current[i] + " " + "checkbox"}><input  key={i} type = "checkbox" onChange={(ev)=>{updateOption(ev, genres.current[i]);}}/><li>{genres.current[i]}</li></div>
      );
    }
    return constructedGenreCheckboxes;
  };

  
  return (
    <>
      <input type="text" placeholder="Search" />
      {getGenreCheckboxes()}
    </>
  )
}

export default App
