import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ConfirmPage } from './src/ConfirmPage';
import { requestHoliday } from './src/helpers/ticket';
import axios from 'axios';

import { Ticket } from './src/Ticket';

export default function App() {
  const [confirmData, setConfirmData] = useState(null);
  const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    action: 'request_holiday__leave',
    startHolidayDay,
    endHolidayDay,
    whoApproved: ''
  });

  const onNext = async (data) => {
    setConfirmData(data);
    setFormValues({
      email: data.email,
      action: data.action,
      startHolidayDay: data.startHolidayDay,
      endHolidayDay: data.endHolidayDay,
      whoApproved: data.whoApproved
    })
  }

  const onSubmit = async (data) => {
    setDisableSubmit(true);
    setSubmitError(false);

    const ticket = requestHoliday(data);

    try {
      const resp = await axios.post('https://test-integrator.formsengine.io/trainman/uWg85Wt7u1F1iRYY/supportform/submit_support_form_piper', 
        ticket
      );
      setDisableSubmit(false);

      if (resp.data.status === 'true') {
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setDisableSubmit(false);
      setSubmitError(true);
    }

  }


  return (
    <View style={styles.body}>
      <Image
        source={require('./src/img/mycubes.png')}
        style={styles.img}
      />
      {!confirmData &&
        <Ticket
          onNext={onNext}
          formValues={formValues}
          startHolidayDay={startHolidayDay}
          endHolidayDay={endHolidayDay}
          setStartHolidayDay={setStartHolidayDay}
          setEndHolidayDay={setEndHolidayDay}
        />}
      {confirmData &&
        <ConfirmPage
          setConfirmData={setConfirmData}
          formValues={formValues}
          onSubmit={onSubmit}
          disableSubmit={disableSubmit}
          submitError={submitError}
          setSubmitError={setSubmitError}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#D1EDFE',
    height: '100%',
    width: '100%',
    padding: '10%',
    paddingTop: '20%'
  },
  img: {
    marginBottom: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 220,
    height: 80
  }
});
