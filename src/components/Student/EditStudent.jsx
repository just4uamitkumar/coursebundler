import { Button, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay } from '@chakra-ui/react';
import React from 'react';
import { server } from '../../redux/store';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditStudent({isModalOpen, ModalClose, formData, onClose, selectedStudent }) {

  const handleUpdate = (event, id) => {
    event.preventDefault();
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
        withCredentials: true,
    };

    axios.put(`${server}/student/${id}`, formData, config).then(res => {
      toast.success('Student Deleted Successfully'); 
      onClose();     
      ModalClose();
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
              Are you sure? You are updating details for <strong>{formData.firstName} {formData.lastName}</strong> in from student list.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={ModalClose}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={(event) => handleUpdate(event, selectedStudent._id)} ml={3}>
                Update Student
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default EditStudent;
