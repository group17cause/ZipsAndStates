import logo from './logo.svg';
import React, {Component} from 'react';
import SearchZips from './components/SearchZips.js'
//import SearchApi from './components/SearchApi.js'
import SearchCities from './components/SearchCities.js'
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import RouterHome from './components/RouterHome.js'
import './App.css';

function App () {
  return (
  	<div>
  		<SearchZips/>

  		<SearchCities/>
  	</div>
  );
}

export default App;
