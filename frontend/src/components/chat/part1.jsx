import React from 'react'
import Header from './Header';
import Messages from './Messages';
import DataFetcher from './DataFetcher';
export default function Part1(props){
return(
    <div id="part1">
        <Header />
        <DataFetcher tableName={props.tableName}/>
        <Messages />
      </div>
);
}