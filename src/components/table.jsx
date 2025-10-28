const Table = ({ data, columns, emptyMessage = "No data available." }) => {
    if (!data || data.length === 0) {
        return <p>{emptyMessage}</p>;
    }
    
console.log(data)
    return (
      <div className=" w-full h-[62vh] overflow-y-auto justify-center align-center pt-4">
        <div className="flex w-full justify-center align-center">
          <table className="w-[100%] border-collapse overflow-auto sticky">
            <thead>
              <tr className="">
                {columns?.map((col) => (
                  <th
                    className="px-4  py-1 border-b text-left border-[#004AAD] text-[#444444] bg-[#E6EDF7]"
                    key={col.id}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td
                      className="px-4  py-2 border-b border-[#004AAD]"
                      key={`${rowIndex}-${col.id}`}
                    >
                      {col.cell ? col.cell(row) : row[col.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Table;