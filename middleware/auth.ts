
import express, { Request, Response, NextFunction } from "express";
import { Express } from "express";
import bcrypt from 'bcrypt'

import cookieParser from "cookie-parser";
import session from "express-session";

export const checkLoginMiddleware = (req:any,res:Response,next:NextFunction) => {
    console.log(req.session.user)
    console.log(req.cookies.user_sid)
    
    if (req.session.user && req.cookies.user_sid) {
        console.log('userLogin')
      next();
    } else {
    
      res.status(401).send({ message: 'unauthenticated' });
    }
  };
export const setup = (app:Express) => {
    app.use(cookieParser());
    app.use(
      session({
        name:'user_sid',
        secret: 'secretsecret33939',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // 可选的
      })
    );
  
    app.use((req:any, res:Response, next:NextFunction) => {
      if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
      }
      next();
    });
  };
export const authHandler = (req:any,res:Response,next:NextFunction) => {
    const { password } = req.query;
    if (password) {
        console.log(password)
        req.session.user=true
        res.json({success:true})
    }else{
        res.status(401).send({message:'unauthed'})
    }
    // if (!hash || bcrypt.compareSync(password, hash)) {
    //   req.session.user = true;
    //   res.json({ success: true });
    // } else {
    //   res.status(401).send({ message: 'unauthenticated' });
    // }
  };