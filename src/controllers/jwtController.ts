import * as  jwt from "jsonwebtoken";

//create jwt token and add user id and browser name in. 
export const createToken = (userID: string, browserInfo: string): string =>
  jwt.sign({
    userID,
    browserInfo
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  )
