import mainRouter from "./mainRouter"
import adminRouter from "./adminRouter"
import registerRouter from "./registerRouter"
import loginRouter from "./loginRouter"
import candidateRouter from "./candidateRouter"
import hrRouter from "./hrRouter"
import partnerRouter from "./partnerRouter"
import loginAdminRouter from "./loginAdminRouter"

const router = [
    mainRouter,
    adminRouter,
    registerRouter,
    loginRouter,
    loginAdminRouter,
    candidateRouter,
    hrRouter,
    partnerRouter,
]
export default router