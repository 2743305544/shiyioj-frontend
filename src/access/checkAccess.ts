import ACCESS_ENUM from "@/access/accessEnum";
import message from "@arco-design/web-vue/es/message";

/**
 *
 * @param LoginUser
 * @param needAccess
 * @return boolean
 */
export const checkAccess = (LoginUser: any, needAccess: string): boolean => {
  const loginUserAccess = LoginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      message.warning("请先登录");
      window.location.reload();
      return false;
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};
