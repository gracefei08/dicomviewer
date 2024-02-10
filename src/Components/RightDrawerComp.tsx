import { Button } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { MetaData } from '../utils';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CopyToClipboardButtonComp from './CopyToClipboardButtonComp';
import * as React from 'react';
import { Grid } from '@mui/material';
import DragComp from './DragComp';
import DropComp from './DropComp';
import { generateGridURL } from '../utils';


interface RidgeDrawerCompProps {
    metaDataList: MetaData[],
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>
}

const RightDrawerComp: React.VFC<RidgeDrawerCompProps> = ({ metaDataList, setMetaDataList, setDrawerState }) => {
    const [url, setURL] = useState<string>("Click Generate URL");
    const [rows, setRows] = useState<number>(1);
    const [cols, setCols] = useState<number>(1);

    const addCol = () => {
        if (cols < 4) {
            setCols(cols + 1)
        }
    }

    const minusCol = () => {
        if (cols > 1) {
            setCols(cols - 1)
        }
    }

    const addRow = () => {
        if (rows < 4) {
            setRows(rows + 1)
        }
    }

    const minusRow = () => {
        if (rows > 1) {
            setRows(rows - 1)
        }
    }

    return (
        <div>

            <Box
                sx={{ width: 350 }}
                role="presentation"
            >
                <IconButton aria-label="delete" size="small" onClick={() => setDrawerState(false)}>

                    <CloseIcon />

                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={addCol}>

                    <AddIcon />

                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={minusCol}>

                    <RemoveIcon /> Cols

                </IconButton>

                <IconButton aria-label="delete" size="small" onClick={addRow}>

                    <AddIcon />

                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={minusRow}>

                    <RemoveIcon /> Rows

                </IconButton>

                <Grid container spacing={1} alignItems="center">
                    {
                        metaDataList.map((data) => {
                            if (data.cord[0] == -1 && data.cord[1] == -1) {
                                return (
                                    <Grid item alignItems="center" >
                                        <DragComp metadata={data} metaDataList={metaDataList} setMetaDataList={setMetaDataList} />
                                    </Grid>
                                )
                            }

                        })
                    }
                </Grid>
                <Divider />
            </Box>

            <Grid container columns={12} >
                {Array.from(Array(cols * rows).keys()).map((value) => (
                    <DropComp metaDataList={metaDataList} rows={rows} cols={cols} value={value} setMetaDataList={setMetaDataList} />
                ))}
            </Grid>

            <Button variant="contained" onClick={() => setURL(generateGridURL(metaDataList, rows, cols))}>Generate URL</Button>



            <TextField
                size="small"
                placeholder={url}
                multiline
                rows={2}
                maxRows={4}
            />

            <CopyToClipboardButtonComp url={url} />

        </div>

    )
}

export default RightDrawerComp

