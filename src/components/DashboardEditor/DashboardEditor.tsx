import React, { useState } from "react";
import style from "./style/DashboardEditor.module.css";
import Editor from "../Editor/Editor";
import ListSupport from "../ListSupport/ListSupport";
type Props = {};

const imgUrl =
  "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&";

const supports = [
  { type: "300x200", template: "square", width: 200, height: 300 },
  { type: "300x300", template: "rectangular", width: 300, height: 300 },
];
const DashboardEditor: React.FC = ({}: Props) => {
  const [currentSupport, setCurrentSupport] = useState({
    type: "300x200",
    template: "square",
    width: 200,
    height: 300,
  });

  return (
    <div className={style["dashboard-editor"]}>
      <Editor imageUrl={imgUrl} printArea={currentSupport} />
    </div>
  );
};

export default DashboardEditor;
