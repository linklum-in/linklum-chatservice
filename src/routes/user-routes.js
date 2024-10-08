import { Router } from "express"
import { createUser, updateUserDetails, getAllUsers, getUser, loginUser,
    getConnectedUsers, getUserInvitations, forgetUserPassword
  } from "../controllers/user_controllers.js"

const userRouter = Router()

userRouter.route('/register').post(createUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/updateuser').post(updateUserDetails)
userRouter.route('/forgetpassword').post(forgetUserPassword)

userRouter.route("/getallusers").get(getAllUsers)


userRouter.route("/getuser").post(getUser)
userRouter.route('/getconnectedusers').post(getConnectedUsers)
userRouter.route('/getuserinvitations').post(getUserInvitations)


export default userRouter;