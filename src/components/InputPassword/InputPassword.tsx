import React, { ChangeEvent } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface State {
  showPassword: boolean;
}
type InputPasswordMuiPropsType = {
  title: string;
  valuePassword: string;
  setValuePassword?: (valueInput: string) => void;
  onChange?: (e: ChangeEvent<any>) => void;
  name: string;
  restFormikProps?: any;
};

export const InputPassword: React.FC<InputPasswordMuiPropsType> = ({
  title,
  setValuePassword,
  valuePassword,
  name,
  onChange,
  restFormikProps,
}) => {
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword && setValuePassword(event.currentTarget.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{
        width: "100%",
      }}
      variant="standard"
    >
      <InputLabel>{title}</InputLabel>
      <Input
        name={name}
        type={values.showPassword ? "text" : "password"}
        value={valuePassword}
        onChange={onChange ? onChange : handleChange}
        {...restFormikProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
