import { FC, useState, useEffect } from "react";
import { Task, Type, Priority, User } from "../../types";
import { saveTask } from "../../api";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { getUsers } from "../../api";

import {
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export interface EditTaskProps {
  index: number;
  tasksData: Task[];
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_USER_INFO: User[] = [];

type Inputs = {
  title: string;
  type: Type;
  priority: Priority;
  description: string;
  owner: string;
};

const EditTaskModal: FC<EditTaskProps> = ({
  index,
  tasksData,
  setModalEdit,
}) => {
  const [newTaskData, setNewTaskData] = useState<Task>(tasksData[index]);
  const { id, create, title, type, priority, description, owner } = newTaskData;
  const [usersData, setUsersData] = useState<User[]>(INITIAL_USER_INFO);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const theme = useTheme();

  const handleCreate: SubmitHandler<Inputs> = (data) => {
    const task = { id, ...data, create };
    saveTask(task);
    setModalEdit(false);
  };

  useEffect(() => {
    getUsers().then((value) => {
      setUsersData(value);
    });
  }, []);

  return (
    <form>
      <Typography
        variant="h3"
        style={{ fontWeight: "bold", fontSize: "20px", padding: "24px 27px" }}
      >
        Edit task
      </Typography>
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.neutral.main}`,
          borderBottom: `1px solid ${theme.palette.neutral.main}`,
        }}
      >
        <Grid container flexDirection="column">
          <Grid
            item
            sx={{
              margin: "0 auto",
              paddingBottom: "34px",
            }}
          >
            <Controller
              name={"title"}
              control={control}
              defaultValue={title}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("title", { required: true })}
                  sx={{
                    width: "220px",
                    margin: "0 auto",
                  }}
                  id="title"
                  label="Title"
                  variant="standard"
                  error={!!errors["title"]}
                  helperText={errors["title"] ? "Title is required" : ""}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid
            item
            sx={{
              margin: "0 auto",
              paddingBottom: "34px",
            }}
          >
            <Controller
              name={"type"}
              control={control}
              defaultValue={type as Type}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="standard"
                  sx={{ width: 220 }}
                  error={!!errors["type"]}
                >
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    {...register("type", { required: true })}
                    labelId="type-label"
                    id="type"
                    defaultValue={type}
                    value={value}
                    name="type"
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem value={Type.TASK}>{Type.TASK}</MenuItem>
                    <MenuItem value={Type.BUG}>{Type.BUG}</MenuItem>
                    <MenuItem value={Type.STORY}>{Type.STORY}</MenuItem>
                  </Select>
                  {errors["type"] && (
                    <FormHelperText>Type is required</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid
            item
            sx={{
              margin: "0 auto",
              paddingBottom: "34px",
            }}
          >
            <Controller
              name={"priority"}
              control={control}
              defaultValue={priority as Priority}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="standard"
                  sx={{ width: 220 }}
                  error={!!errors["priority"]}
                >
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    {...register("priority", { required: true })}
                    labelId="priority-label"
                    id="priority"
                    name="priority"
                    defaultValue={priority}
                    value={value}
                    onChange={onChange}
                    label="Priority"
                  >
                    <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                    <MenuItem value={Priority.MEDIUM}>
                      {Priority.MEDIUM}
                    </MenuItem>
                    <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                  </Select>{" "}
                  {errors["priority"] && (
                    <FormHelperText>Priority is required</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid
            item
            sx={{
              margin: "0 auto",
              paddingBottom: "34px",
            }}
          >
            <Controller
              name={"owner"}
              control={control}
              defaultValue={owner}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="standard"
                  sx={{ width: 220 }}
                  error={!!errors["owner"]}
                >
                  <InputLabel id="owner-label">Assigned to</InputLabel>
                  <Select
                    {...register("owner", { required: true })}
                    labelId="owner-label"
                    id="owner"
                    defaultValue={owner}
                    value={value}
                    name="owner"
                    label="Owner"
                    onChange={onChange}
                  >
                    {usersData.map((user, index) => (
                      <MenuItem
                        key={index}
                        value={user.firstname + " " + user.lastname}
                      >
                        {user.firstname} {user.lastname}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors["owner"] && (
                    <FormHelperText>Owner is required</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid
            item
            sx={{
              margin: "0 auto",
              paddingBottom: "34px",
            }}
          >
            <Controller
              name={"description"}
              control={control}
              defaultValue={description}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("description", { required: true })}
                  sx={{
                    width: "220px",
                  }}
                  id="description"
                  name="description"
                  label="Description"
                  variant="standard"
                  error={!!errors["description"]}
                  helperText={
                    errors["description"] ? "Description is required" : ""
                  }
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        justifyContent="flex-end"
        columnSpacing={2}
        pr="15px"
        py="17px"
      >
        <Grid item>
          <Button
            size="medium"
            variant="text"
            onClick={() => {
              setModalEdit(false);
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={handleSubmit(handleCreate)}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default EditTaskModal;
