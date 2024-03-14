import React, { useEffect, useState } from "react";
import { getCovidData } from "../service/covid";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CovidTracker = () => {
  const [loading, setLoading] = useState(false);
  const [covidinfo, setCovidinfo] = useState([]);

  const covidTrack = async () => {
    const res = await getCovidData();
    console.log(res.data.statewise);
    setRows(res.data.statewise);
  };

  useEffect(() => {
    setLoading(false);
    covidTrack();
    setLoading(true);
  }, []);

  const setRows = (res) => {
    const rows = res.map((r) => {
      const rowData = {
        state: r.state,
        confirmed: r.confirmed,
        recovered: r.recovered,
        death: r.deaths,
        active: r.active,
        updated: r.lastupdatedtime,
      };
      return rowData;
    });
    setCovidinfo(rows);
  };

  return (
    <>
     <Typography variant="h3" textAlign={"center"}>Covid Data</Typography>
      {!loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <TableContainer>
              <Table sx={{border:'2px solid black' , margin:"9px"}}>
                <TableHead>
                  <TableRow>
                    <TableCell width={5}>S.No.</TableCell>
                    <TableCell width={5}>State</TableCell>
                    <TableCell width={5}>Confirmed</TableCell>
                    <TableCell width={5}> Recovered</TableCell>
                    <TableCell width={5}>Death</TableCell>
                    <TableCell width={5}>Active</TableCell>
                    <TableCell width={5}>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {covidinfo.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.confirmed}</TableCell>
                        <TableCell>{item.recovered}</TableCell>
                        <TableCell>{item.death}</TableCell>
                        <TableCell>{item.active}</TableCell>
                        <TableCell>{item.updated}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </>
  );
};

export default CovidTracker;
