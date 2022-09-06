export const GATE_COLLECTION_NAME = "gate_entries";
export const ACCESS_TOKEN =
  process.env.GATE_TOKEN || "token_01GC8776KMZMZHEGQBEXMXJESZ";

export const getData = (req) => ({
  ...req.body,
  ...req.query,
});

export const allowCors = (block) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await block(req, res);
};
