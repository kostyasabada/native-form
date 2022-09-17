import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Ticket = ({ onNext, formValues, startHolidayDay, endHolidayDay, setStartHolidayDay, setEndHolidayDay }) => {
  const actions = [
    { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
    { label: 'Report sick leave', value: 'report_sick_leave' },
    { label: 'Report return date after sick leave', value: 'report_start_work' }
  ];
  const [skipCount, setSkipCount] = useState(true);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [selectedAction, setSelectedAction] = useState(formValues.action);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: formValues.email,
      action: formValues.action,
      startHolidayDay: startHolidayDay,
      endHolidayDay: endHolidayDay,
      whoApproved: formValues.whoApproved
    }
  });

  const transformTimeToTimeZone = (date) => {
    const timeZoneTime = (-(date.getTimezoneOffset() * 60000)) + date.getTime();
    return new Date(timeZoneTime);
  }

  const isEmailValid = (email) => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
  }

  useEffect(() => {
    if (skipCount) {
      setSkipCount(false);
    }
    if (!skipCount){
      setStartHolidayDay(new Date().toISOString().slice(0, 10));
      setEndHolidayDay(new Date().toISOString().slice(0, 10));
      setSelectedAction(watch('action'));
    }

  }, [watch('action')]);

  return (
    <KeyboardAwareScrollView>

      <View style={styles.block}>
        <Text style={styles.label}>Contact email</Text>
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                keyboardType="email-address"
                style={[styles.input, {borderColor: errors.email ? 'red' : !emailValid ? 'red' : '#49658c'}]}
                onChangeText={(e) => {
                  setEmailValid(true)
                  onChange(e)
                }}
                value={value}
            
              />
            )}
            name="email"
          />
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Action:</Text>
        <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <RNPickerSelect
                placeholder={{}}
                onValueChange={onChange}
                value={value}
                style={{...styles.pickerSelect}}
                items={actions}
              />
            )}
            name="action"
          />
      </View>

      {selectedAction === 'request_holiday__leave' &&
        <View>
          <View style={styles.block}>
            <Text style={styles.label}>Start day:</Text>
            <TouchableOpacity
              onPress={() => setStartDatePickerVisibility(true)}
              style={styles.dateButton}
            >
              <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
            </TouchableOpacity>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <DateTimePickerModal
                  date={new Date(startHolidayDay)}
                  isVisible={isStartDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                    onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                    setStartDatePickerVisibility(false);
                  }}
                  onCancel={() => setStartDatePickerVisibility(false)}
                  timeZoneOffsetInMinutes={100}
                />
              )}
              name="startHolidayDay"
            />
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>End day:</Text>
            <TouchableOpacity
              onPress={() => setEndDatePickerVisibility(true)}
              style={styles.dateButton}
            >
              <Text>{endHolidayDay.split('-').reverse().join('-')}</Text>
            </TouchableOpacity>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <DateTimePickerModal
                  date={new Date(endHolidayDay)}
                  isVisible={isEndDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    setEndHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                    onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                    setEndDatePickerVisibility(false);
                  }}
                  onCancel={() => setEndDatePickerVisibility(false)}
                  timeZoneOffsetInMinutes={100}
                />
              )}
              name="endHolidayDay"
            />
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>Name project manager who approved:</Text>
            <Controller
              control={control}
              rules={{
              required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, {borderColor: !errors.whoApproved ? '#49658c' : 'red'}]}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="whoApproved"
            />
          </View>

        </View>
      }

      {selectedAction === 'report_sick_leave' &&
        <View style={styles.block}>
          <Text style={styles.label}>First sick day:</Text>
          <TouchableOpacity
              onPress={() => setStartDatePickerVisibility(true)}
              style={styles.dateButton}
            >
              <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
            </TouchableOpacity>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <DateTimePickerModal
                date={new Date(startHolidayDay)}
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                  onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                  setStartDatePickerVisibility(false);
                }}
                onCancel={() => setStartDatePickerVisibility(false)}
                timeZoneOffsetInMinutes={100}
              />
          )}
            name="startHolidayDay"
          />
        </View>
      }

      {selectedAction === 'report_start_work' &&
        <View style={styles.block}>
          <Text style={styles.label}>Start date:</Text>
          <TouchableOpacity
              onPress={() => setStartDatePickerVisibility(true)}
              style={styles.dateButton}
            >
              <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
            </TouchableOpacity>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <DateTimePickerModal
                date={new Date(startHolidayDay)}
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                  onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
                  setStartDatePickerVisibility(false);
                }}
                onCancel={() => setStartDatePickerVisibility(false)}
                timeZoneOffsetInMinutes={100}
              />
          )}
            name="startHolidayDay"
          />
        </View>
      }

      <TouchableOpacity
        onPress={ handleSubmit((data) => {
          setEmailValid(isEmailValid(data.email));

          if (isEmailValid(data.email)) {
            return onNext(data);
          }
        })}
        style={styles.buttonStyle}
      >
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
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
  block: {
    marginBottom: 20
  },
  label: {
    marginBottom: 5
  },
  input: {
    flexDirection: 'row',
    color: 'black',
    borderColor: '#49658c',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 11,
    backgroundColor: '#00000000',
    paddingTop: 10,
    paddingBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  dateButton: {
    borderColor: '#49658c',
    borderRadius: 12,
    borderWidth: 2,
    color: '#49658C',
    padding: 10,
    alignItems: 'center'
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: '#49658c',
      borderRadius: 12,
      borderWidth: 2,
      color: 'black',
      paddingRight: 30
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: '#49658c',
      borderRadius: 12,
      borderWidth: 2,
      color: 'black',
      paddingRight: 30
    }
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
  }
})
