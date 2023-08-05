import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Routers from '../router/Routers';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar />                
                <Routers />
                <Footer />
            </div>
        );
    }
}

export default Layout;
