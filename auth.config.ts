export const AUTH_CONFIG = {
  endpoints: {
    LOGIN: "users/token/",
    REGISTER: "users/auth/register/",
    VERIFY_EMAIL: "users/auth/verify-email/",
    FORGOT_PASSWORD: "users/auth/forgot-password/",
    RESET_PASSWORD: "users/auth/reset-password/",
    PROFILE: "users/profile/",
    REFRESH_TOKEN: "token/refresh/",
  },
  roles: {
    ADMIN: "ADMIN",
    DIRECTOR: "DIRECTOR",
    DHR: "DIRECTOR HR",
    STAFF: "STAFF",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
    PARENT: "PARENT",
    LIBRARIAN: "LIBRARIAN",
    ACCOUNTANT: "ACCOUNTANT",
    STOREKEEPER: "STOREKEEPER",
  },
  storage: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user",
  },
};
