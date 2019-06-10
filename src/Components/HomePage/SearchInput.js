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
        };
    }
      componentDidMount() {
        this.moveFocus();
      }
      moveFocus() {
        const node = this.myRef.current
        if( node != null ) {
            node.addEventListener('keydown', function(e) {
              const active = document.activeElement;
              if(e.keyCode === 40 && active.nextSibling) {
                  console.log('keydown')
                active.nextSibling.focus();
              }
              if(e.keyCode === 38 && active.previousSibling) {
                active.previousSibling.focus();
              }
            });
        }
      }
   
    handleChange(evnt) {
        this.props.search(evnt.target.value);
        this.setState({
            searchValue: evnt.target.value
        });
    }

    clearInputArea = () => this.setState({ searchValue: '' });

    render() {
        console.log(this.props)
        let { repos, data } = this.props;
        let languages = [];
        data = []
        data.map((item) => {
            if (item.language)
                languages.push(item.language);
            return item;
        })
        return (
            <div className="myContainer">
                <div className="inputContainer">
                    <div className="imageContainer">
                        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-128.png" width="20" height="20" />
                    </div>
                    <div className="textInputContainer">
                        <input type="text" className="fullWidth" name="search" id="search" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search users by ID, address...." />
                    </div>
                     <div className="imageContainer">
                     { this.state.searchValue!= '' && <img src="http://simpleicon.com/wp-content/uploads/cross.png" width="20" height="20" onClick={this.clearInputArea}/> }
                    </div> 
                </div>
                {this.state.searchValue !==''?
                <div className="scrollableDivision" ref={this.myRef}>
                    {repos.length > 0? repos.map((item, index) => <div className="repoCard" tabIndex={index}> 
                        <h6>{item.id}</h6>
                        <font className="username">{item.name.substring(0, this.state.searchValue.length)}</font>{item.name.substring(this.state.searchValue.length, item.name.length)}<br />
                        <font size="2">{item.address}</font>
                    </div>) : <div className="not-found">No Results found</div>}
                </div>:null}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { repos: state.repos.result };
}

export default connect(mapStateToProps, { search })(SearchInput);
