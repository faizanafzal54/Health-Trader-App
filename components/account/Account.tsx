import { useState } from "react";
import TabPanel from "../../helpers/TabPanel";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";

function Account() {
  const [value, setValue] = useState(0);
  return (
    <div className="account">
      <div className="d-flex tabs-title">
        <button
          onClick={() => setValue(0)}
          className={`${value === 0 ? "tab-active" : ""}`}
        >
          Profile
        </button>
        <button
          onClick={() => setValue(1)}
          className={`${value === 1 ? "tab-active ms-2" : "ms-2"}`}
        >
          Password
        </button>
      </div>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword
          setValue={(value: number) => {
            setValue(value);
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
    </div>
  );
}

export default Account;
