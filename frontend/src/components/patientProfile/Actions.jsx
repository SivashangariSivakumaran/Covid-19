import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {  updateTransferPatient} from '../../store/entities/patients';
import { Card, Button, Col, Form,} from 'react-bootstrap';
import PopUp from '../popUp/PopUp';
import { toastAction } from '../../store/toastActions';

const Actions = ({patients, hospitals, wards, popUpHandler}) => {
    console.log(patients)
    const currentMedicalHistory = (patients.medicalHistory)[patients.medicalHistory.length-1]
    const currentWardId = currentMedicalHistory.ward
   // console.log(currentMedicalHistory )
    const dispatch = useDispatch()
    const [tranferSt, transferState ] = useState('false');
    const [hospitalName, setTransferHospital] = useState('')
    const [wardName, setWardName] = useState(wards[0].name)

    if(typeof(hospitals) ==! undefined && hospitals.length > 0){
        setTransferHospital(hospitals[0].name)
    }


    const transferPatient = (TransferState) => {
        const transferUpdate = {
            patientId: patients._id,
            transferDetails:{
                hospitalName : hospitalName,
                transferState : TransferState
            }
        }
        console.log(transferUpdate)
        dispatch(updateTransferPatient(transferUpdate));
        if(TransferState == 'pending'){
            transferState(TransferState)
        }else{
           transferState('false')
        }
    }

    
    const changeWard = () => {
        console.log(currentWardId)
        console.log(getWardId(wards, wardName))
        if(currentWardId === getWardId(wards, wardName)){
            dispatch(toastAction({ message: "New ward cannot be current ward...", type: 'error' }));
        }
        const wardUpdate = {
            patientId: patients._id,
            wardId: getWardId(wards, wardName)
        }

        console.log(wardUpdate)
       // dispatch(updateTransferPatient(transferUpdate));
    }

    return (
        <Card className='m-2 con-vs-card text-center'>
            <br></br>
            <div className='text-center' >
            <Button 
                type='submit'  
                className=' w-50 text-center' 
                onClick ={ () => popUpHandler(true)}
            >Discharge</Button></div>

            
            <hr style={{color: '#000000',backgroundColor: '#000000',height: .25,borderColor : '#000000'}}/>
                {typeof(hospitals) === 'undefined' || hospitals.length === 0 ? 
                    <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                          className='m-2'
                    >No Wards</Card> :
                <Col>
                    <h5>Change Ward</h5>
                    <Form.Group>
                        <Form.Control onChange = {(e) => {
                            if(e.target.value !== "Select Ward"){
                                setWardName(e.target.value);
                            }
                        }} as="select">
                        {wards.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button
                        onClick ={ () => changeWard()}
                    >Change Ward</Button>  
                </Col> }
            <hr style={{color: '#000000',backgroundColor: '#000000',height: .25,borderColor : '#000000'}}/>
            
            <div>
                {typeof(hospitals) === 'undefined' || hospitals.length === 0 ? 
                    <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                          className='m-2'
                    >No Hospitals</Card> :
                <Col>
                    <h5 >Transfer Patient</h5>
                    <Form.Group>
                        <Form.Control onChange = {(e) => {
                            if(e.target.value !== "Select Hospital"){
                                setTransferHospital(e.target.value);
                            }
                        }} as="select">
                        {hospitals.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col> }

                <Button className='btn btn-primary m-2 text-center' disabled={tranferSt === 'pending' ? true : false} onClick={()=>transferPatient('pending')}>Transfer</Button>
                <Button className='btn btn-danger m-2 text-center' disabled={tranferSt === 'false'? true : false} onClick={()=>transferPatient('canceled')}>Cancel</Button>
                
            </div>

        </Card>
    )
}

export default Actions


function getWardId(wards, ward){
    let id = ""
    if(typeof(ward) === 'undefined' || ward.length === 0){
         return id
    } 

    const wardDetail = wards.filter(p=> p.name === ward)
    //console.log(wardDetail)
    return wardDetail[0]._id
}
