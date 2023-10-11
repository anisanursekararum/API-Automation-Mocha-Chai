const registration = [
  {
    case: {
      title: 'name empty',
      status: 400,
      message: "\"name\" is not allowed to be empty"
    },
    payload: {
      "name": "",
      "email": "toko5@gmail.com",
      "password": "password"
    },
  },
  {
    case: {
      title: 'email empty',
      status: 400,
      message: "\"email\" is not allowed to be empty"
    },
    payload: {
      "name": "Postman1",
      "email": "",
      "password": "password"
    },
  },
  {
    case: {
      title: 'password empty',
      status: 400,
      message: "\"password\" is not allowed to be empty"
    },
    payload: {
      "name": "Postman1",
      "email": "{{$timestamp}}-toko5@gmail.com",
      "password": ""
    },
  },
  {
    case: {
      title: 'unknown parameter',
      status: 400,
      message: "\"id\" is not allowed"
    },
    payload: {
      "name": "Postman1",
      "email": "{{$timestamp}}-toko5@gmail.com",
      "password": "{{password}}",
      "id": 123
    },
  },
  {
    case: {
      title: 'name parameter is not sent',
      status: 400,
      message: "\"name\" is required"
    },
    payload: {
      "email": "{{$timestamp}}-toko5@gmail.com",
      "password": "{{password}}"
    },
  },
  {
    case: {
      title: 'email parameter is not sent',
      status: 400,
      message: "\"email\" is required"
    },
    payload: {
      "name": "Postman1",
      "password": "{{password}}"
    },
  },
  {
    case: {
      title: 'password parameter is not sent',
      status: 400,
      message: "\"password\" is required"
    },
    payload: {
      "name": "Postman1",
      "email": "{{$timestamp}}-toko5@gmail.com"
    },
  },
]

module.exports = { registration };