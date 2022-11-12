import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useEffect, useState } from "react";
import { data } from "./data";

function App() {
  const [state, setState] = useState("move");
  const [master, setMaster] = useState(data);
  const [unique, setUnique] = useState();
  const [elements, setElements] = useState([]);
  console.log(state);

  const selectMaster = (id) => {
    setUnique(id);
    const temp = master?.map((el) =>
      el.id === id ? { ...el, selected: !el.selected } : el
    );
    setMaster(temp);
  };

  const selectElements = (id) => {
    setUnique(id);
    const temp = elements?.map((el) =>
      el.id === id ? { ...el, selected: !el.selected } : el
    );
    setElements(temp);
  };

  const moveOneLeft = (unique) => {
    if (unique) {
      const temp = master?.find((el) => el.id === unique);
      setElements([...elements, { ...temp, selected: false }]);
      const filteredData = master?.filter((el) => el.id !== unique);
      setMaster(filteredData);
    }
  };

  const moveOneRight = (unique) => {
    if (unique) {
      const temp = elements?.find((el) => el.id === unique);
      setMaster([...master, { ...temp, selected: false }]);
      const filteredData = elements?.filter((el) => el.id !== unique);
      setElements(filteredData);
    }
  };

  const shiftAllLeft = () => {
    if (state === "move") {
      if (master.length > 0) {
        selectElements([...elements, ...master]);
        setMaster([]);
        return;
      }

      setElements([...data]);
      setMaster([]);
    }
  };

  const shiftAllRight = () => {
    if (state === "move") {
      if (elements.length > 0) {
        setMaster([...master, ...elements]);
        setElements([]);
        return;
      }

      setMaster([...data]);
      setElements([]);
    }
  };

  useEffect(() => {}, [master, elements]);

  return (
    <>
      <Box border="1px solid black" padding="20px">
        <Box
          display="flex"
          width="70%"
          margin=" 20px auto"
          justifyContent="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={state === "copy"}
                size="medium"
                value="copy"
                onChange={(e) => setState("copy")}
              />
            }
            label="Copy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state === "move"}
                size="medium"
                value="move"
                onChange={(e) => setState("move")}
              />
            }
            label="Move"
          />
        </Box>
        <Box
          m="auto"
          justifyContent={"center"}
          display="flex"
          width="70%"
          height="700px"
          gap="20px"
        >
          <Box width="40%" border="1px solid" overflow="scroll" p="10px">
            <Typography fontSize={"24px"} textAlign="center" padding="20px">
              Master
            </Typography>
            <Box>
              {master?.map((el, i) => (
                <Box
                  key={i}
                  border="1px solid black"
                  borderRadius="12px"
                  p="18px"
                  textAlign="center"
                  fontSize="18px"
                  letterSpacing="1.1px"
                  fontWeight="500"
                  mb="12px"
                  cursor="pointer"
                  className={el.selected ? "selected" : ""}
                  onClick={() => selectMaster(el.id)}
                >
                  {el.name}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            gap="20px"
          >
            <Button
              size="large"
              variant="outlined"
              onClick={() => moveOneLeft(unique)}
            >
              <ArrowForwardIosIcon />
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => moveOneRight(unique)}
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button size="large" variant="outlined" onClick={shiftAllLeft}>
              <KeyboardDoubleArrowRightIcon />
            </Button>
            <Button size="large" variant="outlined" onClick={shiftAllRight}>
              <KeyboardDoubleArrowLeftIcon />
            </Button>
          </Box>
          <Box width="40%" border="1px solid" overflow={"scroll"}>
            <Typography fontSize={"24px"} textAlign="center" p="20px">
              New Elements
            </Typography>
            <Box>
              {elements.length > 0 &&
                elements?.map((el, i) => (
                  <Box
                    key={i}
                    border="1px solid black"
                    p="18px"
                    textAlign="center"
                    mb="12px"
                    borderRadius="12px"
                    cursor="pointer"
                    fontSize="18px"
                    letterSpacing="1.1px"
                    fontWeight="500"
                    className={el.selected ? "selected" : ""}
                    onClick={() => selectElements(el.id)}
                  >
                    {el.name}
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
