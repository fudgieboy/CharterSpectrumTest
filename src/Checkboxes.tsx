import React, {ReactElement} from 'react'
import './global.scss'
import { v4 as uuidv4 } from "uuid"

interface OptionP{
  availableGenres: Array<string>;
  selectedGenres: Array<string>;
  updateOption: (ev: React.ChangeEvent, genre: string) => void;
}


export const Checkboxes:React.FC = (props:OptionP) : ReactElement => {

  const getGenreCheckboxes = (): ReactElement[]=> {
    const constructedGenreCheckboxes = [];
    for(const i in props.availableGenres){
      let checked = false;
      if(props.selectedGenres.indexOf(props.availableGenres[i]) == -1){
        checked = false;
      } else {
        checked = true;
      }
      
      constructedGenreCheckboxes.push(
        <div key = {uuidv4()} className = {props.availableGenres[i] + " " + "checkBox"}>
          <input  key={i} checked = {checked} type = "checkbox" onChange={(ev)=>{props.updateOption(ev, props.availableGenres[i]);}}/>
          <li>{props.availableGenres[i]}</li>
        </div>
      );
    }
    return constructedGenreCheckboxes;
  };

  return (  
    <div>
      {getGenreCheckboxes()}
    </div>
  )
}