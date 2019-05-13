import React from 'react';
import axios from 'axios';

export default class HomePage extends React.Component {
    state = {
        countries:[
           {id:'US',label:'United States'}, {id:'GB',label:'Great Britain'},{id:'FR',label:'France'},{id:'DE',label:'Germany'},{id:'ID',label:'Indonesia'}
        ],
        year:[2030,2029,2028,2027,2026,2025,2024,2023,2022,2021,2020,2019],
        holidayArr:[],
        cty:undefined,
        yr:undefined,
    }

    change = (event) => {
        this.setState({[event.target.name]:event.target.value})
        setTimeout(() => {
            if(this.state.cty  && this.state.yr){
                console.log(this.state.cty && this.state.yr)
                this.callApi(this.state.cty && this.state.yr)
            }
        });
    }

    componentDidMount(){
    }

    callApi = (cty,yr) => {
        axios.get(`https://holidayapi.pl/v1/holidays?country=${this.state.cty}&year=${this.state.yr}`)
        .then(res => {
            if(res && res.data && res.data.holidays ){
                let temp2 = {}
                Object.keys(res.data.holidays).forEach((item,index) => {
                    res.data.holidays[item].forEach( (itm) => {
                        console.log(temp2[`-${item.split('-')[1]}-`],"Object key -------",`-${item.split('-')[1]}-`)
                        console.log(itm,"nested")
                        if(temp2[`-${item.split('-')[1]}-`]){
                            temp2[`-${item.split('-')[1]}-`].push(itm)
                        }else{
                            temp2[`-${item.split('-')[1]}-`] = []
                            temp2[`-${item.split('-')[1]}-`].push(itm)
                        }
                        
                    } )

                })
                this.setState({holidayArr:temp2});
            }
        })
    }


    render(){
        return (
            <React.Fragment>
                <form>
                    <div>
                        <p>Select a country</p>
                        <select name="cty" onChange={this.change} value={this.state.cty}>
                            <option value="">Please select a country</option>
                        {
                            this.state.countries.map((item) => (
                                <React.Fragment>
                                    <option value={item.id}>{item.label}</option>
                                </React.Fragment>
                            ))
                        }
                        </select>
                    </div>
                    <div>
                        <p>Select a year</p>
                        <select name="yr" onChange={this.change} value={this.state.yr}>
                            <option value="">Please select year</option>
                        {
                            this.state.year.map((item) => (
                                <React.Fragment>
                                    <option value={item}>{item}</option>
                                </React.Fragment>
                            ))
                        }
                        </select>
                    </div>
                </form>
                {
                    this.state.holidayArr ? (
                        Object.keys(this.state.holidayArr).map((item,index) => (
                        <React.Fragment>
                            {
                                this.state.holidayArr[item].length ? (
                                    <h3 style={{}}>{ new Date(`${item}`).toLocaleString("en-us",{ month: "long" })}</h3>
                                ) : <div />
                            }
                            {
                            this.state.holidayArr[item].map((elm) => (
                                <React.Fragment>
                                    <p>{elm.name}</p>
                                </React.Fragment>
                            ))
                            }
                        </React.Fragment>
                        ))
                    ) : <div>no data</div>
                }
            </React.Fragment>
        )
    }
}