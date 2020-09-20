import React, {Component} from "react";
import loader from './images/loader.svg'
import Gif from './Gif'

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

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
      gif: null,
      gifs: []
    };
  }
  
  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=l7bEpXZUWkG5UDMLEv84EXR6evq5chVR&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
    );
    // here we convert our raw response into json data
    const {data} = await response.json();
    
    // here we grab a random result from our images
    const randomGif = randomChoice(data);
    
    console.log({randomGif});
    console.log(data);
    
    this.setState((prevState, props) => ({
      ...prevState,
      gif: randomGif,
      // we use our spread to take previous gif and add our new one on the end
      gifs: [...prevState.gifs, randomGif]
    }));
    
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
        
        {/* here we loop over our arr of gif images from our state and create multiple videos from it */}
        {this.state.gifs.map(gif => <Gif {...gif} />)}
        
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
