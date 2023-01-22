import { FC, useState, useEffect } from "react";
import { Box, Button, Grid, styled, Typography, useTheme } from "@mui/material";
import { ColumnTasks, Task } from "../../types";
import NewTaskModal from "../NewTaskModal";
import EditTaskModal from "../EditTaskModal";
import { getTasks, deleteTask } from "../../api";

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

const INITIAL_TASK_INFO: Task[] = [];

export const Tasks: FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tasksData, setTasksData] = useState<Task[]>(INITIAL_TASK_INFO);

  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [getIndex, setGetIndex] = useState(0);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getTasks().then((value) => {
      setTasksData(value);
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
    deleteTask(index);
    setDeleted(!deleted);
  };

  const columns: readonly ColumnTasks[] = [
    { id: "title", label: "Title", fontWeight: "bold", maxWidth: 308 },
    { id: "type", label: "Type", fontWeight: "bold", maxWidth: 308 },
    { id: "priority", label: "Priority", fontWeight: "bold", maxWidth: 308 },
    { id: "owner", label: "Assigned to", fontWeight: "bold", maxWidth: 308 },
    {
      id: "description",
      label: "Description",
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
            Task Management
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
            Create new task
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
                {tasksData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.title + index}
                      >
                        <TableCell width="16%" align="left">
                          {row.title}
                        </TableCell>
                        <TableCell width="16%" align="left">
                          {row.type}
                        </TableCell>
                        <TableCell width="16%" align="left">
                          {row.priority}
                        </TableCell>
                        <TableCell width="16%" align="left">
                          {row.owner}
                        </TableCell>
                        <TableCell width="16%" align="left">
                          {row.description.length > 100
                            ? row.description.substring(0, 100) + "..."
                            : row.description}
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
            count={tasksData.length}
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
          <NewTaskModal setModalNew={setModalNew} />
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
          <EditTaskModal
            index={getIndex}
            tasksData={tasksData}
            setTasksData={setTasksData}
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
