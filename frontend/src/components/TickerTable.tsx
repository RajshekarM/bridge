import React, { useContext } from 'react';
import { WebSocketContext } from '../services/WebSocketContext';
import { useTable } from 'react-table';

const TickerTable: React.FC = () => {
    const data = useContext(WebSocketContext);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Symbol',
                accessor: 'symbol',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
        ],
        []
    );

    const tableData = React.useMemo(
        () => (data ? Object.keys(data).map((symbol) => ({ symbol, price: data[symbol] })) : []),
        [data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: tableData });

    return (
        <table {...getTableProps()} style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{ borderBottom: '2px solid black', padding: '8px', textAlign: 'left' }}
                                key={column.id}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    style={{ borderBottom: '1px solid black', padding: '8px' }}
                                    key={cell.column.id}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TickerTable;
