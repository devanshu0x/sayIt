import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                identifier:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },

            async authorize(credentials) {
                await dbConnect();
                if(!credentials){
                    throw new Error("Unable to get credentials")
                }
                try{
                    const user= await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("User is not verified! Please verify you account first")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);

                    if(isPasswordCorrect){
                        return {
                            id: user._id.toString(),
                            _id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            isAcceptingMessage: user.isAcceptingMessage,
                        }
                    }
                    else{
                        throw new Error("Incorrect Password");
                    }

                }catch(err:any){
                    throw new Error(err);
                }
            },
        })
    ],
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString()
                token.isVerified=user.isVerified
                token.isAcceptingMessage=user.isAcceptingMessage
                token.username= user.username
            }

            return token;
        },
        async session({session,token}){
            if(token){
                session.user._id=token._id;
                session.user.username=token.username;
                session.user.isVerified=token.isVerified;
                session.user.isAcceptingMessage=token.isAcceptingMessage;
            }

            return session;

        }
    }
}