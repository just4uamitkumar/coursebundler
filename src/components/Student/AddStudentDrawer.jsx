import {
    Button, VStack, Drawer, DrawerOverlay, DrawerContent,
    DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
    FormControl, FormLabel, Input, Select, useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import AddStudent from './AddStudent';
import toast from 'react-hot-toast';

const AddStudentDrawer = ({ educationList, isAddDrawerOpen, AddDrawerClose, AddDrawerTitle, studentList  }) => { 
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: 0, position: '', exprience: '', salary: '',
        skills: '', favSkill: '', rollNo: 0, qualification: '', percentage: 0
    });

    //onst rollRef = useRef(null);

    const { isOpen: isModalOpen, onOpen: ModalOpen, onClose: ModalClose } = useDisclosure();

    const handleInputChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        });
    }

    const submitHandler = () => {      
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
    
    // const handleRoll = (event) => {       
    //     const existRoll = studentList.find(el => el.rollNo === event.target.value);
    //     console.log(existRoll)
    //     if(existRoll){
    //         rollRef.current.focus()
    //         toast.error('Roll Number is Already Exist');
    //         return
    //     }
    // }

    return (
        <>
        <Drawer isOpen={isAddDrawerOpen} placement='right' onClose={AddDrawerClose} size={'md'}>
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{AddDrawerTitle}</DrawerHeader>
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
                    <Button variant='outline' mr={3} onClick={AddDrawerClose}>
                        Cancel
                    </Button>                    
                    <Button colorScheme='blue' onClick={submitHandler}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        <AddStudent 
            ModalOpen={ModalOpen}
            isModalOpen={isModalOpen}
            ModalClose={ModalClose}
            formData={formData}
            onClose={AddDrawerClose}
            studentList={studentList} />
        </>
    )
}

export default AddStudentDrawer