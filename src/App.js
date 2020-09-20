import React, {Component} from "react";
import loader from './images/loader.svg'

const Header = () => (
  <div className='header grid'>
    <h1 className='title'>Jiffy</h1>
  </div>
);

const UserHint = ({loading, hintText}) => (
  <div className='user-hint'>
    {loading ? <img className='block mx-auto' src={loader} alt='loading...' /> :
    hintText
  }
  </div>
);

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: '',
      gif: null
    };
  }
  
  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=l7bEpXZUWkG5UDMLEv84EXR6evq5chVR&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
    );
    // here we convert our raw response into json data
    const {data} = await response.json();
    
    this.setState((prevState, props) => ({
      ...prevState,
      gif: data[0]
    }))
    
    } catch (error) {
      
    }
  }
  
  
  handleChange = event => { 
    const {value} = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }))
  };
  
  handleKeyPress = event => {
    const {value} = event.target
    
    if (value.length > 2 && event.key === 'Enter') {
      // here we call our searchGiphy function using the search term 
      this.searchGiphy(value);
    }
  };
  
  
  
render() { 
    const {searchTerm, gif} = this.state
    return (
      <div className="page">
        <Header />
        <div className='search grid'>
        {/* this will only render our video when we have a gif in the state, we test for it with && */}
        {gif && (
          <video className='grid-item video' autoPlay loop src={gif.images.original.mp4}/>)}
        <input 
        className='input grid-item' 
        placeholder='Type something' 
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={searchTerm}
        />
        </div>
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
