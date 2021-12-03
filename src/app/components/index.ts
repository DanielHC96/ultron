import { Router } from "express";
import member from "./member";
import team from "./team";
import session from "./session"
import job from "./job"
import meeting from "./meeting"
import payment from "./payment"

const components: Router[] = [
    member,
    team,
    session,
    job,
    meeting,
    payment
];

export default components;