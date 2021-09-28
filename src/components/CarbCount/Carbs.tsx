import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TextField, Typography, Card} from "@material-ui/core"


type AcceptedProps = {

}

type CarbState = {
    hits: Array<Object>
    searchTerm: string
    carbs: string
    calories: string
    fat: string
    protein: string
}


export default class Carbs extends Component<AcceptedProps, CarbState> {
    constructor(props: AcceptedProps){
        super(props)

        this.state = {
            hits: [],
            searchTerm: '',
            calories: '',
            carbs: '',
            fat: '',
            protein: ''
        }
    }

fetchCarbCount = (event:any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            calories: `${json.calories} calories`,
            carbs: `${json.totalNutrients.CHOCDF.quantity} grams carbohydrates`,
            fat: `${json.totalNutrients.FAT.quantity} grams fat`,
            protein: `${json.totalNutrients.PROCNT.quantity} grams protein`
        })
    })
    .catch((error) => console.log(error))

 
}

handleSearch = (e: any ) => { this.setState({
        searchTerm: e.target.value
    })}
    



    render() {
        return (
            <div>
                <div>
                <Typography><h1>Carb Search</h1>
                <h5>Enter a food and a quantity to return the nutrition data.
                    Example: "1 cup strawberries" or "100 grams rice"
                </h5>
                </Typography>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm"
                onChange={this.handleSearch}
                
                ></TextField>

                <button onClick ={(e) => this.fetchCarbCount(e)}>Get Carbs</button>
                </div>
                    <div id="carb-data">
                    <p>{this.state.calories}</p>
                    <p>{this.state.carbs}</p>
                    <p>{this.state.fat}</p>
                    <p>{this.state.protein}</p>
                    </div>
                  </div>
        )
    }
}
