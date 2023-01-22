import React, { FC } from "react";
import { saveUser } from "../../api";
import { v4 as uuid } from "uuid";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export interface NewUserProps {
  setModalNew: React.Dispatch<React.SetStateAction<boolean>>;
}

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const NewUserModal: FC<NewUserProps> = ({ setModalNew }) => {
  const newDate = new Date();
  const theme = useTheme();
  const id = uuid();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreate: SubmitHandler<Inputs> = (data) => {
    const user = { id, ...data, create: newDate };
    saveUser(user);
    setModalNew(false);
  };

  return (
    <form>
      <Typography
        variant="h3"
        style={{ fontWeight: "bold", fontSize: "20px", padding: "24px 27px" }}
      >
        Create user
      </Typography>
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.neutral.main}`,
          borderBottom: `1px solid ${theme.palette.neutral.main}[]`,
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
              name={"firstname"}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("firstname", { required: true })}
                  sx={{
                    width: "220px",
                    margin: "0 auto",
                  }}
                  id="firstname"
                  label="Firstname"
                  variant="standard"
                  error={!!errors["firstname"]}
                  helperText={
                    errors["firstname"] ? "Firstname is required" : ""
                  }
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
              name={"lastname"}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("lastname", { required: true })}
                  sx={{
                    width: "220px",
                  }}
                  id="lastname"
                  label="Lastname"
                  variant="standard"
                  error={!!errors["lastname"]}
                  helperText={errors["lastname"] ? "Lastname is required" : ""}
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
              name={"email"}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("email", { required: true })}
                  sx={{
                    width: "220px",
                  }}
                  id="email"
                  label="Email"
                  variant="standard"
                  error={!!errors["email"]}
                  helperText={errors["email"] ? "Email is required" : ""}
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
              name={"phone"}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...register("phone", { required: true })}
                  sx={{
                    width: "220px",
                  }}
                  id="phone"
                  label="Phone"
                  variant="standard"
                  error={!!errors["phone"]}
                  helperText={errors["phone"] ? "Phone is required" : ""}
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
export default NewUserModal;
