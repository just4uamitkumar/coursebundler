import { Button, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay } from '@chakra-ui/react';
import React from 'react';
import { server } from '../../redux/store';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddStudent({isModalOpen, ModalClose, formData, onClose, studentList }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
        withCredentials: true,
    };

    axios.post(`${server}/addstudent`, formData, config).then(res => {
      toast.success('Student Added Successfully');      
      onClose();
    }).then(res2 => {      
      ModalClose()
    }).catch( err => {
      toast.error(err);
    });    
};

  return (
    <>
      <AlertDialog
        isOpen={isModalOpen}
        onClose={ModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Student
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You are adding a <strong>{formData.firstName} {formData.lastName}</strong> in student list.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={ModalClose}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={(event) => handleSubmit(event)} ml={3}>
                Add Student
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AddStudent;
