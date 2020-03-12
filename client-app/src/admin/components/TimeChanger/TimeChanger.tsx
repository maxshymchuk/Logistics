import cogoToast from "cogo-toast";
import React, { useState } from "react";

import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { changeTime } from "../../services/timeChanger.service";
import styles from "./timeChanger.module.scss";

export const TimeChanger = () => {
  const [value, setValue] = useState(1);

  const handleChange = (route: string) => {
    changeTime(`/time/${route}/${value}`);
    cogoToast
      .success(`${route} ${value} day(s)!`, {
        hideAfter: 1,
        position: "bottom-right"
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  const handleInput = (event: any) => {
    const target = event.target;
    if (target.value >= 0) setValue(target.value);
  };

  return (
    <section className={styles.changer}>
      <IconButton onClick={() => handleChange("Minus")}>
        <RemoveIcon className={styles.icon} fontSize="small" />
      </IconButton>
      <TextField
        size="small"
        className={styles.days}
        type="number"
        value={value}
        onChange={handleInput}
        variant="outlined"
      />
      <IconButton onClick={() => handleChange("Plus")}>
        <AddIcon className={styles.icon} fontSize="small" />
      </IconButton>
    </section>
  );
};
