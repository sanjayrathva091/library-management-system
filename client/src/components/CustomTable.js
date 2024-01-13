import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button,
    Flex,
    HStack,
    Input,
    Select,
} from "@chakra-ui/react";

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

function CustomTable({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true,
    });
    return (
        <Box p="2">
            <TableContainer
                border={1}
                borderStyle="solid"
                borderColor={"aquamarine"}
                borderRadius="md"
            >
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th key={header.id} colSpan={header.colSpan} fontSize="xx">
                                            {header.isPlaceholder ? null : (
                                                <Box>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getCanFilter() ? (
                                                        <Box>
                                                            <Filter column={header.column} table={table} />
                                                        </Box>
                                                    ) : null}
                                                </Box>
                                            )}
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            <HStack gap="2">
                <Button
                    p={1}
                    borderRadius={"md"}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </Button>
                <Button
                    p={1}
                    borderRadius={"md"}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </Button>
                <Button
                    p={1}
                    borderRadius={"md"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </Button>
                <Button
                    p={1}
                    borderRadius={"md"}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </Button>
                <Flex gap="1" justifyContent="center" alignItems="center">
                    <span>Page</span>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                    | Go to page:
                    <Input
                        p={1}
                        w={16}
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
                </Flex>
                <Flex gap="1" justifyContent="center" alignItems="center">
                    <Select
                        // icon={<MdArrowDropDown />}
                        variant="filled"
                        defaultValue={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </HStack>
        </Box>
    );
}

function Filter({ column, table }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return (
        <Input
            p={2}
            variant="filled"
            borderRadius="md"
            type="text"
            value={columnFilterValue || ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
        />
    );
}

export default CustomTable;
