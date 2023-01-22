import { FC, useState, useEffect } from "react";
import { Box, Button, Grid, styled, Typography, useTheme } from "@mui/material";
import { ColumnUsers, User } from "../../types";
import NewUserModal from "../NewUserModal";
import EditUserModal from "../EditUserModal";
import { getUsers, deleteUser } from "../../api";

import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const INITIAL_USER_INFO: User[] = [];

export const Users: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usersData, setUsersData] = useState<User[]>(INITIAL_USER_INFO);

  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [getIndex, setGetIndex] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    getUsers().then((value) => {
      setUsersData(value);
    });
  }, [modalNew, modalEdit, deleted]);

  const handleOpenNew = () => {
    setModalNew(true);
  };
  const handleOpenEdit = (i: number) => {
    setModalEdit(true);
    setGetIndex(i);
  };

  const handleDelete = (index: string) => {
    deleteUser(index);
    setDeleted(!deleted);
  };

  const columns: readonly ColumnUsers[] = [
    { id: "firstname", label: "First name", fontWeight: "bold", maxWidth: 308 },
    { id: "lastname", label: "Last name", fontWeight: "bold", maxWidth: 308 },
    { id: "email", label: "Email", fontWeight: "bold", maxWidth: 308 },
    {
      id: "phone",
      label: "Phone number",
      fontWeight: "bold",
      maxWidth: 308,
    },
    { id: "action", label: "Action", fontWeight: "bold", maxWidth: 308 },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <StyledBox>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" fontSize="20px" fontWeight="bold">
            User Management
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          pt={{ xs: "20px", sm: 0 }}
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        >
          <Button variant="contained" onClick={handleOpenNew}>
            Create new user
          </Button>
        </Grid>
      </Grid>
      <Grid container mt="48px">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        maxWidth: column.maxWidth,
                        fontWeight: column.fontWeight,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.firstname + index}
                      >
                        <TableCell width="20%" align="left">
                          {row.firstname}
                        </TableCell>
                        <TableCell width="20%" align="left">
                          {row.lastname}
                        </TableCell>
                        <TableCell width="20%" align="left">
                          {row.email}
                        </TableCell>
                        <TableCell width="20%" align="left">
                          {row.phone}
                        </TableCell>
                        <TableCell width="20%" align="left">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item>
                              <Button
                                variant="outlined"
                                sx={{
                                  color: theme.palette.custom.main,
                                  borderColor: theme.palette.custom.main,
                                }}
                                onClick={() => handleOpenEdit(index)}
                              >
                                Edit
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                sx={{
                                  color: theme.palette.custom.main,
                                  borderColor: theme.palette.custom.main,
                                }}
                                onClick={() => handleDelete(row.id)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Grid container justifyContent="flex-end">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={usersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <Modal
        open={modalNew}
        onClose={() => {
          setModalNew(false);
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "420px",
            margin: "100px auto",
          }}
        >
          <NewUserModal setModalNew={setModalNew} />
        </Box>
      </Modal>
      <Modal
        open={modalEdit}
        onClose={() => {
          setModalEdit(false);
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "420px",
            margin: "100px auto",
          }}
        >
          <EditUserModal
            index={getIndex}
            usersData={usersData}
            setUsersData={setUsersData}
            setModalEdit={setModalEdit}
          />
        </Box>
      </Modal>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.neutral.light};
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 58px 57px;
`;
