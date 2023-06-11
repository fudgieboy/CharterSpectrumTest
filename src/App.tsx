import { useState, useRef } from 'react'
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
  const [searchVal, setSearchVal] = useState("");  
  
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

  const updateOption = (ev, genre:string) => {
    if(ev.target.checked){
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const newSelectedToppings = selectedGenres.filter((item) => item !== genre);
      setSelectedGenres(newSelectedToppings);
    }
  };

  const getGenreCheckboxes = (): ReactElement[]=> {
    const constructedGenreCheckboxes = [];
    for(const i in genres.current){
      constructedGenreCheckboxes.push(
        <div key = {"checkBox" + i}  className = {genres.current[i] + " " + "checkBox"}><input  key={i} type = "checkbox" onChange={(ev)=>{updateOption(ev, genres.current[i]);}}/><li>{genres.current[i]}</li></div>
      );
    }
    return constructedGenreCheckboxes;
  };

  // console.log(data)
  return (
    <>
      <div id = "outerFilterContainer" className = "container">
        <input type="text" placeholder="Search" onChange = {(ev)=>{setSearchVal(ev.target.value)}}/>
        <div id = "checkboxContainer" className = "container">
          {getGenreCheckboxes()}
        </div>
      </div>
      <div id = "movieList">
        {data.current.map((subData)=>{ 
          if(subData.title.toLowerCase().indexOf(searchVal.toLowerCase()) == -1){
            return;
          }

          for(let i = 0; i < selectedGenres.length; i++){
            if(subData.genres.indexOf(selectedGenres[i]) == -1){
              return;
            }
          }

          return <div className = "movieCard">
            <img src = {"../public/moviePosterImages/" + subData.id + ".jpeg" }  alt = {}></img>
            <div className = "movieInfo">
              <h1>{subData.title}</h1>
              {/* <h2>Rating: {subData.vote_average}</h2>
              <h2>Release Date: {subData.release_date}</h2> */}
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
