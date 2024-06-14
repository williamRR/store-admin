import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

const renderContent = (item, entityItem) => {
  if (item.isColor) {
    return (
      <div
        style={{
          backgroundColor: entityItem[item.id],
          width: '20px',
          height: '20px',
          borderRadius: '50%',
        }}
      ></div>
    );
  } else if (item.id === 'storeId' && entityItem[item.id]) {
    return entityItem[item.id].name;
  } else {
    return entityItem[item.id];
  }
};

const MainTable = ({
  entities,
  entity,
  headers,
  loading,
  error,
  selected,
  handleRowClick,
}) => {
  const newHeaders = headers?.filter((item) => item.isHeader);
  return (
    <TableContainer sx={{ backgroundColor: '#253237' }} component={Paper}>
      <Table sx={{ border: '1px solid white' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'black' }}>
            {entity &&
              newHeaders?.map((item) => (
                <TableCell key={item.id}>{item.label}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell
                align='center'
                colSpan={
                  (headers[entity]?.length && headers[entity]?.length) || 0
                }
              >
                <CircularProgress size={30} />
              </TableCell>
            </TableRow>
          )}

          {error && (
            <TableRow>
              <TableCell
                colSpan={entity && newHeaders[entity]?.length}
                style={{ color: 'red' }}
              >
                Error: {error.message}
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            entities?.length &&
            entities?.map((entityItem) => (
              <TableRow
                key={entityItem._id}
                sx={{
                  backgroundColor: (theme) =>
                    selected?._id === entityItem._id
                      ? 'gray'
                      : theme.palette.background.default,
                  '&:hover': {
                    backgroundColor: (theme) =>
                      selected?._id === entityItem._id
                        ? theme.palette.primary.light
                        : '#eee',
                  },
                  borderBottom: '0x solid #ccc',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  '&:hover td': {
                    backgroundColor: 'gray',
                  },
                }}
                onClick={() => handleRowClick(entityItem)}
              >
                {newHeaders?.map((item) => (
                  <TableCell
                    key={item.id}
                    sx={{ padding: '8px', paddingLeft: '15px' }}
                  >
                    {renderContent(item, entityItem)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
