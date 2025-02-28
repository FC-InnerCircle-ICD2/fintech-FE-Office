export type KeyReq = Record<string, never>;

export type KeyRes = {
  ok: boolean;
  data: {
    apiKey: string;
  };
};
