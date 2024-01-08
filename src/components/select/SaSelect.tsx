import React, { Fragment, useState } from "react";

import cssStyles from "./SaSelect.module.css";
import classNames from "classnames";

import { Combobox } from "@headlessui/react";
import { ISelectOptionType } from "./types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const options = [
  {
    id: 1,
    name: "Durward Reynolds Hello World this is a large text",
  },
  { id: 2, name: "Kenton Towne", disabled: true },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export interface IWuSelectProps {
  label?: string;
  placeholder?: string;
  width?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
}

export const SaSelect = ({
  label,
  placeholder = "Select",
  width = "220px",
  isMulti,
}: IWuSelectProps): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<ISelectOptionType | null>(
    null
  );
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div style={{ width }}>
      {label && <p className={classNames(cssStyles.label)}>{label}</p>}
      <Combobox value={selectedItem} onChange={setSelectedItem}>
        <div className={cssStyles.container}>
          <Combobox.Button className={cssStyles.trigger}>
            <span className={cssStyles.display}>
              {selectedItem ? selectedItem.name : "Select item"}
            </span>
            <span className={cssStyles.indicator}>
              <ChevronDownIcon
                style={{ color: "#545E6B", width: "16px", height: "16px" }}
              />
            </span>
          </Combobox.Button>
          <Combobox.Input
            style={{
              height: "0px",
              width: "0px",
              display: "hidden",
              padding: "0px",
              position: "absolute",
              bottom: "0px",
              left: "0px",
              zIndex: -999,
              border: "none",
            }}
          />
          <Combobox.Options className={cssStyles.listBox}>
            {options.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                as={Fragment}
                disabled={item.disabled}
              >
                {({ active, selected, disabled }) => (
                  <li
                    className={classNames(cssStyles.option, {
                      [`${cssStyles.optionActive}`]: active,
                      [`${cssStyles.optionDisabled}`]: disabled,
                    })}
                  >
                    <span>{item.name}</span>
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};
