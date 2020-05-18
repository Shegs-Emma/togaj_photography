import React, { useState } from 'react';

import classes from './PhotoData.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Layout from '../Layout/Layout';
import { Redirect } from 'react-router';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from 'axios';

const PhotoData = () => {
    const [ dataForm, setDataForm ] = useState({
        photoData: {
            photoUrl: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Input Photo Url'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            imageCategory: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'weddings', displayValue: 'Weddings'},
                        {value: 'birthdays', displayValue: 'Birthdays'},
                        {value: 'graduations', displayValue: 'Graduations'},
                        {value: 'others', displayValue: 'Others'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        }
    });

    const [ loading, setLoading ] = useState(false);
    const [ submitted, setSubmitted ] = useState(false);
    const [ formIsValid, setFormIsValid ] = useState(false);

//========================================================================================================
    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            //Use trim() to remove white spaces
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }    

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedDataForm = {
            ...dataForm.photoData
        }

        const updatedFormElement = {
            ...updatedDataForm[inputIdentifier]
        };


        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedDataForm[inputIdentifier] = updatedFormElement;
        
        
        let formIsValid = true;
        for(let formIdentifier in updatedDataForm) {
            formIsValid = updatedDataForm[formIdentifier].valid && formIsValid;
        }

        setDataForm({photoData: updatedDataForm});
        setFormIsValid(formIsValid);
    }

    const postHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = {};

        for(let formElementIdentifier in dataForm.photoData) {
            formData[formElementIdentifier] = dataForm.photoData[formElementIdentifier].value;
        }

        const photo = {
            photoDetails: formData
        }

        axios.post('http://localhost:3000/api/photos', photo)
            .then(res => {
                setLoading(false);
                setSubmitted(true);
            })
            .catch(error => {
                setLoading(true);
                console.log(error);
                console.log(photo);
            });
    };


    let redirect = null;

    if(loading){
        redirect = <Spinner />
    }

    if(submitted){
        redirect = <Redirect to='/gallery' />;
    }
//===================================================================================================

    const photoElementsArray = [];

    for(let key in dataForm.photoData){
        photoElementsArray.push({
            id: key,
            config: dataForm.photoData[key]
        });
    };
//====================================================================================================


    return(
        <div className={classes.Gallery}>
            <Layout uploading header='UPLOAD A PHOTOGRAPH'>
                <div className={classes.ContactData}>
                    <form onSubmit={postHandler}>
                        {photoElementsArray.map(photoElement => (
                            <Input 
                                key={photoElement.id}
                                elementType={photoElement.config.elementType} 
                                elementConfig={photoElement.config.elementConfig} 
                                value={photoElement.config.value}
                                inValid={!photoElement.config.valid}
                                shouldValidate={photoElement.config.validation}
                                touched={photoElement.config.touched}
                                changed={(event)=> inputChangedHandler(event, photoElement.id)} />
                        ))}

                        <Button btnType="Danger" disabled={!formIsValid}>SUBMIT</Button>
                    </form>
                </div>
            </Layout>
            {redirect}
        </div>
    )
}

export default PhotoData;