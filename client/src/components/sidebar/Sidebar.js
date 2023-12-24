import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const SidebarContent = ({ onClick }) => (
    <VStack>
        <Button onClick={onClick} w="100%">
            <Link to="/admin">Home</Link>
        </Button>
        <Button onClick={onClick} w="100%">
            <Link to="/admin/dashboard">Dashboard</Link>
        </Button>
        <Button onClick={onClick} w="100%">
            <Link to="/admin/books">Books</Link>
        </Button>
        <Button onClick={onClick} w="100%">
            Users
        </Button>
        <Button onClick={onClick} w="100%">
            Settings
        </Button>
        <Button onClick={onClick} w="100%">
            Contact
        </Button>
    </VStack>
)

const Sidebar = ({ isOpen, variant, onClose }) => {
    return variant === 'sidebar' ? (
        <Box
            position="fixed"
            left={0}
            p={5}
            w="200px"
            top={0}
            h="100%"
            bg="#dfdfdf"
        >
            <SidebarContent onClick={onClose} />
        </Box>
    ) : (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>L.M.S</DrawerHeader>
                    <DrawerBody>
                        <SidebarContent onClick={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

export default Sidebar;
