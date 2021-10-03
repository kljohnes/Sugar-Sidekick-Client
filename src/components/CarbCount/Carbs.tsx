import React, { Component } from 'react'
import {TextField, Typography, Card, Button, Grid} from "@material-ui/core"
import "./Carbs.css"


type AcceptedProps = {

}

type CarbState = {
    hits: Array<Object>
    searchTerm: string
    searchTerm2: string
    searchTerm3: string
    searchTerm4: string
    searchTerm5: string
    searchTerm6: string
    carbs: number 
    carbs2: number
    carbs3: number
    carbs4: number
    carbs5: number
    carbs6: number
    calories: string
    fat: string
    protein: string
    total: number
}


export default class Carbs extends Component<AcceptedProps, CarbState> {
    constructor(props: AcceptedProps){
        super(props)

        this.state = {
            hits: [],
            searchTerm: '',
            searchTerm2: '',
            searchTerm3: '',
            searchTerm4: '',
            searchTerm5: '',
            searchTerm6: '',
            calories: '',
            carbs2: 0,
            carbs: 0,
            carbs3: 0,
            carbs4: 0,
            carbs5: 0,
            carbs6: 0,
            fat: '',
            protein: '',
            total: 0
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
            carbs: json.totalNutrients.CHOCDF.quantity,
            // carbs: `${json.totalNutrients.CHOCDF.quantity} grams carbohydrates`,
            fat: `${json.totalNutrients.FAT.quantity} grams fat`,
            protein: `${json.totalNutrients.PROCNT.quantity} grams protein`
        })
    })
    .catch((error) => console.log(error))
}

fetchCarbCount2 = (event:any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm2}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            
            carbs2: json.totalNutrients.CHOCDF.quantity
     
        })
    })
    .catch((error) => console.log(error))
}

fetchCarbCount3 = (event:any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm3}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            
            carbs3: json.totalNutrients.CHOCDF.quantity
     
        })
    })
    .catch((error) => console.log(error))
}

fetchCarbCount4 = (event:any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm4}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            
            carbs4: json.totalNutrients.CHOCDF.quantity
     
        })
    })
    .catch((error) => console.log(error))
}

fetchCarbCount5 = (event:any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm5}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            
            carbs5: json.totalNutrients.CHOCDF.quantity
     
        })
    })
    .catch((error) => console.log(error))
}

fetchCarbCount6 = (event: any) => {
    fetch (`https://api.edamam.com/api/nutrition-data?app_id=f660cb54&app_key=5a687d3cbcb22f0ed537eec6d8f8a82a&nutrition-type=cooking&ingr=${this.state.searchTerm6}`)
    .then (res => res.json())
    .then (json => {
        console.log(json)
        console.log(json.totalNutrients.CHOCDF.quantity)
        this.setState({
            
            carbs6: json.totalNutrients.CHOCDF.quantity
     
        })
    })
    .catch((error) => console.log(error))
}

handleSearch1 = (e: any ) => { this.setState({
        searchTerm: e.target.value
    })}
    
handleSearch2 = (e: any ) => { this.setState({
        searchTerm2: e.target.value
    })}

handleSearch3 = (e: any ) => { this.setState({
        searchTerm3: e.target.value
    })}
handleSearch4 = (e: any ) => { this.setState({
        searchTerm4: e.target.value
    })}
handleSearch5 = (e: any ) => { this.setState({
        searchTerm5: e.target.value
    })}
handleSearch6 = (e: any ) => { this.setState({
        searchTerm6: e.target.value
    })}

handleAddition = (e: any) => { this.setState({
    total: this.state.carbs + this.state.carbs2 + this.state.carbs3 + this.state.carbs4 + this.state.carbs5 + this.state.carbs6
})}

// carbDisplay = (e: any) => {
//     return (
//     <div id="carb data">
//         <p>{this.state.carbs}</p>
//     </div>
//     )
// }



    render() {
        return (
            
                <div id="carbs">
                <Typography><h1>Carb Calculator</h1>
                <h5>Enter a food and a quantity to return the nutrition data.
                    Example: "1 cup strawberries" or "100 grams rice". Then, click the plus sign to get carbs for that entry. Use the button at the bottom to get the total!</h5>
                </Typography>
                <div id="carbTextfields">
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm"
                onChange={this.handleSearch1}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount(e)}
                }>+</Button>
                </div>
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm2"
                onChange={this.handleSearch2}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount2(e)}
                }>+</Button>
                </div>
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm3"
                onChange={this.handleSearch3}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount3(e)}
                }>+</Button>
                </div>
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm4"
                onChange={this.handleSearch4}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount4(e)}
                }>+</Button>
                </div>
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm5"
                onChange={this.handleSearch5}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount5(e)}
                }>+</Button>
                </div>
                <div>
                <TextField variant="outlined"
                label="Search for a food"
                name="searchTerm6"
                onChange={this.handleSearch6}
                ></TextField>
                <Button onClick={(e) => {
                    this.fetchCarbCount6(e)}
                }>+</Button>
                </div>
               </div>
               <div>
                    <p>{this.state.carbs}</p>
                    <p>{this.state.carbs2}</p>
                    <p>{this.state.carbs3}</p>
                    <p>{this.state.carbs4}</p>
                    <p>{this.state.carbs5}</p>
                    <p>{this.state.carbs6}</p>
                    <hr/>
                    <h1>{this.state.total.toFixed(2)}</h1>
                </div>

                <Button className="button" onClick ={(e) => {
                    this.handleAddition(e)
                    }}>Get Total</Button>
               </div>
            
        )
    }
}
