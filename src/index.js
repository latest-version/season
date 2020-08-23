import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// const App = () => {
//     window.navigator.geolocation.getCurrentPosition( 
//         position => console.log(position),
//         err => console.log(err)
//     );
//     return (
//         <div>Hi There</div>
//     );
// }

class App extends React.Component {
    constructor(props){
        super(props);
        
        // initailize state object
        this.state = { lat: null, errorMessage: ''};
        
        console.log('construtor');

    }

    renderContent() {
        if( this.state.errorMessage && !this.state.lat){
            return (
                <div>
                    <h2>Error: {this.state.errorMessage}</h2>
                </div>
            );
        }
        
        if( !this.state.errorMessage && this.state.lat ){
            return <SeasonDisplay lat={this.state.lat}/>;
        }

        return <Spinner message="Please accept location request"/>;
    }
    render(){
        
        return (
        <div className="border red">
            {this.renderContent()}
        </div>
        );
        
    }

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition( 
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({ errorMessage: err.message})
        );
    }

    componentDidUpdate(){
        console.log('component did update');
    }

    componentWillUnmount(){
        console.log('component will unmount');
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));