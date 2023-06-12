import {ReactElement} from 'react'
import './global.scss'

interface SearchP{
  updateSearchText: (searchString:string) => void;
  currentSearchText: string;
}
export const Searchbox:React.FC = (props:SearchP) : ReactElement => {
  return (  
    <input type="text" value = {props.currentSearchText} placeholder="Search" onChange = {(ev)=>{props.updateSearchText(ev.target.value)}}/>
  )
}