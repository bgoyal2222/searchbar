import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { search } from "./actions";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.myRef = React.createRef();
        this.state = {
            searchValue: '',
            activeSuggestion: 0,
            filteredSuggestions: [],
        };
    }
    componentDidMount() {
    }
    
    handleKeyDownPressed = event => {
        if (event.keyCode === 40) {
            if (this.state.activeSuggestion <= this.props.repos.length) {
                this.setState({activeSuggestion : this.state.activeSuggestion + 1})
            }
        }
        if (event.keyCode === 38) {
            if (this.state.activeSuggestion > 0) {
                    this.setState({activeSuggestion : this.state.activeSuggestion - 1})
                }
        }
    }
   
    handleChange(evnt) {
        this.props.search(evnt.target.value);
        this.setState({
            searchValue: evnt.target.value
        });
    }

    clearInputArea = () => this.setState({ searchValue: '' });

    getHighlightedText = (text, higlight) => {
        // Split on higlight term and include term into parts, ignore case
        let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return <div> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold',color:'#1d12b8' } : {} }>
                { part }
            </span>)
        } </div>;
    }
    render() {
        const { repos } = this.props;
        const { searchValue, activeSuggestion } = this.state;
        let suggestionList;
        if (repos.length) {
            suggestionList = (
                <ul>
                    {repos.map((item, index) => (<li className={(index === activeSuggestion || (activeSuggestion >= repos.length && index == (repos.length - 1))) ? "repoCardSelected" : "repoCard"} tabIndex={index}>
                        <h6>{this.getHighlightedText(item.id, searchValue)}</h6>
                        {this.getHighlightedText(item.name, searchValue)}
                        <font size="2">{this.getHighlightedText(item.address, searchValue)}</font>
                    </li>) )}
                </ul>
            )
        } else {
            <div className="not-found">No Results found</div>
        }


        return (
            <div className="myContainer">
                <div className="inputContainer">
                    <div className="imageContainer">
                        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-128.png" width="20" height="20" />
                    </div>
                    <div className="textInputContainer">
                        <input type="text" className="fullWidth" name="search" id="search" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search users by ID, address...." onKeyDown={this.handleKeyDownPressed} />
                    </div>
                     <div className="imageContainer">
                     { this.state.searchValue!= '' && <img src="http://simpleicon.com/wp-content/uploads/cross.png" width="20" height="20" onClick={this.clearInputArea}/> }
                    </div> 
                </div>
                {searchValue !==''?
                    <div className="scrollableDivision" ref={this.myRef}>
                        { suggestionList }
                </div>:null}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { repos: state.repos.result };
}

export default connect(mapStateToProps, { search })(SearchInput);