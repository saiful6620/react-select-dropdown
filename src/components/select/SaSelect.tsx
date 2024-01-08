import React, { Fragment, useState } from "react";

import cssStyles from "./SaSelect.module.css";
import classNames from "classnames";

import { Combobox, Listbox } from "@headlessui/react";
import { ISelectOptionType } from "./types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import options from "./data";

const largeArray = [];

for (let i = 1; i <= 1000; i++) {
  largeArray.push({
    id: i,
    name: `Item ${i}`,
  });
}

// const options = [
//   {
//     id: 1,
//     name: "Durward Reynolds Hello World this is a large text",
//   },
//   { id: 2, name: "Kenton Towne", disabled: true },
//   { id: 3, name: "Therese Wunsch" },
//   { id: 4, name: "Benedict Kessler" },
//   { id: 5, name: "Katelyn Rohan" },
//   { id: 6, name: "Kenton Towne", disabled: true },
//   { id: 7, name: "Therese Wunsch" },
//   { id: 8, name: "Benedict Kessler" },
//   { id: 9, name: "Katelyn Rohan" },
//   { id: 10, name: "Kenton Towne", disabled: true },
// ];

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
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        {({ open }) => (
          <div className={cssStyles.container}>
            <Listbox.Button
              className={classNames(cssStyles.trigger, {
                [`${cssStyles.variantDefault}`]: true,
              })}
            >
              <Fragment>
                <span className={cssStyles.display}>
                  {selectedItem ? selectedItem.name : "Select item"}
                </span>
                <span className={cssStyles.indicator}>
                  <ChevronDownIcon
                    style={{
                      color: "#545E6B",
                      width: "16px",
                      height: "16px",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              </Fragment>
            </Listbox.Button>
            <Listbox.Options className={cssStyles.listBox}>
              {filteredOptions.map((item) => (
                <Listbox.Option
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};
