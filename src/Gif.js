import React, {Component} from "react";

class Gif extends Component {
	// when video is loaded we add a loaded classname otherwise it stays hidden
	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		};
	}
	
	render () {
		
		const {loaded} = this.state;
		const {images} = this.props;
		
		return (
			<video 
			// when we have a loaded state as true, we add a loaded class
			className={`grid-item video ${loaded && 'loaded'}`} autoPlay loop src={images.original.mp4} onLoadedData={() => this.setState({loaded: true})}/>
		)	
	}
}

export default Gif;