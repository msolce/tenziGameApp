import { useMemo } from 'react';
import { useTable } from 'react-table'

export default function Placar(props) {

    //FUNCAO QUE RETORN TRUE OU FALSE PARA QUANDO EXISTE PLACAR
    function existePlacar() {
        if (props.placar.length > 0) {
            // console.log(props.placar)
            return true
        } else {
            // console.log('sem placar')
            return false
        }
    }

    //CONFIG PARA O REACT-TABLE
    const data = props.placar
    const columns = useMemo(() => ([
        {
            Header: 'Nome',
            accessor: 'nome',
        },
        {
            Header: 'Clicks',
            accessor: 'clicks',
        }
    ]), [])

    //CONSTANTES PARA O REACT TABLE
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    //RETORNA O COMPONENTE TABLE
    function tabela() {
        return (
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup,) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (

                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

    }
    

    return (
        <div className='placar'>
            {existePlacar() && tabela()}
        </div>
    )
};