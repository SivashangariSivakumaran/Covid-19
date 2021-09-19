import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "patients",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        patientsRegisterRequested(patients, action) {
            delete patients.registerSuccessful;
            patients.registering = true;
        },

        patientsRegisterRequestFailed(patients, action) {
            patients.registering = false;
        },

        patientsRegisterRequestSucceeded(patients, action) {
            delete patients.registering;
            patients.registerSuccessful = true;
            patients.list.push(action.payload.data);
        },

        patientsRequested(patients, action){
            patients.loading = true;
        },


        patientsRequestFailed(patients, action){
            patients.loading = false;
            
        },

    // payload: [message: , data: ]
        patientsReceived(patients, action){
            patients.list = action.payload.patients;
            patients.loading = false;
            patients.lastFetch = Date.now();
        },

        patientSymptomsUpdated(patients, action){
            const { patientId, symptoms  } = action.payload.data;
            const index = patients.list.findIndex(p => p.patientId === patientId );
            const symptom = patients.list[index].symptoms;
          //  const variantIndex =variants.findIndex(v => v.name === variantName);
          //  variants[variantIndex].countInStock = newCount;
        },

        patientDrugsUpdated(patients, action){
            const { patientId, symptoms  } = action.payload.data;
            const index = patients.list.findIndex(p => p.patientId === patientId );
            const symptom = patients.list[index].symptoms;
          //  const variantIndex =variants.findIndex(v => v.name === variantName);
          //  variants[variantIndex].countInStock = newCount;
        },

        patientTransferUpdated(patients, action){
            const { patientId, symptoms  } = action.payload.data;
            const index = patients.list.findIndex(p => p.patientId === patientId );
            const symptom = patients.list[index].symptoms;
          //  const variantIndex =variants.findIndex(v => v.name === variantName);
          //  variants[variantIndex].countInStock = newCount;
        },

        selectedPatientTransferUpdated(patients, actions){
            
        }
    },
});

export default slice.reducer;


export const { 
    patientsRequested, 
    patientsReceived, 
    patientsRequestFailed,
    patientsRegisterRequested,
    patientsRegisterRequestFailed,
    patientsRegisterRequestSucceeded,
    patientSymptomsUpdated,
    patientDrugsUpdated,
    patientTransferUpdated,
    selectedPatientTransferUpdated } = slice.actions;
                            

const patientURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

//Action Invokers
export const loadPatients = () => (dispatch, getState) => {
   const { lastFetch } = getState().entities.patients;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;

    return dispatch(
        apiCallBegan({
            url: patientURL + 'patients/',
            onStart: patientsRequested.type,
            onSuccess: patientsReceived.type,
            onError: patientsRequestFailed.type
        })
    );
};

export const getAllPatients= createSelector(
    state => state.entities.patients.list,
    patients => patients,
   // console.log(patients)
);

export const getPatientsLoadingStatus = createSelector(
    state => state.entities.patients.loading,
    loading => loading
);

export const getPatientById = patientId =>
    createSelector(
        state => state.entities.patients.list,
        patients => {
            const index = patients.findIndex(p => p._id === patientId);
            if(index !== -1) return patients[index];
            return {};
        },

);

export const registerPatients = (patient) => (dispatch) => {
    console.log(patient)
    return dispatch(
        console.log(patient)
        // apiCallBegan({
        //     url: patientURL + 'patientRegister',
        //     method: "post",
        //     data: patient,
        //     onStart: patientsRegisterRequested,
        //     onSuccess: patientsRegisterRequestSucceeded.type,
        //     onError: patientsRegisterRequestFailed
        // })
    );
}

export const updateSymptomsInDB = (symptoms) => (dispatch) => {
        console.log(symptoms)
        return dispatch(
          // console.log(patient);
            apiCallBegan({
                url: patientURL + 'updateSymptoms',
                method: "post",
                data: symptoms,
                onSuccess: patientSymptomsUpdated.type,
            })
        );

}

export const updateDrugsInDB = (drugs) => (dispatch) => {
    console.log(drugs)
    return dispatch(
       // console.log(patient);
        apiCallBegan({
            url: patientURL + 'updateDrugs',
            method: "post",
            data: drugs,
            onSuccess: patientDrugsUpdated.type,
        })
    );

}

export const updateTransferPatient = (value) => (dispatch) => {
    console.log(value)
    return dispatch(
        apiCallBegan({
            url: patientURL + 'patientTransfer',
            method: "post",
            data: value,
            onSuccess: patientTransferUpdated.type,
        })
    );
}

export const updateSelectedTransferPatient = (value) => (dispatch) => {
    console.log(value)
    return dispatch(
        apiCallBegan({
            url: patientURL + 'patientTransferSelected',
            method: "post",
            data: value,
            onSuccess: selectedPatientTransferUpdated.type,
        })
    );
}

