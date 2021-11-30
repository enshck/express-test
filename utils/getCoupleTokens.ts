import jwt from "jsonwebtoken";

import variables from "../config/variables";

interface IGetCoupleTokensData {
  userId: string;
  userName: string;
}

export default (data: IGetCoupleTokensData) => {
  const { userName, userId } = data;

  const accessToken = jwt.sign(
    { user_id: userId, userName },
    variables.jwtEncryptionKey,
    {
      expiresIn: variables.accessTokenExpire,
    }
  );

  const refreshToken = jwt.sign(
    { user_id: userId, userName },
    variables.jwtEncryptionKey,
    {
      expiresIn: variables.refreshTokenExpire,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};
