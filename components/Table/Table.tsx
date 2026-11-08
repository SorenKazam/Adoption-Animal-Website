import styles from "./Table.module.scss";

type TableProps = {
  tableHeaders: React.ReactNode[];
  tableRows: React.ReactNode[][];
};

export default function Table({ tableHeaders, tableRows }: TableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
