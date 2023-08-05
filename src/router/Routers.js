import React, { Component } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../components/Home';

import RegisterProduct from '../components/RegisterProduct';
import RelatedProducts from '../components/RelatedProducts';
import ListSells from '../components/ListSells';
import ModifyProduct from '../components/ModifyProduct';



class Routers extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Navigate to = '/home' />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterProduct />} />
                {/* <Route path="/documents" element={<Documents />} /> */}
                {/* <Route path="/documents/:id" element={<DocumentDetails />} /> */}
                <Route path="/productos" element={<RelatedProducts />} />
                <Route path="/sells" element={<ListSells/>} />
                <Route path="*" element={<h1>Not Found 404</h1>} />
                <Route path='/:id' element={<ModifyProduct/>} />
            </Routes>
        );
    }
}

export default Routers;