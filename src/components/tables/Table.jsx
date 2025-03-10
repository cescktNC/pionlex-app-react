import PropTypes from 'prop-types';

export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <TableHead columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  )
}

function TableHead({ columns }) {
  return (
    <thead>
      <tr className='border-b-2 border-gray-300 dark:border-gray-500 text-2xl text-gray-900 dark:text-white'>
        {columns.map(column => (
          <th key={column.key} className={`p-5 ${column.align ? `text-${column.align}` : 'text-left'}`}>
            {column.renderHeader ? column.renderHeader() : column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function TableBody({ columns, data }) {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow key={index} columns={columns} row={row} />
      ))}
    </tbody>
  )
}

function TableRow({ columns, row }) {
  return (
    <tr className='border-b border-gray-200 dark:border-gray-700'>
      {columns.map(column => (
        <TableCell key={column.key} value={column.render ? column.render(row) : row[column.key]} />
      ))}
    </tr>
  )
}

function TableCell({ value }) {
  return (
    <td className='p-2 text-2xl font-medium text-gray-700 dark:text-gray-300'>{value}</td>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}