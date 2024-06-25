import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      res.status(422).json({errors:errors.array()});
    }
  };
};

export const LoginValidator = [ 
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
     .trim()
     .isLength({ min: 6 })
     .withMessage("password is required and must be at least 6 characters"),
  ];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password is required and must be at least 6 characters"),
];
