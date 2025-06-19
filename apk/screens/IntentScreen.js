import React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {
  FAB,
  Portal,
  Modal,
  Provider as PaperProvider,
  DefaultTheme,
  Button,
  TextInput,
} from 'react-native-paper';
import Header from '../components/Header';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates';
import { Dropdown } from 'react-native-element-dropdown';
import en from 'date-fns/locale/en-US';
import { AuthContext } from '../utils/AuthContext';
import useApi from '../utils/api';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function IntentScreen() {
  registerTranslation('en', en);
  const { user } = useContext(AuthContext);
  const { request } = useApi();
  const [intentList, setIntentList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fabOpen, setFabOpen] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [formData, setFormData] = React.useState({
    intentfor: new Date(),
    school: '',
    totalpresent: '',
    milk: '',
    rice: '',
    sambar: '',
    egg: '',
    shengachikki: '',
    banana: '',
    total: '',
  });

  const [school, setschool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const onSelectedSchoolChange = (selected) => {
    // Keep only the last selected item to simulate single select
    if (selected.length > 0) {
      setSelectedSchool([selected[selected.length - 1]]);
    } else {
      setSelectedSchool([]);
    }
  };

  const getSchool = useCallback(async () => {
    try {
      const result = await request({
        method: 'GET',
        url: `/school/${user.school}`,
      });
      //console.log(result)
      if (result.success) {
        const school = result.schools;
        const filteredData = school.map((item) => ({
          oid: item.oid.toString(),
          name: item.schoolname,
        }));
        setschool(filteredData);
      }
    } catch (error) {
      console.error('School error:', error.response?.data || error.message);
    }
  }, [user.school]);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-calculate total
  React.useEffect(() => {
    const numericFields = ['milk', 'rice', 'sambar', 'egg', 'shengachikki', 'banana'];
    const sum = numericFields.reduce((acc, field) => {
      const val = parseInt(formData[field]) || 0;
      return acc + val;
    }, 0);
    setFormData((prev) => ({ ...prev, total: sum.toString() }));
  }, [
    formData.milk,
    formData.rice,
    formData.sambar,
    formData.egg,
    formData.shengachikki,
    formData.banana,
  ]);

  const handleModalClose = () => {
    setModalVisible(false);
    setFabOpen(false);
    //
  };

  const handleSubmit = (status) => {
    const payload = { ...formData, status };
    console.log('Form Data Submitted:', payload);
    handleModalClose();
  };

  const getIntent = useCallback(async () => {
    try {
      const result = await request({
        method: 'GET',
        url: `/intent/${user.ngocode}`,
      });
      if (result.success) {
        setIntentList(result.intent);
      }
    } catch (error) {
      (!error.status ? logout() : console.error('Dashboard error:', error.response?.data || error.message))
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user?.ngocode) {
        getIntent();
      }
    }, [getIntent])
  );



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <PaperProvider theme={DefaultTheme}>
        <Header pageTitle="Intent" />
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={handleModalClose}
            contentContainerStyle={styles.modalContainer}
          >
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>Add/Edit Intent(s)</Text>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                Intent For: {formData.intentfor.toDateString()}
              </Button>
              {showDatePicker && (
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={showDatePicker}
                  onDismiss={() => setShowDatePicker(false)}
                  date={formData.intentfor}
                  onConfirm={({ date }) => {
                    setShowDatePicker(false);
                    handleChange('intentfor', date);
                  }}
                />
              )}
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ maxHeight: 500 }}  >
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={school}
                  labelField="name"
                  valueField="oid"
                  key="oid"
                  placeholder="Select School(s)"
                  search
                  value={selectedSchool}
                  onChange={item => setSelectedSchool(item)}
                  selectedStyle={styles.selectedStyle}
                />
              </KeyboardAvoidingView>
              {['totalpresent', 'milk', 'rice', 'sambar', 'egg', 'shengachikki', 'banana'].map(
                (field) => (
                  <TextInput
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChangeText={(text) => handleChange(field, text)}
                    keyboardType="numeric"
                    style={styles.input}
                    mode="outlined"
                  />
                )
              )}

              <TextInput
                label="Total"
                value={formData.total}
                mode="outlined"
                style={styles.input}
                editable={false}
              />

              <View style={styles.buttonRow}>
                <Button mode="outlined" onPress={handleModalClose} style={styles.button}>
                  Close
                </Button>
                <Button mode="contained-tonal" onPress={() => handleSubmit(-1)} style={styles.button}>
                  Draft
                </Button>
                <Button mode="contained" onPress={() => handleSubmit(1)} style={styles.button}>
                  Save
                </Button>
              </View>
            </ScrollView>
          </Modal>
        </Portal>

        <View style={styles.container}>
          <Text>Intent Screen</Text>
          <Portal>
            <FAB.Group
              open={fabOpen}
              icon="plus"
              actions={[]}
              onStateChange={({ open }) => { getSchool(), setFabOpen(open) }}
              onPress={() => {
                if (!fabOpen) setModalVisible(true);
              }}
              visible={true}
            />
          </Portal>
        </View>
      </PaperProvider>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '90%',
    zIndex: 1000
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },

});
