import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import axios from 'axios';
import InfoCard from '../components/InfoCard';

const ViewVisit = ({currentVisitId}) => {
    const [currentVisit, setCurrentVisit] = useState('');

    useEffect(()=>{
        const fetchVisit = async()=>{

            try{
                console.log(currentVisitId)
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const response = await axios.get(`${URL}/visitor/${currentVisitId}`, axiosHeaders);
                setCurrentVisit(response.data.visit);
                console.log(response);
            }catch(error){

            }
        }
        fetchVisit();
    },[currentVisitId])
    
    const { firstName, surname, company , role, telephone, email, employeeEmail, appointment } = currentVisit;
   
    const infoArray = [
        { label: 'First Name', info: firstName },
        { label: 'Surname', info: surname },
        { label: 'Company', info: company },
        { label: 'Role', info: role },
        { label: 'Telephone', info: telephone },
        { label: 'Email', info: email },
        { label: 'Employee Email', info: employeeEmail },
        { label: 'Appointment', info: moment(appointment).format('llll') }
      
    ];


    return (
    	<>
            <BreadcrumbBar page = 'Visit Information' prevPages = {[{name:'View Visits', link: '/visits-list'}]} />
            <div className='headingContainer'>
                <Heading>Visit Information</Heading>
            </div>
            <div className='userInfo'>
                <InfoCard infoArray={infoArray} link='/edit-visit' />
            </div>
		</>
    )
}

export default ViewVisit;