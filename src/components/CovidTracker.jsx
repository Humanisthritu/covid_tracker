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
          <Box sx={{padding:"30px"}}>
            <TableContainer  sx={{border:'2px solid black'}}>
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor:"green"}}>
                    <TableCell width={5} sx={{color:"white"}}>S.No.</TableCell>
                    <TableCell width={5} sx={{color:"white"}}>State</TableCell>
                    <TableCell width={5} sx={{color:"white"}}>Confirmed</TableCell>
                    <TableCell width={5} sx={{color:"white"}}> Recovered</TableCell>
                    <TableCell width={5} sx={{color:"white"}}>Death</TableCell>
                    <TableCell width={5} sx={{color:"white"}}>Active</TableCell>
                    <TableCell width={5} sx={{color:"white"}}>Updated</TableCell>
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
