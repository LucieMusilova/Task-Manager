import { FC, useState, useEffect } from "react";
import { Type, Priority, User } from "../../types";
import { saveTask } from "../../api";
import { v4 as uuid } from "uuid";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { getUsers } from "../../api";

import {
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormHelperText,
  FormControl,
  TextField,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export interface NewTaskProps {
  setModalNew: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_USER_INFO: User[] = [];

type Inputs = {
  title: string;
  type: Type;
  priority: Priority;
  description: string;
  owner: string;
};

const NewTaskModal: FC<NewTaskProps> = ({ setModalNew }) => {
  const newDate = new Date();
  const theme = useTheme();
  const id = uuid();
  const [usersData, setUsersData] = useState<User[]>(INITIAL_USER_INFO);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreate: SubmitHandler<Inputs> = (data) => {
    const task = { id, ...data, create: newDate };
    saveTask(task);
    setModalNew(false);
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
        Create task
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
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("title", { required: true })}
                  sx={{
                    width: "220px",
                    margin: "0 auto",
                  }}
                  id="title"
                  value={value}
                  name="title"
                  label="Title"
                  variant="standard"
                  error={!!errors["title"]}
                  helperText={errors["title"] ? "Title is required" : ""}
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
              defaultValue={"" as Type}
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
                    defaultValue=""
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
              defaultValue={"" as Priority}
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
                    defaultValue=""
                    value={value}
                    onChange={onChange}
                    label="Priority"
                  >
                    <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                    <MenuItem value={Priority.MEDIUM}>
                      {Priority.MEDIUM}
                    </MenuItem>
                    <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                  </Select>
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
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="standard"
                  sx={{ width: 220 }}
                  error={!!errors["owner"]}
                >
                  <InputLabel id="owner-label">Assign to:</InputLabel>
                  <Select
                    {...register("owner", { required: true })}
                    labelId="owner-label"
                    id="owner"
                    defaultValue=""
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
              defaultValue=""
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
              setModalNew(false);
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
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default NewTaskModal;
