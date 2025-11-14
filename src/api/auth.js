import axios from "./index";

// بيانات تسجيل الدخول الافتراضية
const DEFAULT_ADMIN = {
  email: "xmd555@gmail.com",
  password: "Tayo0991"
};

// نظام مصادقة محلي للعمل بدون خادم خلفي
const mockAuth = {
  login: (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === DEFAULT_ADMIN.email && data.password === DEFAULT_ADMIN.password) {
          const mockUser = {
            _id: "1",
            username: "admin",
            email: DEFAULT_ADMIN.email
          };
          const mockToken = "mock_jwt_token_" + Date.now();
          resolve({
            data: {
              success: true,
              token: mockToken,
              user: mockUser
            }
          });
        } else {
          reject({
            response: {
              data: {
                success: false,
                msg: "Wrong credentials"
              }
            }
          });
        }
      }, 500); // محاكاة تأخير الشبكة
    });
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = {
          _id: Date.now().toString(),
          username: data.email.split("@")[0],
          email: data.email
        };
        const mockToken = "mock_jwt_token_" + Date.now();
        resolve({
          data: {
            success: true,
            token: mockToken,
            user: mockUser
          }
        });
      }, 500);
    });
  }
};

class AuthApi {
  static Login = (data) => {
    // محاولة الاتصال بالخادم أولاً، وإذا فشل استخدم النظام المحلي
    return axios.post(`${base}/login`, data).catch(() => {
      return mockAuth.login(data);
    });
  };

  static Register = (data) => {
    // محاولة الاتصال بالخادم أولاً، وإذا فشل استخدم النظام المحلي
    return axios.post(`${base}/register`, data).catch(() => {
      return mockAuth.register(data);
    });
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } }).catch(() => {
      return Promise.resolve({ data: { success: true } });
    });
  };
}

let base = "users";

export default AuthApi;
