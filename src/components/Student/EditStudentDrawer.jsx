import {
    Button, VStack, Drawer, DrawerOverlay, DrawerContent,
    DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
    FormControl, FormLabel, Input, Select, useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EditStudent from './EditStudent';
import toast from 'react-hot-toast';


const EditStudentDrawer = ({ educationList, isEditDrawerOpen, EditDrawerClose, selectedStudent, studentList  }) => { 
    const [formData, setFormData] = useState({
        firstName:selectedStudent.firstName,
        lastName:selectedStudent.lastName,
        age:selectedStudent.age,
        position:selectedStudent.position,
        exprience:selectedStudent.exprience,
        salary:selectedStudent.salary,
        skills:selectedStudent.skills,
        favSkill:selectedStudent.favSkill,
        rollNo:selectedStudent.rollNo,
        qualification:selectedStudent.qualification,
        percentage:selectedStudent.percentage
    });        

   const { isOpen: isModalOpen, onOpen: ModalOpen, onClose: ModalClose } = useDisclosure();

    const handleInputChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        });
    }
    
    const updateHandler = () => {      
        if (!formData.firstName) {
            toast.error('First Name is Empty');
            return;
        }
        if (!formData.age) {
            toast.error('Age is Empty');
            return;
        }
        if (!formData.position) {
            toast.error('Position is Empty');
            return;
        }
    
        if (!formData.exprience) {
            toast.error('Experience is Empty');
            return;
        }
    
        if (!formData.rollNo) {
            toast.error('Roll Number is Empty');
            return;
        }
        ModalOpen()
    }
  
    console.log(formData)
    return (
        <>
        <Drawer isOpen={isEditDrawerOpen} placement='right' onClose={EditDrawerClose} size={'md'}>
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{`Update ${selectedStudent.firstName} ${selectedStudent.lastName} Details`}</DrawerHeader>
                <DrawerBody>
                    <VStack>
                        <FormControl isRequired mb='10px'>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Roll No</FormLabel>
                            <Input
                                disabled
                                placeholder="Roll No"
                                name="rollNo"
                                value={formData.rollNo === 0 ? '' : formData.rollNo}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Age</FormLabel>
                            <Input
                                placeholder="Age"
                                name="age"
                                value={formData.age === 0 ? '' : formData.age}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Position</FormLabel>
                            <Input
                                placeholder="Position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Salary</FormLabel>
                            <Input
                                placeholder="Salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Experience</FormLabel>
                            <Input
                                placeholder="Experience"
                                name="exprience"
                                value={formData.exprience}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Skills</FormLabel>
                            <Input
                                placeholder="Skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Favourite Skill</FormLabel>
                            <Input
                                placeholder="Favourite Skill"
                                name="favSkill"
                                value={formData.favSkill}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Qualification</FormLabel>
                            <Select placeholder='Qualification'
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleInputChange}>
                                {
                                    educationList && educationList.map((item, index) =>
                                        <option value={item.value} key={index}>{item.name}</option>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Percentage</FormLabel>
                            <Input
                                placeholder="Percentage"
                                name="percentage"
                                value={formData.percentage === 0 ? '' : formData.percentage}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </VStack>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={EditDrawerClose}>
                        Cancel
                    </Button>                    
                    <Button colorScheme='blue' onClick={updateHandler}>Update</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        <EditStudent 
            ModalOpen={ModalOpen}
            isModalOpen={isModalOpen}
            ModalClose={ModalClose}
            formData={formData}
            onClose={EditDrawerClose}
            selectedStudent={selectedStudent} />
        </>
    )
}

export default EditStudentDrawer