import {
    pbkdf2Sync
} from "crypto";

export const encryptPassword = (password: string, secret: string): string => {
    return pbkdf2Sync(password, secret, 100000, 64, "sha512").toString("hex");
};