import bcrypt from "bcrypt";


export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export async function validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}