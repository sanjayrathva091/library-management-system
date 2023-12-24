import { useState } from 'react'
import { Box, useBreakpointValue } from '@chakra-ui/react'

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export default function GlobalLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <>
            <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
            />
            <Box ml={!variants?.navigationButton && 200}>
                <Header
                    showSidebarButton={variants?.navigationButton}
                    onShowSidebar={toggleSidebar}
                />
            </Box>
            <Outlet />
        </>
    )
};
