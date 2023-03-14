import React, {Component} from 'react'


export class Scoreboard extends Component{
    constructor(props) {
        super(props)

        this.state = {
            fakePlayer:[
                
            ]
        }
    }
    render(){
        return (
            <div>
                <div className= "card"> </div>
                    <div className = "card-body">
                        <table className = "table table-borderless">
                            <col style = {{width: '10%'}}/>
                            <col style = {{width: '80%'}}/>
                            <col style = {{width: '10%'}}/>
                            <tbody>
                                <td className="border-0"> index </td>
                                <td className="border-0"> name and picture </td>
                                <td className="border-0"> score </td>
                            </tbody>
                        </table>
                    </div>
            </div>
        )
    }



}