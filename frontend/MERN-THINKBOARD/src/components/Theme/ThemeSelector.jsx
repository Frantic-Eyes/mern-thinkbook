import React from "react";
import { useEffect } from "react";
import themeList from "./themeList";
import { themeChange } from "theme-change";

export const ThemeSelector = () => {
  useEffect(() => {
    themeChange(false);

    const savedTheme = localStorage.getItem("theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div>
      <div className="dropdown mb-72">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
        >
          {themeList.map((theme) => {
            return (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                  value={theme}
                  onChange={() => localStorage.setItem("theme", theme)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {/* <fieldset className="fieldset">
        {themeList.map((theme) => {
          return (
            <label className="flex gap-2 cursor-pointer items-center">
              <input
                type="radio"
                name="theme-radios"
                className="radio radio-sm theme-controller"
                value={theme}
              />
              {theme.toUpperCase()}
            </label>
          );
        })}
      </fieldset> */}
    </div>
  );
};
