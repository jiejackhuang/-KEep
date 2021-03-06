import React from 'react'
import {padLeft, range} from "../utility";

class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedYear: this.props

        }
    }

    componentDidMount(){
        document.addEventListener('click',this.handleClick,false)

    }
    componentWillUnmount(){
        document.removeEventListener('click',this.handleClick,false)

    }
    handleClick=(event)=>{
        if (this.node.contains(event.target))
        {
            return;
        }
        this.setState({
            isOpen:false
        })
    }
    toggleDropdown = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })

    }
    selectYear = (event, yearnumber) => {
        event.preventDefault();
        this.setState({
            selectedYear:yearnumber
        })

    }

    selectMonth=(event,month)=>{
        event.preventDefault();
        this.setState({
            isOpen:false
        })
        this.props.onChange(this.state.selectedYear,month)
    }
    render() {
        const {year, month} = this.props
        const {isOpen,selectedYear} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(e => e + year)
        return (
            <div className="dropdown  month-picker-component" ref={(ref)=>{this.node=ref}}>
                <h4>选择月份</h4>
                <button
                    onClick={this.toggleDropdown}
                    className="btn btn-lg btn-secondary dropdown-toggle">

                    {`${year} 年 ${padLeft(month)}月`}
                </button>

                {isOpen &&
                <div className="dropdown-menu" style={{display: 'block'    , left: '34%'}}>
                    <div className="row">

                        <div className="col border-right">
                            {yearRange.map((yearNumber, index) =>
                                <a key={index}
                                   href="#"
                                   onClick={(event) => {
                                       this.selectYear(event, yearNumber)
                                   }}
                                   className={(yearNumber === selectedYear ? 'dropdown-item active' : 'dropdown-item')}>

                                    {yearNumber} 年
                                </a>
                            )}


                        </div>

                        <div className="col">
                            {monthRange.map((monthNumber, index) =>
                                <a key={index}
                                   href=""
                                   onClick={(event)=>{
                                       this.selectMonth(event,monthNumber)
                                   }}
                                   className={(monthNumber === month ? 'dropdown-item active' : 'dropdown-item')}
                                >


                                    {padLeft(monthNumber)} 月
                                </a>
                            )}
                        </div>
                    </div>

                </div>
                }

            </div>
        )
    }


}

export default MonthPicker