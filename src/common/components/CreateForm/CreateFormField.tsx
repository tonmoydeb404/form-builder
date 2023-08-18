import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fieldTypeTitles } from "../../../data/form";
import { FormFieldType } from "../../../types/form.type";
import resolveObjectPath from "../../../utils/resolveObjectPath";
import CreateFormGroup from "./CreateFormGroup";
import CreateFormOptions from "./CreateFormOptions";

type Props = {
  name: string;
};

const CreateFormField = ({ name }: Props) => {
  const {
    register,
    watch,
    unregister,
    formState: { errors },
  } = useFormContext();
  const watchType = watch(`${name}.type`) as FormFieldType;

  useEffect(() => {
    switch (watchType) {
      case "GROUP": {
        register(`${name}.fields`);
        unregister(`${name}.field`);
        unregister(`${name}.options`);
        break;
      }
      case "LIST": {
        register(`${name}.field`);
        unregister(`${name}.fields`);
        unregister(`${name}.options`);
        break;
      }
      case "DROPDOWN": {
        register(`${name}.options`);
        unregister(`${name}.fields`);
        unregister(`${name}.field`);
        break;
      }

      default: {
        unregister(`${name}.options`);
        unregister(`${name}.fields`);
        unregister(`${name}.field`);
        break;
      }
    }
  }, [watchType, register, unregister, name]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            size="small"
            label="Label"
            fullWidth
            {...register(`${name}.label`)}
            error={!!resolveObjectPath(errors, `${name}.label`, false)}
            helperText={
              resolveObjectPath(errors, `${name}.label`, false)?.message
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Key"
            fullWidth
            {...register(`${name}.key`)}
            error={!!resolveObjectPath(errors, `${name}.key`, false)}
            helperText={
              resolveObjectPath(errors, `${name}.key`, false)?.message
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Type"
            size="small"
            select
            fullWidth
            inputProps={{ ...register(`${name}.type`) }}
            defaultValue={""}
            error={!!resolveObjectPath(errors, `${name}.type`, false)}
            helperText={
              resolveObjectPath(errors, `${name}.type`, false)?.message
            }
          >
            <MenuItem disabled value="">
              Select Type
            </MenuItem>
            {Object.keys(fieldTypeTitles).map((key) => (
              <MenuItem value={key} key={key}>
                {fieldTypeTitles[key as FormFieldType]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {watchType === "GROUP" ? (
          <Grid item xs={12}>
            <CreateFormGroup name={`${name}.fields`} />
          </Grid>
        ) : null}

        {watchType === "LIST" ? (
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(20, 153, 17, 0.2)",
                borderRadius: "5px",
              }}
            >
              <CreateFormField name={`${name}.field`} />
            </Box>
          </Grid>
        ) : null}

        {watchType === "DROPDOWN" ? (
          <Grid item xs={12}>
            <CreateFormOptions name={`${name}.options`} />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default CreateFormField;
