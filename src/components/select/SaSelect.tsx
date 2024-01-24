import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";
import { ISelectOptionType } from "./types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import options from "./data";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import cssStyles from "./SaSelect.module.css";

export interface IWuSelectProps extends React.CSSProperties {
  label?: string;
  placeholder?: string;
  width?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
}

export const SaSelect = ({
  label,
  placeholder = "Select item",
  ...style
}: IWuSelectProps): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<ISelectOptionType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(1),
      flip(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `calc(${availableWidth - 15}px)`,
            maxHeight: `calc(${availableHeight - 15}px)`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <div className={cssStyles.container} style={style}>
        <Listbox.Button
          role="button"
          ref={refs.setReference}
          {...getReferenceProps()}
          className={classNames(cssStyles.trigger, {
            [`${cssStyles.variantDefault}`]: true,
          })}
        >
          <Fragment>
            <span className={cssStyles.display}>
              {selectedItem ? selectedItem.name : placeholder}
            </span>
            <span className={cssStyles.indicator}>
              <ChevronDownIcon
                style={{
                  color: "#545E6B",
                  width: "16px",
                  height: "16px",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </span>
          </Fragment>
        </Listbox.Button>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={cssStyles.listBox}
            >
              <Listbox.Options className={cssStyles.list} static>
                {filteredOptions.map((item) => (
                  <Listbox.Option key={item.id} value={item} as={Fragment}>
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
          </FloatingFocusManager>
        )}
      </div>
    </Listbox>
  );
};
