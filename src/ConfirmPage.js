import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export const ConfirmPage = ({
  setConfirmData,
  formValues,
  onSubmit,
  disableSubmit,
  submitError,
  setSubmitError,
  submitSuccess,
  setSubmitSuccess
}) => {


  return (
    <View>
      {!submitSuccess &&
        <View>
          <Text style={styles.title}>Support ticket</Text>

          <Text style={styles.label}>Contact email:</Text>
          <Text style={styles.value}>{formValues.email}</Text>

          {formValues.action === 'request_holiday__leave' &&
            <View>
              <Text style={styles.label}>Action:</Text>
              <Text style={styles.value}>Request Holiday / leave</Text>

              <Text style={styles.label}>Start date:</Text>
              <Text style={styles.value}>{formValues.startHolidayDay}</Text>

              <Text style={styles.label}>End date:</Text>
              <Text style={styles.value}>{formValues.endHolidayDay}</Text>

              <Text style={styles.label}>Who approved:</Text>
              <Text style={styles.value}>{formValues.whoApproved}</Text>
            </View>
          }

          {formValues.action === 'report_sick_leave' &&
            <View>
              <Text style={styles.label}>Action:</Text>
              <Text style={styles.value}>Report sick leave</Text>

              <Text style={styles.label}>First sick day:</Text>
              <Text style={styles.value}>{formValues.startHolidayDay}</Text>
            </View>
          }

          {formValues.action === 'report_start_work' &&
            <View>
              <Text style={styles.label}>Action:</Text>
              <Text style={styles.value}>Report return date after sick leave</Text>

              <Text style={styles.label}>Start date:</Text>
              <Text style={styles.value}>{formValues.startHolidayDay}</Text>
            </View>
          }


          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {setConfirmData(null), setSubmitError(false)}}
          >
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableSubmit}
            style={[styles.buttonStyle, {backgroundColor: disableSubmit ? 'gray' : '#265daf'}]}
            onPress={() => onSubmit(formValues)}
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          {submitError &&
            <View>
              <Text style={{color: 'red', textAlign: 'center'}}>Submit wasn't success. Try again or use browser version</Text>
            </View>
          }
        </View>
      }

      {submitSuccess &&
      <View>
        <Text style={[styles.title, {textAlign: 'center', marginTop: 100, marginBottom: 100}]}>Ticked is created!</Text>
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {setConfirmData(null), setSubmitError(false), setSubmitSuccess(false)}}
          >
            <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
    
  );
}


const styles = StyleSheet.create({
  title: {
    color: '#1D4F7D',
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 26,
    marginBottom: 30
  },
  label: {
    color: '#1D4F7D',
    fontWeight: '700',
  },
  value: {
    marginLeft: 15,
    marginBottom: 15
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#265daf',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    disable: true
  }

})