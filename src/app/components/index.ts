import { Router } from "express";
import member from "./member";
import team from "./team";
import session from "./session"
import job from "./job"

const components: Router[] = [
    member,
    team,
    session,
    job
];

export default components;