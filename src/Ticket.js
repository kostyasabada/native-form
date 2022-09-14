import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { requestHoliday } from "./helpers/ticket";
import axios from "axios";


export const Ticket = () => {
  const actions = [
    { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
    { label: 'Report sick leave', value: 'report_sick_leave' },
    { label: 'Report return date after sick leave', value: 'report_return_after_sick_leave' }
  ];
  const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [selectedAction, setSelectedAction] = useState(actions[0].value);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      action: actions[0].value,
      startHolidayDay,
      endHolidayDay,
      whoApproved: ''
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    setEmailValid(isEmailValid(data.email));

    if (emailValid) {
      if(data.action === 'request_holiday__leave') {
        const ticket = requestHoliday(data)

        // const resp = await axios.post('https://test-integrator.formsengine.io/trainman/uWg85Wt7u1F1iRYY/supportform/submit_support_form_piper', 
        //   ticket
        // );
        // console.log(resp);
      }
    }


  }

  const transformTimeToTimeZone = (date) => {
    const timeZoneTime = (-(date.getTimezoneOffset() * 60000)) + date.getTime();
    return new Date(timeZoneTime);
  }

  const isEmailValid = (email) => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
  }

  useEffect(() => {
    setStartHolidayDay(new Date().toISOString().slice(0, 10));
    setEndHolidayDay(new Date().toISOString().slice(0, 10));
    setSelectedAction(watch('action'));
  }, [watch('action')]);




  return (
    <KeyboardAwareScrollView style={styles.body}>

      <Image
        source={require('./img/mycubes.png')}
        style={styles.img}
      />

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

      {selectedAction === 'report_return_after_sick_leave' &&
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
        onPress={ handleSubmit(onSubmit) }
        style={styles.buttonStyle}
      >
        <Text style={styles.btnText}>Submit</Text>
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
  img: {
    marginBottom: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 220,
    height: 80
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






// import React, { useEffect, useState } from "react";
// import { Text, View, ScrollView, Image, TouchableOpacity, Button, StyleSheet, Keyboard } from "react-native";
// import {FloatingLabelInput} from 'react-native-floating-label-input';
// import RNPickerSelect from 'react-native-picker-select';
// import { useForm, Controller } from "react-hook-form";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { requestHoliday } from "./helpers/ticket";
// import axios from "axios";


// export const Ticket = () => {
//   const actions = [
//     { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
//     { label: 'Report sick leave', value: 'report_sick_leave' },
//     { label: 'Report return date after sick leave', value: 'report_return_after_sick_leave' }
//   ];
//   const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//   const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
//   const [emailValid, setEmailValid] = useState(true);
//   const [selectedAction, setSelectedAction] = useState(actions[0].value);

//   const { control, handleSubmit, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       action: actions[0].value,
//       startHolidayDay,
//       endHolidayDay,
//       whoApproved: ''
//     }
//   });

//   const onSubmit = async (data) => {
//     setEmailValid(isEmailValid(data.email));

//     if (emailValid) {
//       if(data.action === 'request_holiday__leave') {
//         const ticket = requestHoliday(data)

//         // const resp = await axios.post('https://test-integrator.formsengine.io/trainman/uWg85Wt7u1F1iRYY/supportform/submit_support_form_piper', 
//         //   ticket
//         // );
//         // console.log(resp);
//       }
//     }


//   }

//   const transformTimeToTimeZone = (date) => {
//     const timeZoneTime = (-(date.getTimezoneOffset() * 60000)) + date.getTime();
//     return new Date(timeZoneTime);
//   }

//   const isEmailValid = (email) => {
//     let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return pattern.test(String(email).toLowerCase())
//   }

//   useEffect(() => {
//     setStartHolidayDay(new Date().toISOString().slice(0, 10));
//     setEndHolidayDay(new Date().toISOString().slice(0, 10));
//     setSelectedAction(watch('action'));
//   }, [watch('action')]);




//   return (
//     <ScrollView style={styles.body} onPress={Keyboard.dismiss()}>
//       <Image
//         source={require('./img/mycubes.png')}
//         style={styles.img}
//       />
//       <View style={styles.block}>
//         <Text style={styles.label}>Contact email</Text>
//           <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <FloatingLabelInput
//                 // containerStyles={[styles.input, {borderColor: emailValid ? '#49658c' : 'red'}]}
//                 onChangeText={(e) => {
//                   setEmailValid(true)
//                   onChange(e)
//                 }}
//                 value={value}
            
//               />
//             )}
//             name="email"
//           />
//       </View>

//       {errors.email && <Text>This is required</Text>}
//       {!emailValid && <Text>Not correct</Text>}

//       <View style={styles.block}>
//         <Text style={styles.label}>Action:</Text>
//         <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <RNPickerSelect
//                 placeholder={{}}
//                 onValueChange={onChange}
//                 value={value}
//                 style={{...styles.pickerSelect}}
//                 items={actions}
//               />
//             )}
//             name="action"
//           />
//       </View>
//       {selectedAction === 'request_holiday__leave' &&
//         <View>
//           <View style={styles.block}>
//             <Text style={styles.label}>Start day:</Text>
//             <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal

//                   isVisible={isStartDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setStartDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setStartDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="startHolidayDay"
//             />
//           </View>

//           <View style={styles.block}>
//             <Text style={styles.label}>End day:</Text>
//             <TouchableOpacity
//               onPress={() => setEndDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{endHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal
//                   isVisible={isEndDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setEndHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setEndDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setEndDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="endHolidayDay"
//             />
//           </View>


//           <View style={styles.block}>
//             <Text style={styles.label}>Name project manager who approved:</Text>
//             <Controller
//               control={control}
//               rules={{
//               required: true,
//               }}
//               render={({ field: { onChange, value } }) => (
//                 <FloatingLabelInput
//                 containerStyles={styles.input}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="whoApproved"
//             />
//             {errors.whoApproved && <Text>This is required.</Text>}
//           </View>

//         </View>
//       }

//       {selectedAction === 'report_sick_leave' &&
//         <View style={styles.block}>
//           <Text style={styles.label}>First sick day:</Text>
//           <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }

//       {selectedAction === 'report_return_after_sick_leave' &&
//         <View style={styles.block}>
//           <Text style={styles.label}>Start date:</Text>
//           <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }

//       <TouchableOpacity
//         onPress={ handleSubmit(onSubmit) }
//         style={styles.buttonStyle}
//       >
//         <Text style={styles.btnText}>Submit</Text>
//       </TouchableOpacity>
//       {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
//     </ScrollView>
//   );
// }


// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: '#D1EDFE',
//     height: '100%',
//     width: '100%',
//     padding: '10%',
//     paddingTop: '20%'
//   },
//   img: {
//     marginBottom: 40,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: 220,
//     height: 80
//   },
//   block: {
//     marginBottom: 20
//   },
//   label: {
//     marginBottom: 5
//   },
//   input: {
//     flexDirection: 'row',
//     color: '#49658c',
//     borderColor: '#49658c',
//     borderWidth: 2,
//     borderRadius: 12,
//     paddingHorizontal: 11,
//     backgroundColor: '#00000000',
//     paddingTop: 10,
//     paddingBottom: 10,
//     alignContent: 'center',
//     justifyContent: 'center',
//   },
//   dateButton: {
//     borderColor: '#49658c',
//     borderRadius: 12,
//     borderWidth: 2,
//     color: '#49658C',
//     padding: 10,
//     alignItems: 'center'
//   },
//   pickerSelect: {
//     inputIOS: {
//       fontSize: 16,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       borderColor: '#49658c',
//       borderRadius: 12,
//       borderWidth: 2,
//       color: 'black',
//       paddingRight: 30
//     },
//     inputAndroid: {
//       fontSize: 16,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       borderColor: '#49658c',
//       borderRadius: 12,
//       borderWidth: 2,
//       color: 'black',
//       paddingRight: 30
//     }
//   },
//   btnText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   buttonStyle: {
//     backgroundColor: '#265daf',
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 20,
//     marginBottom: 25,
//   }
// })


















// import React, { useEffect, useState } from "react";
// import { Text, View, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
// import {FloatingLabelInput} from 'react-native-floating-label-input';
// import RNPickerSelect from 'react-native-picker-select';
// import { useForm, Controller } from "react-hook-form";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { requestHoliday } from "./helpers/ticket";
// import axios from "axios";


// export const Ticket = () => {
//   const actions = [
//     { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
//     { label: 'Report sick leave', value: 'report_sick_leave' },
//     { label: 'Report return date after sick leave', value: 'report_return_after_sick_leave' }
//   ];
//   const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//   const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
//   const [emailValid, setEmailValid] = useState(true);
//   const [selectedAction, setSelectedAction] = useState(actions[0].value);

//   const { control, handleSubmit, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       action: actions[0].value,
//       startHolidayDay,
//       endHolidayDay,
//       whoApproved: ''
//     }
//   });

//   const onSubmit = async (data) => {
//     setEmailValid(isEmailValid(data.email));

//     if (emailValid) {
//       if(data.action === 'request_holiday__leave') {
//         const ticket = requestHoliday(data)

//         // const resp = await axios.post('https://test-integrator.formsengine.io/trainman/uWg85Wt7u1F1iRYY/supportform/submit_support_form_piper', 
//         //   ticket
//         // );
//         // console.log(resp);
//       }
//     }


//   }

//   const transformTimeToTimeZone = (date) => {
//     const timeZoneTime = (-(date.getTimezoneOffset() * 60000)) + date.getTime();
//     return new Date(timeZoneTime);
//   }

//   const isEmailValid = (email) => {
//     let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return pattern.test(String(email).toLowerCase())
//   }

//   useEffect(() => {
//     setStartHolidayDay(new Date().toISOString().slice(0, 10));
//     setEndHolidayDay(new Date().toISOString().slice(0, 10));
//     setSelectedAction(watch('action'));
//   }, [watch('action')]);




//   return (
//     <View style={styles.body}>
//       <Image
//         source={require('./img/mycubes.png')}
//         style={styles.img}
//       />
//       <View style={styles.block}>
//         <Text style={styles.label}>Contact email</Text>
//           <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <FloatingLabelInput
//                 style={styles.input}
//                 onChangeText={(e) => {
//                   setEmailValid(true)
//                   onChange(e)
//                 }}
//                 value={value}
            
//               />
//             )}
//             name="email"
//           />
//       </View>
//       {errors.email && <Text>This is required</Text>}
//       {!emailValid && <Text>Not correct</Text>}

//       <View style={styles.block}>
//         <Text style={styles.label}>Action:</Text>
//         <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <RNPickerSelect
//                 placeholder={{}}
//                 onValueChange={onChange}
//                 value={value}
//                 style={{...styles.pickerSelect}}
//                 items={actions}
//               />
//             )}
//             name="action"
//           />
//       </View>
//       {selectedAction === 'request_holiday__leave' &&
//         <View>
//           <View style={styles.block}>
//             <Text style={styles.label}>Start day:</Text>
//             <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal

//                   isVisible={isStartDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setStartDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setStartDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="startHolidayDay"
//             />
//           </View>

//           <View style={styles.block}>
//             <Text style={styles.label}>End day:</Text>
//             <TouchableOpacity
//               onPress={() => setEndDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{endHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal
//                   isVisible={isEndDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setEndHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setEndDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setEndDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="endHolidayDay"
//             />
//           </View>


//           <View style={styles.block}>
//             <Text style={styles.label}>Name project manager who approved:</Text>
//             <Controller
//               control={control}
//               rules={{
//               required: true,
//               }}
//               render={({ field: { onChange, value } }) => (
//                 <FloatingLabelInput
//                   style={styles.input}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="whoApproved"
//             />
//             {errors.whoApproved && <Text>This is required.</Text>}
//           </View>

//         </View>
//       }

//       {selectedAction === 'report_sick_leave' &&
//         <View style={styles.block}>
//           <Text style={styles.label}>First sick day:</Text>
//           <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }

//       {selectedAction === 'report_return_after_sick_leave' &&
//         <View style={styles.block}>
//           <Text style={styles.label}>Start date:</Text>
//           <TouchableOpacity
//               onPress={() => setStartDatePickerVisibility(true)}
//               style={styles.dateButton}
//             >
//               <Text>{startHolidayDay.split('-').reverse().join('-')}</Text>
//             </TouchableOpacity>
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }


//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: '#D1EDFE',
//     height: '100%',
//     width: '100%',
//     padding: '10%',
//     paddingTop: '20%'
//   },
//   img: {
//     marginBottom: 40,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: 220,
//     height: 80
//   },
//   block: {
//     marginBottom: 20
//   },
//   label: {
//     marginBottom: 5
//   },
//   input: {
//     borderStyle: 'solid',
//     borderBottomWidth: 2,
//     borderBottomColor: '#3949ab'
//   },
//   dateButton: {
//     borderColor: '#49658c',
//     borderRadius: 12,
//     borderWidth: 2,
//     color: '#49658C',
//     padding: 10,
//     alignItems: 'center'
//   },
//   pickerSelect: {
//     inputIOS: {
//       fontSize: 16,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       borderColor: '#49658c',
//       borderRadius: 12,
//       borderWidth: 2,
//       color: 'black',
//       paddingRight: 30
//     },
//     inputAndroid: {
//       fontSize: 16,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       borderColor: '#49658c',
//       borderRadius: 12,
//       borderWidth: 2,
//       color: 'black',
//       paddingRight: 30
//     }
//   }
// })

































// import React, { useEffect, useState } from "react";
// import { Text, View, Image, TextInput, Button, StyleSheet } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
// import { useForm, Controller } from "react-hook-form";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { requestHoliday } from "./helpers/ticket";
// import axios from "axios";


// export const Ticket = () => {
//   const actions = [
//     { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
//     { label: 'Report sick leave', value: 'report_sick_leave' },
//     { label: 'Report return date after sick leave', value: 'report_return_after_sick_leave' }
//   ];
//   const [startHolidayDay, setStartHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [endHolidayDay, setEndHolidayDay] = useState(new Date().toISOString().slice(0, 10));
//   const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//   const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
//   const [emailValid, setEmailValid] = useState(true);
//   const [selectedAction, setSelectedAction] = useState(actions[0].value);

//   const { control, handleSubmit, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       action: actions[0].value,
//       startHolidayDay,
//       endHolidayDay,
//       whoApproved: ''
//     }
//   });

//   const onSubmit = async (data) => {
//     setEmailValid(isEmailValid(data.email));

//     if (emailValid) {
//       if(data.action === 'request_holiday__leave') {
//         const ticket = requestHoliday(data)

//         // const resp = await axios.post('https://test-integrator.formsengine.io/trainman/uWg85Wt7u1F1iRYY/supportform/submit_support_form_piper', 
//         //   ticket
//         // );
//         // console.log(resp);
//       }
//     }


//   }

//   const transformTimeToTimeZone = (date) => {
//     const timeZoneTime = (-(date.getTimezoneOffset() * 60000)) + date.getTime();
//     return new Date(timeZoneTime);
//   }

//   const isEmailValid = (email) => {
//     let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return pattern.test(String(email).toLowerCase())
//   }

//   useEffect(() => {
//     setStartHolidayDay(new Date().toISOString().slice(0, 10));
//     setEndHolidayDay(new Date().toISOString().slice(0, 10));
//     setSelectedAction(watch('action'));
//   }, [watch('action')]);




//   return (
//     <View style={styles.body}>
//       <Image
//         source={require('./img/mycubes.png')}
//         style={styles.img}
//       />
//       <View style={styles.block}>
//         <Text>Contact email</Text>
//           <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 onChangeText={(e) => {
//                   setEmailValid(true)
//                   onChange(e)
//                 }}
//                 value={value}
//               />
//             )}
//             name="email"
//           />
//       </View>
//       {errors.email && <Text>This is required</Text>}
//       {!emailValid && <Text>Not correct</Text>}

//       <View style={styles.block}>
//         <Controller
//             control={control}
//             rules={{
//             required: true,
//             }}
//             render={({ field: { onChange, value } }) => (
//               <RNPickerSelect
//                 placeholder={{}}
//                 onValueChange={onChange}
//                 value={value}
//                 items={actions}
//               />
//             )}
//             name="action"
//           />
//       </View>
//       {selectedAction === 'request_holiday__leave' &&
//         <View>
//           <View style={styles.block}>
//             <Text>Start day:</Text>
//             <Button title={startHolidayDay} onPress={() => setStartDatePickerVisibility(true)} />
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal
//                   isVisible={isStartDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setStartDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setStartDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="startHolidayDay"
//             />
//           </View>

//           <View style={styles.block}>
//             <Text>End day:</Text>
//             <Button title={endHolidayDay} onPress={() => setEndDatePickerVisibility(true)} />
//             <Controller
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <DateTimePickerModal
//                   isVisible={isEndDatePickerVisible}
//                   mode="date"
//                   onConfirm={(date) => {
//                     setEndHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                     setEndDatePickerVisibility(false);
//                   }}
//                   onCancel={() => setEndDatePickerVisibility(false)}
//                   timeZoneOffsetInMinutes={100}
//                 />
//               )}
//               name="endHolidayDay"
//             />
//           </View>


//           <View style={styles.block}>
//             <Text>Name project manager who approved:</Text>
//             <Controller
//               control={control}
//               rules={{
//               required: true,
//               }}
//               render={({ field: { onChange, value } }) => (
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="whoApproved"
//             />
//             {errors.whoApproved && <Text>This is required.</Text>}
//           </View>

//         </View>
//       }

//       {selectedAction === 'report_sick_leave' &&
//         <View style={styles.block}>
//           <Text>First sick day:</Text>
//           <Button title={startHolidayDay} onPress={() => setStartDatePickerVisibility(true)} />
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }

//       {selectedAction === 'report_return_after_sick_leave' &&
//         <View style={styles.block}>
//           <Text>Start date:</Text>
//           <Button title={startHolidayDay} onPress={() => setStartDatePickerVisibility(true)} />
//           <Controller
//             control={control}
//             render={({ field: { onChange } }) => (
//               <DateTimePickerModal
//                 isVisible={isStartDatePickerVisible}
//                 mode="date"
//                 onConfirm={(date) => {
//                   setStartHolidayDay(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   onChange(transformTimeToTimeZone(date).toISOString().slice(0, 10));
//                   setStartDatePickerVisibility(false);
//                 }}
//                 onCancel={() => setStartDatePickerVisibility(false)}
//                 timeZoneOffsetInMinutes={100}
//               />
//           )}
//             name="startHolidayDay"
//           />
//         </View>
//       }


//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: '#D1EDFE',
//     height: '100%',
//     width: '100%',
//     padding: '10%',
//     paddingTop: '20%'
//   },
//   img: {
//     marginBottom: 40,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: 220,
//     height: 80
//   },
//   block: {
//     marginBottom: 20
//   },
//   input: {
//     borderStyle: 'solid',
//     borderBottomWidth: 2,
//     borderBottomColor: '#3949ab'
//   }
// })







// import React, { useEffect, useState } from "react";
// import { Text, View, TextInput, Button, Alert } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
// import { useForm, Controller, get } from "react-hook-form";
// import DateTimePickerModal from "react-native-modal-datetime-picker";



// export const Ticket = () => {
//   const actions = [
//     { label: 'Request Holiday / leave', value: 'request_holiday__leave' },
//     { label: 'Report sick leave', value: 'report_sick_leave' },
//     { label: 'Report return date after sick leave', value: 'report_return_after_sick_leave' }
//   ];
//   const [selectedAction, setSelectedAction] = useState(actions[0].value);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const { control, handleSubmit, getValues, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       action: actions[0].value
//     }
//   });
//   const onSubmit = data => {
//     console.log(data);
//     // console.log(control);
    
//   }

//   useEffect(() => {
//     setSelectedAction(watch('action'));
//   }, [watch('action')]);


//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideDatePicker();
//   };



//   return (
//     <View>
//       <Text>Contact email</Text>
//       <Controller
//         control={control}
//         rules={{
//          required: true,
//         }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput

//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//         name="email"
//       />
//       {errors.email && <Text>This is required.</Text>}

//       <Controller
//         control={control}
//         rules={{
//          required: true,
//         }}
//         render={({ field: { onChange, value } }) => (
//           <RNPickerSelect
//           placeholder={{}}
//           onValueChange={onChange}
//           value={value}
//           items={actions}
//       />
//         )}
//         name="action"
//       />
//       {selectedAction === 'request_holiday__leave' &&
//         <View>
//           <Text>Request Holiday / leave</Text>
//           <Button title="Show Date Picker" onPress={showDatePicker} />
//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             onConfirm={handleConfirm}
//             onCancel={hideDatePicker}
//           />
//         </View>
//       }

//       {selectedAction === 'report_sick_leave' &&
//         <Text>Report sick leave</Text>
//       }

//       {selectedAction === 'report_return_after_sick_leave' &&
//         <Text>Report return date after sick leave</Text>
//       }


//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }