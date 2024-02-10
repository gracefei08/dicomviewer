import { Button } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { MetaData } from "../utils";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CopyToClipboardButtonComp from "./CopyToClipboardButtonComp";
import * as React from "react";
import { Grid } from "@mui/material";
import DragComp from "./DragComp";
import DropComp from "./DropComp";
import { generateGridURL } from "../utils";
import Typography from "@mui/material/Typography";

interface DndDrawerCompProps {
  metaDataList: MetaData[];
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DndDrawerComp: React.VFC<DndDrawerCompProps> = ({
  metaDataList,
  setMetaDataList,
  setDrawerState,
}) => {
  const [url, setURL] = useState<string>("Click Generate URL");
  const [rows, setRows] = useState<number>(1);
  const [cols, setCols] = useState<number>(1);

  const addCol = () => {
    if (cols < 3) setCols(cols + 1);
  };
  const minusCol = () => {
    if (cols > 1) setCols(cols - 1);
  };
  const addRow = () => {
    if (rows < 3) setRows(rows + 1);
  };
  const minusRow = () => {
    if (rows > 1) setRows(rows - 1);
  };

  return (
    <div>
      <IconButton size="small" onClick={() => setDrawerState(false)}>
        <CloseIcon />
      </IconButton>
      <Box sx={{ width: 350, margin: "10px" }} role="presentation">
        <div>
          <Typography>
            Cols
            <IconButton size="small" onClick={addCol}>
              <AddIcon />
            </IconButton>
            <IconButton
              sx={{ marginRight: "20px" }}
              size="small"
              onClick={minusCol}
            >
              <RemoveIcon />
            </IconButton>
            Rows
            <IconButton size="small" onClick={addRow}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" onClick={minusRow}>
              <RemoveIcon />
            </IconButton>
          </Typography>
        </div>
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ marginTop: "5px" }}
        >
          {metaDataList.map((data) => {
            if (data.cord[0] == -1 && data.cord[1] == -1) {
              return (
                <Grid item alignItems="center">
                  <DragComp
                    metadata={data}
                    metaDataList={metaDataList}
                    setMetaDataList={setMetaDataList}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
        <Divider />

        <Grid container columns={12} sx={{ marginTop: "5px" }}>
          {Array.from(Array(cols * rows).keys()).map((value) => (
            <DropComp
              metaDataList={metaDataList}
              rows={rows}
              cols={cols}
              value={value}
              setMetaDataList={setMetaDataList}
            />
          ))}
        </Grid>

        <Button
          sx={{ marginTop: "5px" }}
          variant="contained"
          onClick={() => setURL(generateGridURL(metaDataList, rows, cols))}
        >
          Generate URL
        </Button>
        <CopyToClipboardButtonComp url={url} />
        <div>
          <TextField
            size="medium"
            placeholder={url}
            multiline
            rows={8}
            maxRows={32}
            fullWidth
            sx={{ marginTop: "5px" }}
          />
        </div>
        
      </Box>
    </div>
  );
};

export default DndDrawerComp;
