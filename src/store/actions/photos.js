import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const fetchStart = () => {
    return{
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (photoData) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        pictures: photoData
    };
};

export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    }
}

export const fetch = () => {
    return dispatch => {
        dispatch(fetchStart());

        axios.get('http://localhost:3000/api/photos')
            .then(response => {
                // const fetchedData = [];
                // const photos = res.data;

                // photos.forEach(photo => {
                //     fetchedData.push({
                //         id: photo._id,
                //         photoUrl: photo.photoUrl,
                //         imageCategory: photo.imageCategory
                //     });
                // });
                // dispatch(fetchSuccess(fetchedData));
                dispatch(fetchSuccess(response.data));
                // setLoading(false);
                // setPictures(fetchedData);
            })
            .catch(err => {
                // setLoading(true);
                dispatch(fetchFail(err));
            })
    }
}