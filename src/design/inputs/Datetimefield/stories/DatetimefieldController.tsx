import { useState } from "react";

import { Datetimefield, DatetimefieldProps } from "..";

const DatetimefieldController = (props: DatetimefieldProps) => {
  const { value = "", status = "pending" } = props;
  const [form, setForm] = useState({ value, status });

  function isValidDate(value: string) {
    return /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])((0[1-9])|(1[0-2])):[0-5]\d[aApP][mM]$/.test(
      value
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ value: e.target.value, status: "pending" });
  };

  const onFocus = () => {
    if (form.status === "invalid") {
      setForm({ ...form, status: "invalid" });
    } else {
      setForm({ ...form, status: "pending" });
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidDate(e.target.value);
    setForm({ ...form, status: !isValid ? "pending" : "invalid" });
  };

  const message = "the date is not valid.";

  return (
    <Datetimefield
      {...props}
      value={form.value}
      onChange={onChange}
      status={form.status}
      onFocus={onFocus}
      onBlur={onBlur}
      message={message}
    />
  );
};

export { DatetimefieldController };
