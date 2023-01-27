import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ConfirmPage } from './src/ConfirmPage';
import { requestHoliday } from './src/helpers/ticket';
import { Api } from './src/constants/urls';

import { Ticket } from './src/Ticket';

export default function App() {
  const [confirmData, setConfirmData] = useState(null);
  const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    action: 'request_holiday__leave',
    startHolidayDay,
    endHolidayDay,
    whoApproved: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(`${Api.PUBLISHER}/read`, 
        {
          "questionnaireId":"ZPtqdHAy",
          "processId":"",
          "requestType":"",
          "initPrefillData":{},
          "processParams":{},
          "siteUrl":"https://portal.mycubes.nl/"
        }
        );

        setCsrfToken(response.data.structure.csrfToken)
      } catch (error) {
        console.log(error);
      }

    })();
  }, [])
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

    const ticket = requestHoliday(data, csrfToken);
    console.log(ticket);

    try {
      // const resp = await axios.post(`${Api.PUBLISHER}/validate`, 
      //   ticket
      // );
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

  if (!csrfToken) {
    return (
      <View style={[styles.body, styles.loader]}>
        <ActivityIndicator color={"#000"} />
      </View>
    );
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
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
