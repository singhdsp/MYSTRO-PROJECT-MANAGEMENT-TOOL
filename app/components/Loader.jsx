import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader({color = "#fff"}) {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        visible={true}
        height="20"
        width="20"
        ariaLabel="loading"
        color={color}
      />
    </div>
  );
}

export default Loader;
