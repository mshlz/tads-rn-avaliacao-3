import { ulid } from "ulid";
import { firestore } from "../../../utils/firebase";
import { GATE_COLLECTION_NAME, getData } from "../../../utils/gate";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  // if (req.headers.authorization !== ACCESS_TOKEN) {
  //   return res.status(401).json({ message: "not authorized" });
  // }

  firestore
    .collection(GATE_COLLECTION_NAME + "/subs/entries")
    .get()
    .then((result) => {
      return res
        .status(200)
        .json({ success: true, data: result.docs.map((v) => v.data()) });
    })
    .catch((error) => {
      return res.status(200).json({ success: false, message: error.message });
    });
}
