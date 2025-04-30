const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;

// const authenticateJWT1 = (req, res, next) => {
//   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

//   console.log("Token received:", token); // Log the token

//   if (!token) {
//     return res.status(401).send('Access Denied');
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       console.error("JWT Error:", err);
//       return res.status(403).send('Invalid Token');
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateJWT;


// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//   // Get token from cookies or headers
//   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
//   // const token = req.header('x-auth-token');
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// };

// module.exports = authenticateJWT;
// const jwt = require('jsonwebtoken');

//   const authenticateJWT = (req, res, next) => {
//     const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
//     console.log('1stToken:', token);
//     console.log('1stUser:', req.user);
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Forbidden
//         req.user = user;
//         next();
//         console.log('2ndToken:', token);
//         console.log('2ndUser:', req.user);
//       });
//     } else {
//         console.log('3rdToken:', token);
//         console.log('3rdUser:', req.user);
//       res.sendStatus(401); // Unauthorized
//     }
//   };
  
//   module.exports = authenticateJWT;
