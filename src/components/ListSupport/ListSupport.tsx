import React from "react";
import style from "./style/ListSupport.module.css";

type Props = {
  setCurrentSupport: Function;
};

const supports = [
  { type: "300x200", width: 200, height: 300 },
  { type: "300x300", width: 300, height: 300 },
];

const ListSupport = ({ setCurrentSupport }: Props) => {
  return (
    <div className={style["list-support"]}>
      {supports.map((support, i) => (
        <button
          key={`${support.type}-${i}`}
          className={style.support}
          onClick={() => setCurrentSupport(support)}
        >
          {support.type}
        </button>
      ))}
    </div>
  );
};

export default ListSupport;
