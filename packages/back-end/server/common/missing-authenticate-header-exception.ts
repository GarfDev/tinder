import httpstatus from "http-status";
import HttpException from "./http-exception";

const MissingAuthenticateHeaderException = new HttpException(
  httpstatus.UNAUTHORIZED,
  httpstatus["401_MESSAGE"],
  "Authorization Header is Missing"
);

export default MissingAuthenticateHeaderException;
