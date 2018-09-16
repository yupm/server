import React , { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect} from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
//const SurveyNew = () => <h2>SurveyNew</h2>;


 //BrowserRouter expects at most 1 child

class App extends Component {
    //ComponentWillMount might be called multiple times. therefore DidMount is more preferred
    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return(
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>    
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App) ;