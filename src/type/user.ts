export type User = {
  id: string;
  name: string;
  imagem: string;
  role: string;
};

export type userLoginType = {
  success: boolean;
  msg: string;
  token: string;
  user: User;
};


export type validaTokenLogin ={
   user: User;
    success: boolean;
    token: string;
}
