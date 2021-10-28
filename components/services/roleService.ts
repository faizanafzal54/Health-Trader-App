import config from "../../configs/config";
import { Store } from "../../store";
const CryptoJS = require("crypto-js");

export const isUserLawyer = () => {
  const state = Store.getState();
  const bytes = CryptoJS.AES.decrypt(
    state.user.user.role.toString(),
    config.cipherKey
  );
  const decryptedRole = parseInt(bytes.toString(CryptoJS.enc.Utf8));

  if (decryptedRole === 2) return true;
  return false;
};
