import jwt, { SignOptions } from 'jsonwebtoken';

export const signToken = (id: string) => {
  const secret = process.env.JWT_SECRET!;
  const expires = process.env.JWT_EXPIRES! as SignOptions['expiresIn'];

  return jwt.sign({ id }, secret, {
    expiresIn: expires,
  });
};

export const verifyToken = async (token: string) => {
  return (await jwt.verify(token, process.env.JWT_SECRET!)) as {
    id: string;
    iat: number;
    exp: number;
  };
};
