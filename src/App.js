import React, {Component} from "react";
import loader from './images/loader.svg'
import clearButton from './images/close-icon.svg'
import Gif from './Gif'

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};


// when we have results we want to render close button
const Header = ({clearSearch, hasResults}) => (
  <div className='header grid'>
  {hasResults ? ( 
    <button>
    <img src={clearButton} alt="clear search" onClick={clearSearch}/>
    </button> 
  ) : ( 
      <h1 className='title'>Jiffy</h1>
     )}
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
      loading: false,
      searchTerm: '',
      hintText: '',
      gifs: []
    };
  }
  
  searchGiphy = async searchTerm => {
    this.setState({
      // this is for the spinner
      loading: true
    })
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=l7bEpXZUWkG5UDMLEv84EXR6evq5chVR&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
    );
    // here we convert our raw response into json data
    const {data} = await response.json();
    
    // here we check if the arr is empty if it is we throw an error
    if (!data.length) {
      throw `Nothing found for ${searchTerm}`
    }
    
    // here we grab a random result from our images
    const randomGif = randomChoice(data);
    
    console.log({randomGif});
    console.log(data);
    
    this.setState((prevState, props) => ({
      ...prevState,
      // we use our spread to take previous gif and add our new one on the end
      gifs: [...prevState.gifs, randomGif],
      // turns off the loading spinner after load
      loading: false,
      hintText: `Hit enter to see more ${searchTerm}`
    }));
    
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }));
    }
  };
  
  
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
  
 // here we reset our state by clearing everything out bringing it to default
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }));
    this.textInput.focus()
  }
  
render() { 
    const {searchTerm, gifs} = this.state;
    // variable set to see if there are gifs
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />
        
        <div className='search grid'>
        
        {/* here we loop over our arr of gif images from our state and create multiple videos from it */}
        {this.state.gifs.map(gif => <Gif {...gif} />)}
        
        <input 
        className='input grid-item' 
        placeholder='Type something' 
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={searchTerm}
        ref={input => {
          this.textInput = input;
        }}
        />
        </div>
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
