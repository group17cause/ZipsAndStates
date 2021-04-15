import logo from './logo.svg';
import React, {Component} from 'react';
import SearchZips from './components/SearchZips.js'
import SearchCities from './components/SearchCities.js'

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
