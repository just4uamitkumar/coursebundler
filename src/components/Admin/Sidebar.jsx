import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const LinkButton = ({ url, Icon, text, active }) => {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant="ghost"
        colorScheme={active && 'purple'}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}

const Sidebar = () => {
  const location = useLocation();
  const sidebarItems = [
    {"icon":RiDashboardFill, "text":"Dashboard", "url":"dashboard"},
    {"icon":RiAddCircleFill, "text":"Create Course", "url":"createcourse"},
    {"icon":RiEyeFill, "text":"Courses", "url":"courses"},
    {"icon":RiUser3Fill, "text":"Users", "url":"users"},
  ]
  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      {
        sidebarItems.map((item, index) => 
          <LinkButton
            key={index}
            Icon={item.icon}
            text={item.text}
            url={item.url}
            active={location.pathname === `/admin/${item.url}`}
          />)
      }
    </VStack>
  );
};

export default Sidebar;


