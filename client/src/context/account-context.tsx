import AccountService from "./account.service";
import React from "react";

const AccountContext = React.createContext(new AccountService());

export default AccountContext


