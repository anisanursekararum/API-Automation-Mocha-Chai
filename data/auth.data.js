const login = [
  {
    case: {
      title: 'success',
      status: 201,
      message: "Authentication berhasil ditambahkan"
    },
    payload: {
      "email" : "1691246243-toko5@gmail.com",
      "password" : "password"
    },
  },
  {
    case: {
      title: 'failed password empty',
      status: 400,
      message: "\"password\" is not allowed to be empty"
    },
    payload: {
      "email" : "1691246243-toko5@gmail.com",
      "password" : ""
    },
  },
  {
    case: {
      title: 'failed email empty',
      status: 400,
      message: "\"email\" is not allowed to be empty"
    },
    payload: {
      "email" : "",
      "password" : "password"
    },
  },
  {
    case: {
      title: 'failed email invalid',
      status: 400,
      message: "\"email\" must be a valid email"
    },
    payload: {
      "email": "1691246243-toko5@.com",
      "password": "password"
    },
  },
  {
    case: {
      title: 'failed password invalid',
      status: 401,
      message: "Kredensial yang Anda berikan salah"
    },
    payload: {
      "email": "1691246243-toko5@gmail.com",
      "password": "xxxxx"
    },
  },
  {
    case: {
      title: 'failed invalid credential',
      status: 401,
      message: "Kredensial yang Anda berikan salah"
    },
    payload: {
      "email": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@gmail.com",
      "password": "password"
    },
  }
]

module.exports = { login };