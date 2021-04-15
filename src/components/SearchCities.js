import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Component} from 'react';
//import './SearchCities.css'
//import SearchBar from './SearchBar';

class SearchCities extends Component {
	constructor(props){
		super(props);
		this.state = {
			apiData: [],
			cityTitle: "",
			found: false

		}
	}

	handleInputChange = (event) => {
        this.setState({cityTitle: event.target.value});
    }

    handleSearchClick = async () => {
        let cityName = this.state.cityTitle;
        console.log("cityName before: " + cityName);
        cityName = cityName.toUpperCase();
        console.log(cityName);
        let linkToAPI = 'https://ctp-zip-api.herokuapp.com/city/'+ cityName;

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
            console.log(currData[0]);
            table.push(
                <h2>{this.state.cityTitle.toUpperCase()}</h2>
            )
            currData.map(zipcode => (
                table.push(
                    <tr key={currData.id}>
                        <td>{zipcode}</td>
                    </tr>
                )

            ))
            //console.log(State);
            //console.log({state});
            return table;
        }
    } 

	render() 
	{
		return (
		<div className = "wholeting">
			<div className = "search">
				<h1>Search Cities:</h1>
				<input type="text" value={this.state.cityTitle} onChange={this.handleInputChange} placeholder="Enter City"/>
                <button className="search-button" onClick={this.handleSearchClick}>Search</button>
			</div>

            <div className = "citydata">

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


export default SearchCities