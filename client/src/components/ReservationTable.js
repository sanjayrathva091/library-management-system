import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import CustomTable from "./CustomTable";

function ReservationTable({ defaultData }) {
    const columns = useMemo(
        () => [
            {
                header: "Books",
                accessorKey: "book",
                cell: (info) => info.getValue().title,
                footer: (props) => props.column.id,
            },
            {
                header: "User",
                accessorKey: "user",
                cell: (info) => info.getValue().name,
                footer: (props) => props.column.id,
            },
            {
                header: "Reservation",
                accessorKey: "reservationDate",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
        ],
        []
    );
    const [data] = React.useState(() => [...defaultData]);

    return (
        <Box>
            <CustomTable
                {...{
                    data,
                    columns,
                }}
            ></CustomTable>
        </Box>
    );
}

export default ReservationTable;
