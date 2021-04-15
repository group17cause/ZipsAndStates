import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Component} from 'react';
import './SearchZips.css'
//import SearchBar from './SearchBar';

class SearchZips extends Component {
	constructor(props){
		super(props);
		this.state = {
			apiData: [],
			zipCode: "",
			found: false

		}
	}

	handleInputChange = (event) => {
        this.setState({zipCode: event.target.value});
    }

    handleSearchClick = async () => {
        let zipName = this.state.zipCode;
        let linkToAPI = 'http://ctp-zip-api.herokuapp.com/zip/'+ zipName;

        try {
            let response = await axios.get(linkToAPI);
            this.setState({apiData: response.data, found: true});
            console.log(this.state.apiData);
           // console.log(this.state.apiData);
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data); //Not Found
                console.log(error.response.status); //404
                this.setState({found: false});
            }
       
        }
    } 
    
	makeTable = () => 
    {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        //console.log("making table");
        let table = [];
        //found is false when we get 404 error
        if(!foundMatch)
        {
         //   console.log("not found");
            table.push(<tr key={-1}><td style={{alignItems:'center', justifyContent:'center'}}>No Results</td></tr>);
            return table;
        } 
        else 
        {
            let city = currData[0].City;
            let state = currData[0].State;
            let pop = currData[0].EstimatedPopulation;
            let location = currData[0].LocationText;
            table.push(
              <tr key={currData.id}>
                <h2>{location}</h2>
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Population: {pop}</p>
              </tr>
            );
            return table;
        }
    } 

	render() 
	{
		return (
		<div className = "wholeting">
			<div className = "search">
				<h1>Search Zip Codes:</h1>
				<input type="text" value={this.state.zipCode} onChange={this.handleInputChange} placeholder="Enter Zip Code"/>
                <button className="search-button" onClick={this.handleSearchClick}>Search</button>
			</div>

            <div className = "zipdata">

            </div>
			<div className = "tabletime">
	            <table id="data">
	                <tbody>
	                {this.makeTable()}
	                </tbody>
	            </table>
	        </div>
	    </div>    
		)
	}

}


export default SearchZips