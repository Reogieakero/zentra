"use client";

import React from "react";
import styles from "./FormField.module.css";

interface BaseProps {
  label: string;
  hint?: string;
  disabled?: boolean;
}

interface TextFieldProps extends BaseProps {
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  options?: never;
}

interface SelectFieldProps extends BaseProps {
  type: "select";
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

type FormFieldProps = TextFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, hint, disabled } = props;

  return (
    <label className={styles.group}>
      <span className={styles.label}>{label}</span>
      {props.type === "select" ? (
        <select
          className={styles.control}
          value={props.value}
          disabled={disabled}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={styles.control}
          type={props.type ?? "text"}
          value={props.value}
          disabled={disabled}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}
