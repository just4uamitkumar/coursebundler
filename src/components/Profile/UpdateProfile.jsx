import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const UpdateProfile = ({ user }) => {
  const { loading } = useSelector(state => state.profile);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile ?? 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(updateProfile(firstName, lastName, email, mobile));
    dispatch(loadUser());
    navigate('/profile');
  };

 
  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />
          <Input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Input
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="Mobile No."
            type={'number'}
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            w="full"
            colorScheme={'yellow'}
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
