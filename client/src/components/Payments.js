import React, { Component }  from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render(){    
        return(
            <StripeCheckout
                name="Hop Asia"
                description="$5 for 500 travel credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn red">Add Credits</button>
            </StripeCheckout>
        );
    }

}

export default connect(null, actions)(Payments);