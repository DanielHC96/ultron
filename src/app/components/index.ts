import { Router } from "express";
import member from "./member";
import project from "./project";

const components: Router[] = [
    member,
    project
];

export default components;