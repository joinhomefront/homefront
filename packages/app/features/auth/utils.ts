export const getInviteCodeFromRedirect = (redirect: string) => {
  return /\/invites\/(.+)/.exec(redirect)?.[1];
};
