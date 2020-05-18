import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

import Photos from '../../components/Photos/Photos';
import Layout from '../Layout/Layout';
import classes from './Gallery.module.css';
import * as actions from '../../store/actions/index';

const Gallery = (props) => {
    // const [ pictures, setPictures ] = useState([]);
    // const [ loading, setLoading] = useState(true);
    const [ viewing, setViewing ] = useState(false);

    useEffect(() => {
        props.onFetch();
        // axios.get('http://localhost:3000/api/photos')
        //     .then(res => {
        //         const fetchedData = [];
        //         const photos = res.data;

        //         photos.forEach(photo => {
        //             fetchedData.push({
        //                 id: photo._id,
        //                 photoUrl: photo.photoUrl,
        //                 imageCategory: photo.imageCategory
        //             });
        //         });
        //         setLoading(false);
        //         setPictures(fetchedData);
        //     })
        //     .catch(err => {
        //         setLoading(true);
        //     })
    }, [props]);
    
    const viewHandler = () => {
        setViewing(true);
    }

    const viewHandlerClosed = () => {
        setViewing(false);
    }

    console.log(props.pictures);
    console.log(props.loading);

    let photograph = <Spinner />

    if(!props.pictures){
        photograph = (
            <Photos 
                pictures={props.pictures} 
                view={viewHandler} 
                loading={props.loading}
                viewing={viewing}
                viewHandlerClosed={viewHandlerClosed} />
        )
    }

    
    

    return (
        <div className={classes.Gallery}>
            <Layout>
                <div className={classes.PhotoDiv}>
                    {photograph}
                </div>
            </Layout>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        pictures: state.photo.pictures,
        loading: state.photo.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetch: () => (dispatch(actions.fetch()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);