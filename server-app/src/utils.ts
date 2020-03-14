import CONSTS from "./const";


// TODO: move function to different files
// TODO: don't mix function and const arrow funcitons
export function moveDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * CONSTS.HOUR_MILLISEC);
}

export function rand(a: number, b: number) {
  return Math.round(Math.random() * (b - a) + a);
}

export const requiresAdmin = () => {
  return (req: any, res: any, next: any) => {
    if (req.user && req.user.isAdmin === true) next();
    else res.status(401).send("Unauthorized");
  };
};

export const requiresLogin = () => {
  return (req: any, res: any, next: any) => {
    if (req.user) next();
    else res.status(401).send("Unauthorized");
  };
};
