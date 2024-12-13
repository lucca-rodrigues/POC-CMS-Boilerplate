import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsIcon from '@mui/icons-material/Collections';
import AdjustIcon from '@mui/icons-material/Adjust';
import PieChartIcon from '@mui/icons-material/PieChart';

import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';
import { useMemo, useState } from 'react';

export function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  const { theme, lightenColor } = useGlobalContext();

  useMemo(() => {
    setSelectedItem(location?.pathname);
  }, [location?.pathname]);

  const handleItemClick = (item: (typeof menuOptions)[number]) => {
    setSelectedItem(item.path);
    navigate(item.path);
    setOpenCollapse(item.path);
  };

  const handleSubItemClick = (subItem: (typeof menuOptions)[number]['subItems'][number]) => {
    setSelectedItem(subItem.path);
    navigate(subItem.path);
  };

  const menuOptions = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <PieChartIcon />,
      action: () => {
        setSelectedItem('dashboard');
        navigate('/dashboard');
      },
    },
    {
      title: 'Arquivos',
      path: '/files',
      icon: <AttachFileIcon />,
      action: () => {
        setSelectedItem('files');
        navigate('/files');
      },
      subItems: [
        {
          title: 'Add. arquivos',
          icon: <CollectionsIcon />,
          path: '/files/library',
          action: () => {
            setSelectedItem('/files/library');
            navigate('/files/library');
          },
        },
      ],
    },
    {
      title: 'Páginas',
      path: '/pages',
      icon: <AutoStoriesIcon />,
      action: () => {
        setSelectedItem('pages');
        navigate('/pages');
      },
      subItems: [
        {
          title: 'Add. página',
          icon: <CollectionsIcon />,
          path: '/pages/new',
          action: () => {
            setSelectedItem('/pages/new');
            navigate('/pages/new');
          },
        },
      ],
    },
    {
      title: 'Usuários',
      path: '/users',
      icon: <PeopleIcon />,
      action: () => {
        setSelectedItem('users');
        navigate('/users');
      },
      subItems: [
        {
          title: 'Add. usuário',
          icon: <CollectionsIcon />,
          path: '/users/new',
          action: () => {
            setSelectedItem('/users/new');
            navigate('/users/new');
          },
        },
      ],
    },
    {
      title: 'Configurações',
      path: '/settings',
      icon: <BuildCircleIcon />,
      action: () => {
        setSelectedItem('settings');
        navigate('/settings');
      },
    },
  ];

  return (
    <Stack
      height="100vh"
      width="100%"
      p={3}
      sx={{
        color: '#fff',
      }}
    >
      <List component="nav" aria-labelledby="nested-list-subheader">
        {menuOptions?.map((item, index) => (
          <Box mb={0.5} key={index}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                borderRadius: 1,
                background: selectedItem === item?.path ? '#fff' : 'transparent',
                color: selectedItem === item?.path ? theme?.defaultColor : '#fff',

                '& svg': {
                  fill: selectedItem === item?.path ? theme?.defaultColor : '#fff',
                },

                '&:hover': {
                  color: selectedItem === item?.path ? theme?.defaultColor : '#fff',
                  background:
                    selectedItem === item?.path ? '#fff' : lightenColor(theme?.defaultColor, 0.5),

                  '& svg': {
                    fill: selectedItem === item?.path ? theme?.defaultColor : '#fff',
                  },
                },
              }}
            >
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
            {item?.subItems && (
              <Collapse in={openCollapse === item.path} timeout={500} unmountOnExit>
                <List component="div" disablePadding>
                  {item?.subItems?.map((subItem, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => handleSubItemClick(subItem)}
                      sx={{
                        paddingLeft: 3,
                        borderRadius: 1,
                        background: selectedItem === subItem?.path ? '#fff' : 'transparent',
                        color: selectedItem === subItem?.path ? theme?.defaultColor : '#fff',

                        '& svg': {
                          fill: selectedItem === subItem?.path ? theme?.defaultColor : '#fff',
                        },

                        '&:hover': {
                          color: selectedItem === subItem?.path ? theme?.defaultColor : '#fff',
                          background:
                            selectedItem === subItem?.path
                              ? '#fff'
                              : lightenColor(theme?.defaultColor, 0.5),

                          '& svg': {
                            fill: selectedItem === subItem?.path ? theme?.defaultColor : '#fff',
                          },
                        },
                      }}
                    >
                      <ListItemIcon>
                        <AdjustIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={subItem?.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Stack>
  );
}
