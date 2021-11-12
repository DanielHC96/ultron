import { Router } from "express";
import member from "./member";
import team from "./team";
import project from "./project";
import project2 from "./project2"

const components: Router[] = [
    member,
    team,
    project,
    project2
];

export default components;