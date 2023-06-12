import React, {ReactElement} from 'react'
import './global.scss'
import { v4 as uuidv4 } from "uuid"
import {getMovieData} from './API/GlobalAPI'

interface GalleryP{
  availableGenres: Array<string>;
  selectedGenres: Array<string>;
  searchVal: string;
  movies: [];
}

export const Gallery:React.FC = (props:GalleryP) : ReactElement => {

  const getMovieList = ():ReactElement[]=> {
    let count = 0;

    const movieList = props.movies.map((subData)=>{
      if(subData.title.toLowerCase().indexOf(props.searchVal.toLowerCase()) == -1){
        return <div key = {uuidv4()}></div>;
      }

      for(let i = 0; i < props.selectedGenres.length; i++){
        if(subData.genres.indexOf(props.selectedGenres[i]) == -1){
          return <div key = {uuidv4()}></div>;
        }
      }

      count = count+ 1;

      return <div key = {uuidv4()} className = "movieCard anim" onClick = {()=>{toggleModal(true)}}>
        <div className = "cardInnerContainer">
          <img id="posterImg" className = "anim" src = {"../moviePosterImages/" + subData.id + ".jpeg" } 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="../moviePosterImages/defaultImage.jpeg";
            }}
            alt = {subData.title + " poster"}></img>

          <div className = "movieInfo">
            <h1>{subData.title}</h1>
            {/* <h2>Rating: {subData.vote_average}</h2>
            <h2>Release Date: {subData.release_date}</h2> */}
          </div>
        </div>
      </div>
    })

    if(count == 0){
      return [<div className = "noResults"><h1>No Results</h1></div>]
    } else {
      return movieList;
    }
  }
  
  return (  
    <div id = "movieList">
      {getMovieList()}
    </div>
  )
}