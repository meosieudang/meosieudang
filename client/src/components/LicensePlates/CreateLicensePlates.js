import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";

const CreateLicensePlates = props => {
  const [idPlates, setIdPlates] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [licensePlates, setLicensePlates] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const { plates } = props;
    if (plates) {
      setIdPlates(plates._id);
      setStart(plates.start);
      setEnd(plates.end);
      setLicensePlates(plates.licensePlates);
      setPrice(plates.price);
    } else {
      setIdPlates("");
      setStart("");
      setEnd("");
      setLicensePlates("81B-011.84");
      setPrice("250000");
    }
  }, [props.plates]);

  const handleSubmit = e => {
    e.preventDefault();
    const { profiles, addNewLicensePlates, updateLicensePlates } = props;

    const newLicensePlates = {
      licensePlates: licensePlates,
      start: start,
      end: end,
      price: price
    };
    if (idPlates) {
      //edit
      updateLicensePlates(newLicensePlates, idPlates);
    } else {
      //add
      addNewLicensePlates(newLicensePlates, profiles._id);
    }
  };

  const renderTextField = (label, name, value, setValue, error, helperText) => (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={e => setValue(e.target.value)}
      error={error ? true : false}
      helperText={error ? error : helperText}
    />
  );

  return (
    <Paper>
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item>
          {renderTextField(
            "Điểm xuất phát",
            "start",
            start,
            setStart,
            props.errors.start,
            "Vui lòng nhập điểm xuất phát"
          )}
        </Grid>
        <Grid item>
          {renderTextField(
            "Điểm đến",
            "end",
            end,
            setEnd,
            props.errors.end,
            "Vui lòng nhập điểm đến"
          )}
        </Grid>
        <Grid item>
          <NumberFormat
            disabled={props.plates ? true : false}
            customInput={TextField}
            type="text"
            format="##B-###.##"
            label="Biển số xe"
            name="licensePlates"
            value={licensePlates}
            onChange={e => setLicensePlates(e.target.value)}
            error={props.errors.licensePlates ? true : false}
            helperText={
              props.errors.licensePlates
                ? props.errors.licensePlates
                : "Vui lòng nhập biển số xe"
            }
          />
        </Grid>

        <Grid item>
          {renderTextField(
            "Giá Vé",
            "price",
            price,
            setPrice,
            props.errors.price,
            "Vui lòng nhập giá vé"
          )}
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Button
              variant="contained"
              type="submit"
              color={idPlates ? "primary" : "secondary"}
            >
              {idPlates ? "Sửa chuyến xe" : "Tạo chuyến xe"}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateLicensePlates;
