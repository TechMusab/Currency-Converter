import { useRef } from "react";

export default function Inputs(props) {
  const amount = useRef(null);

  return (
    <div className="input">
      <label htmlFor="amount">{props.label}</label>
      <div className="selectinput">
        <input
          value={props.value}
          disabled={props.disabled}
          ref={amount}
          onChange={(e) => props.onamountchange(e.target.value)}
          type="text"
          id="amount"
        />
        <select
          name="select"
          id="select"
          onChange={(e) => props.onchange(e.target.value)}
          value={props.selected}
        >
          {props.keys.map((key) => {
            return (
              <option key={key} value={key}>
                {key.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
