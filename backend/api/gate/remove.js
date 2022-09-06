import { firestore } from "../../../utils/firebase";
import {
  ACCESS_TOKEN,
  GATE_COLLECTION_NAME,
  getData,
} from "../../../utils/gate";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  // if (req.headers.authorization !== ACCESS_TOKEN) {
  //   return res.status(401).json({ message: "not authorized" });
  // }

  const data = getData(req);

  if (data.prune) {
    await firestore.recursiveDelete(firestore.collection(GATE_COLLECTION_NAME));
    return res.status(200).json({ success: true, message: "prune completed" });
  } else {
    if (data.id) {
      await firestore.collection(GATE_COLLECTION_NAME).doc(data.id).delete();
      return res

        .status(200)
        .json({ success: true, message: "removed with success" });
    } else {
      return res.status(200).json({ success: true, message: "nothing to do" });
    }
  }
}
