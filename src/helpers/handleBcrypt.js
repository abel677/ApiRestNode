import bcrypt from "bcryptjs";

const encrypt = async (textPlaint) => {
  const textHas = await bcrypt.hash(textPlaint, 10);
  return textHas;
};

export const handleBcrypt = { encrypt }
