import { FC, useState } from "react";
import { User } from "../../types";
import { saveUser } from "../../api";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export interface EditUserProps {
  index: number;
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const EditUserModal: FC<EditUserProps> = ({
  index,
  usersData,
  setModalEdit,
}) => {
  const [newUserData, setNewUserData] = useState<User>(usersData[index]);
  const { id, create, firstname, lastname, email, phone } = newUserData;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const theme = useTheme();

  const handleCreate: SubmitHandler<Inputs> = (data) => {
    const user = { id, ...data, create };
    saveUser(user);
    setModalEdit(false);
  };

  return (
    <form>
      <Typography
        variant="h3"
        style={{ fontWeight: "bold", fontSize: "20px", padding: "24px 27px" }}
      >
        Edit user
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
              name={"firstname"}
              control={control}
              defaultValue={firstname}
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
              defaultValue={lastname}
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
              defaultValue={email}
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
              defaultValue={phone}
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
export default EditUserModal;
