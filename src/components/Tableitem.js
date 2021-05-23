import {
  makeStyles,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => ({
  table: {
    maxHeight: theme.spacing(50),
  },
}));

const Tableitem = ({ headerRow, innerHTMLRow, rows }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <h3>{headerRow.name}</h3>
            </TableCell>
            <TableCell align="left">
              <h3>{headerRow.value}</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          {innerHTMLRow &&
            innerHTMLRow.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: row.value,
                    }}
                  ></div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Tableitem.propTypes = {
  headerRow: PropTypes.object,
  innerHTMLRow: PropTypes.array,
  rows: PropTypes.array,
};
export default Tableitem;
