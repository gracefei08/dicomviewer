import { MetaData } from "../utils";
import * as React from "react";
import { useDrop } from "react-dnd";
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DragComp from "./DragComp";

interface DropCompProps {
  metaDataList: MetaData[];
  rows: number;
  cols: number;
  value: number;
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.text.secondary,
  height: 75,
}));
const colSize: Record<number, number> = {
  1: 12,
  2: 6,
  3: 4,
  4: 3,
};
const DropComp: React.VFC<DropCompProps> = ({
  metaDataList,
  rows,
  cols,
  value,
  setMetaDataList,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item: MetaData) => {
      addDataToBoard(item);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  var colIndex = value % cols;
  var rowIndex = Math.floor(value / cols);
  const addDataToBoard = (item: MetaData) => {
    if (
      metaDataList.some((a) => a.cord[0] == colIndex && a.cord[1] == rowIndex)
    ) {
      return;
    }

    setMetaDataList(
      [...metaDataList].map((object) => {
        if (object.id === item.id) {
          return {
            ...object,
            cord: [colIndex, rowIndex],
          };
        } else return object;
      })
    );
  };

  return (
    <Grid
      item
      key={value}
      xs={colSize[cols]}
      ref={drop}
      justifyContent="center"
    >
      <Item
        sx={{ border: "1px solid black", borderRadius: "2px", boxShadow: "0" }}
      >
        {metaDataList.map((data) => {
          if (data.cord[0] == colIndex && data.cord[1] == rowIndex) {
            return (
              <DragComp
                metadata={data}
                metaDataList={metaDataList}
                setMetaDataList={setMetaDataList}
              />
            );
          }
        })}
      </Item>
    </Grid>
  );
};

export default DropComp;
